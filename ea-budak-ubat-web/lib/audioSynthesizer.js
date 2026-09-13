// Procedural Cybernetic Web Audio Synthesizer
// Zero external audio files (0kb download) - 100% procedurally synthesized in real time

let audioCtx = null;
let soundEnabled = false;

// Initialize on client
if (typeof window !== "undefined") {
  soundEnabled = localStorage.getItem("ea_sfx_enabled") === "true";
}

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function setSoundEnabled(enabled) {
  soundEnabled = !!enabled;
  if (typeof window !== "undefined") {
    localStorage.setItem("ea_sfx_enabled", soundEnabled ? "true" : "false");
    window.dispatchEvent(new CustomEvent("ea-sound-toggled", { detail: { enabled: soundEnabled } }));
    if (soundEnabled) {
      playTactileClick(0.12);
    }
  }
  return soundEnabled;
}

export function toggleSound() {
  return setSoundEnabled(!soundEnabled);
}

// 1. Tactile UI Click (Crisp, modern micro-frequency blip)
export function playTactileClick(volume = 0.08) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.035);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.036);
  } catch (e) {
    // Ignore audio errors gracefully
  }
}

// 2. Magnetic Reticle Lock-On (Futuristic harmonic chirp)
let lastLockTime = 0;
export function playReticleLock(volume = 0.05) {
  if (!soundEnabled) return;
  const nowMs = Date.now();
  if (nowMs - lastLockTime < 90) return; // Throttle rapid hover events
  lastLockTime = nowMs;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(880, now); // A5
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.045); // A6

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.052);
  } catch (e) {}
}

// 3. Take Profit Realization Chime (Ascending Major Triad C6 -> E6 -> G6)
export function playProfitChime(volume = 0.12) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [
      { freq: 1046.5, delay: 0.0, dur: 0.2 },   // C6
      { freq: 1318.5, delay: 0.07, dur: 0.22 }, // E6
      { freq: 1567.98, delay: 0.14, dur: 0.38 }, // G6
      { freq: 2093.0, delay: 0.22, dur: 0.5 },  // C7
    ];

    notes.forEach(({ freq, delay, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.linearRampToValueAtTime(volume, now + delay + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.01);
    });
  } catch (e) {}
}

// 4. Alert / Warning Ping
export function playAlertPing(volume = 0.09) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.linearRampToValueAtTime(220, now + 0.12);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.14);
  } catch (e) {}
}

// 5. Quiz Correct Answer Chime (Harmonic pitch shifts with streak combo)
export function playQuizCorrect(streak = 1, volume = 0.1) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const baseFreq = streak >= 5 ? 1318.5 : streak >= 3 ? 1046.5 : 880; // E6, C6, or A5
    const notes = [
      { freq: baseFreq, delay: 0.0, dur: 0.12 },
      { freq: baseFreq * 1.25, delay: 0.06, dur: 0.14 },
      { freq: baseFreq * 1.5, delay: 0.12, dur: 0.22 },
    ];

    notes.forEach(({ freq, delay, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.linearRampToValueAtTime(volume, now + delay + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.01);
    });
  } catch (e) {}
}

// 6. Quiz Wrong Answer Feedback (Subtle low tone, non-jarring)
export function playQuizWrong(volume = 0.09) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.22);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  } catch (e) {}
}

// 7. Level Up Fanfare (Ascending triumphant arcade fanfare)
export function playLevelUpFanfare(volume = 0.14) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const fanfare = [
      { freq: 523.25, delay: 0.00, dur: 0.12 }, // C5
      { freq: 659.25, delay: 0.10, dur: 0.12 }, // E5
      { freq: 783.99, delay: 0.20, dur: 0.14 }, // G5
      { freq: 1046.50, delay: 0.32, dur: 0.45 }, // C6
    ];

    fanfare.forEach(({ freq, delay, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.linearRampToValueAtTime(volume, now + delay + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.01);
    });
  } catch (e) {}
}

// 8. Streak Multiplier Combo Chime
export function playComboBonus(volume = 0.12) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [
      { freq: 1479.98, delay: 0.0, dur: 0.08 }, // F#6
      { freq: 1760.00, delay: 0.06, dur: 0.08 }, // A6
      { freq: 2217.46, delay: 0.12, dur: 0.25 }, // C#7
    ];

    notes.forEach(({ freq, delay, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.linearRampToValueAtTime(volume, now + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.01);
    });
  } catch (e) {}
}

