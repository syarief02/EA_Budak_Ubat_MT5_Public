import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// In-memory sliding-window rate limiter per IP
// (Max 3 submissions per 5 minutes)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;

// Periodic cleanup of stale rate limit records
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of rateLimitMap.entries()) {
      const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (valid.length === 0) {
        rateLimitMap.delete(ip);
      } else {
        rateLimitMap.set(ip, valid);
      }
    }
  }, 60 * 1000);
}

// Basic HTML and script sanitizer
function sanitizeInput(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[\\\/]{2,}/g, '/') // Prevent path traversal artifacts
    .trim();
}

// Check for malicious payload patterns
function isSuspiciousPayload(text) {
  if (typeof text !== 'string') return false;
  const lower = text.toLowerCase();
  return (
    lower.includes('javascript:') ||
    lower.includes('data:text/html') ||
    lower.includes('vbscript:') ||
    lower.includes('<script') ||
    lower.includes('onload=') ||
    lower.includes('onerror=')
  );
}

// Known test/diagnostic names to filter from public feed
const EXCLUDED_PROBE_NAMES = [
  'test_sec_probe',
  'security test agent',
  'permtest',
  'antigravity verification',
  'antigravity diagnostic',
  'test runner',
];

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Filter out diagnostic rows, test probes, and non-EA Budak Ubat EAs (e.g. Daltus EA)
    const sanitizedComments = (data || []).filter((item) => {
      const lowerName = (item.name || '').toLowerCase();
      const lowerEaName = (item.ea_name || '').toLowerCase();
      const lowerMsg = (item.message || '').toLowerCase();

      // Exclude Daltus EA (not part of EA Budak Ubat)
      if (
        lowerEaName.includes('daltus') ||
        lowerMsg.includes('daltus') ||
        lowerName.includes('daltus') ||
        item.id === 'ce6c932e-70a2-4397-9fc6-f2342cc3cf2e'
      ) {
        return false;
      }

      return !EXCLUDED_PROBE_NAMES.includes(lowerName);
    });

    return NextResponse.json(
      { success: true, comments: sanitizedComments },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
        },
      }
    );
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // 1. IP extraction & Rate Limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const cfIp = request.headers.get('cf-connecting-ip');
    const ip = cfIp || (forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1');

    const now = Date.now();
    const timestamps = (rateLimitMap.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

    if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded: Please wait a few minutes before posting again.',
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 2. Anti-Bot Honeypot Defense
    // The field 'bot_catch' is visually hidden for human users. If bots fill it, reject immediately.
    if (body.bot_catch && String(body.bot_catch).trim().length > 0) {
      return NextResponse.json(
        { success: false, error: 'Bot detected. Submission rejected.' },
        { status: 400 }
      );
    }

    // 3. Timing Velocity Defense (forms submitted faster than 1.2s are automated bots)
    if (body.form_rendered_at) {
      const elapsed = now - Number(body.form_rendered_at);
      if (elapsed < 1200) {
        return NextResponse.json(
          { success: false, error: 'Submission received too quickly. Please try again.' },
          { status: 400 }
        );
      }
    }

    // 4. Input Sanitization & Validation
    const rawName = body.name || '';
    const rawMessage = body.message || '';
    const rawType = body.type || 'feedback';
    const rawEaName = body.ea_name || '';

    if (isSuspiciousPayload(rawName) || isSuspiciousPayload(rawMessage) || isSuspiciousPayload(rawEaName)) {
      return NextResponse.json(
        { success: false, error: 'Malicious or invalid characters detected in input.' },
        { status: 400 }
      );
    }

    const cleanName = sanitizeInput(rawName);
    const cleanMessage = sanitizeInput(rawMessage);
    const cleanEaName = sanitizeInput(rawEaName);

    if (cleanName.length < 2 || cleanName.length > 50) {
      return NextResponse.json(
        { success: false, error: 'Name must be between 2 and 50 characters.' },
        { status: 400 }
      );
    }

    if (cleanMessage.length < 5 || cleanMessage.length > 1500) {
      return NextResponse.json(
        { success: false, error: 'Message must be between 5 and 1500 characters.' },
        { status: 400 }
      );
    }

    const ALLOWED_TYPES = ['idea', 'feedback', 'ea_request'];
    if (!ALLOWED_TYPES.includes(rawType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid post type specified.' },
        { status: 400 }
      );
    }

    if (rawType === 'ea_request' && !cleanEaName) {
      return NextResponse.json(
        { success: false, error: 'EA Name is required for EA requests.' },
        { status: 400 }
      );
    }

    // Disallow Daltus EA (not part of EA Budak Ubat project)
    const lowerEaName = cleanEaName.toLowerCase();
    const lowerMsg = cleanMessage.toLowerCase();
    const lowerNameCheck = cleanName.toLowerCase();
    if (lowerEaName.includes('daltus') || lowerMsg.includes('daltus') || lowerNameCheck.includes('daltus')) {
      return NextResponse.json(
        { success: false, error: 'Daltus EA is a separate project and is not part of EA Budak Ubat.' },
        { status: 400 }
      );
    }

    // 5. Admin & Creator Impersonation Shield
    const lowerName = cleanName.toLowerCase();
    const isImpersonationAttempt =
      lowerName.includes('syarief') ||
      lowerName.includes('creator') ||
      lowerName.includes('admin') ||
      lowerName.includes('moderator') ||
      lowerName.includes('official') ||
      lowerName.includes('budak ubat team');

    if (isImpersonationAttempt) {
      const creatorPass = process.env.ADMIN_COMMENT_TOKEN || 'eabudakubat-secure-2026';
      if (!body.admin_token || body.admin_token !== creatorPass) {
        return NextResponse.json(
          {
            success: false,
            error: 'The name Syarief / Creator / Admin is reserved for official project announcements.',
          },
          { status: 403 }
        );
      }
    }

    // 6. Record rate limit timestamp
    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);

    // 7. Insert clean record into Supabase
    const payload = {
      name: cleanName,
      type: rawType,
      message: cleanMessage,
    };

    if (rawType === 'ea_request' && cleanEaName) {
      payload.ea_name = cleanEaName.slice(0, 100);
    }

    const { data, error } = await supabase.from('comments').insert([payload]).select();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, comment: data?.[0] }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to process comment.' }, { status: 500 });
  }
}
