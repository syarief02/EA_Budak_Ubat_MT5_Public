// Limits for /api/comments that hold across serverless instances, because they read the comments table
// itself (the in-memory per-IP map in the route resets on every cold start and differs per instance).
// The board gets a handful of posts a month, so these never touch a real visitor; they stop floods and
// accidental double posts ("did my post go through?").

export const GLOBAL_WINDOW_MS = 10 * 60 * 1000;
export const GLOBAL_MAX_POSTS = 8;
export const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000;

/**
 * @param {object} client Supabase client (anon key; needs select on public.comments)
 * @param {string} message cleaned message text about to be inserted
 * @param {number} nowMs current time in ms
 * @returns {Promise<null | "busy" | "duplicate">} null when the post may go ahead.
 * Query errors fail open (return null) so a Supabase hiccup never drops a real inquiry here.
 */
export async function checkSharedCommentLimits(client, message, nowMs = Date.now()) {
  try {
    const since = new Date(nowMs - GLOBAL_WINDOW_MS).toISOString();
    const recent = await client
      .from("comments")
      .select("id", { count: "exact", head: true })
      .gte("created_at", since);
    if (!recent.error && typeof recent.count === "number" && recent.count >= GLOBAL_MAX_POSTS) {
      return "busy";
    }

    const dupSince = new Date(nowMs - DUPLICATE_WINDOW_MS).toISOString();
    const dup = await client
      .from("comments")
      .select("id")
      .eq("message", message)
      .gte("created_at", dupSince)
      .limit(1);
    if (!dup.error && Array.isArray(dup.data) && dup.data.length > 0) {
      return "duplicate";
    }
  } catch (e) {
    return null;
  }
  return null;
}
