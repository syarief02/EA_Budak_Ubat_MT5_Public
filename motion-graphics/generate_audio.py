import numpy as np
import scipy.io.wavfile as wavfile
import math
import os

SAMPLE_RATE = 44100
DURATION = 30.0
TOTAL_SAMPLES = int(SAMPLE_RATE * DURATION)
BPM = 128.0
BEAT_DUR = 60.0 / BPM
BAR_DUR = BEAT_DUR * 4

# Initialize stereo buffer
audio_left = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
audio_right = np.zeros(TOTAL_SAMPLES, dtype=np.float64)

def add_audio(start_time, wave_left, wave_right=None):
    if wave_right is None:
        wave_right = wave_left
    start_idx = int(start_time * SAMPLE_RATE)
    if start_idx >= TOTAL_SAMPLES:
        return
    end_idx = min(start_idx + len(wave_left), TOTAL_SAMPLES)
    length = end_idx - start_idx
    audio_left[start_idx:end_idx] += wave_left[:length]
    audio_right[start_idx:end_idx] += wave_right[:length]

# ----------------- DRUM SYNTHESIS -----------------
def synth_kick(pitch=150.0, end_pitch=40.0, dur=0.35, gain=0.85):
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    # Pitch envelope
    f = end_pitch + (pitch - end_pitch) * np.exp(-t * 28.0)
    phase = 2 * np.pi * np.cumsum(f) / SAMPLE_RATE
    # Amp envelope
    env = np.exp(-t * 11.0)
    # Click transient
    click = np.sin(2 * np.pi * 900 * t) * np.exp(-t * 120.0) * 0.4
    wave = (np.sin(phase) + click) * env * gain
    return wave

def synth_snare(dur=0.25, gain=0.65):
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    tone = np.sin(2 * np.pi * 180 * t) * np.exp(-t * 30.0)
    noise = np.random.uniform(-1, 1, n)
    # Simple highpass/bandpass shaping on noise
    env = np.exp(-t * 22.0)
    wave = (tone * 0.4 + noise * 0.6) * env * gain
    return wave

def synth_hihat(dur=0.06, open_hh=False, gain=0.35):
    actual_dur = dur * 3.5 if open_hh else dur
    n = int(actual_dur * SAMPLE_RATE)
    t = np.linspace(0, actual_dur, n, endpoint=False)
    noise = np.random.uniform(-1, 1, n)
    decay = 12.0 if open_hh else 65.0
    env = np.exp(-t * decay)
    # Metallic ringing frequencies
    metal = (np.sin(2 * np.pi * 4200 * t) + np.sin(2 * np.pi * 6800 * t) + np.sin(2 * np.pi * 9500 * t)) * 0.25
    wave = (noise * 0.75 + metal) * env * gain
    return wave

def synth_crash(dur=2.2, gain=0.5):
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    noise = np.random.uniform(-1, 1, n)
    metal = np.sin(2 * np.pi * 5100 * t) * 0.2 + np.sin(2 * np.pi * 8300 * t) * 0.2
    env = np.exp(-t * 2.8)
    wave = (noise * 0.8 + metal) * env * gain
    return wave

# ----------------- SYNTH & BASS ENGINE -----------------
def note_freq(semitone_from_a4):
    return 440.0 * (2.0 ** (semitone_from_a4 / 12.0))

# Notes relative to A4 (0 = A4, 440Hz)
# A minor chord progression: Am (A3), F (F3), C (C4), G (G3)
# Semitones from A4:
# A2 = -24, C3 = -21, E3 = -17, F2 = -28, G2 = -26
def synth_saw_bass(freq, dur=0.22, cutoff_sweep=True, gain=0.45):
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    # Sawtooth wave + sub sine
    saw = 2.0 * (t * freq - np.floor(t * freq + 0.5))
    sub = np.sin(2 * np.pi * (freq / 2.0) * t) * 0.8
    env = np.exp(-t * 8.0)
    wave = (saw * 0.6 + sub * 0.4) * env * gain
    return wave

def synth_pad_chord(frequencies, dur=1.8, gain=0.18):
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    left = np.zeros(n)
    right = np.zeros(n)
    # Detuned unison spread
    for f in frequencies:
        for detune, pan in [(-0.8, -0.6), (0.0, 0.0), (0.8, 0.6)]:
            freq = f * (1.0 + detune * 0.005)
            # Saw + Triangle mix
            saw = 2.0 * (t * freq - np.floor(t * freq + 0.5))
            tri = 2.0 * np.abs(2.0 * (t * freq - np.floor(t * freq + 0.5))) - 1.0
            sig = (saw * 0.6 + tri * 0.4)
            left += sig * (1.0 - pan * 0.5)
            right += sig * (1.0 + pan * 0.5)
    # Attack & Release envelope
    attack_samples = int(0.25 * SAMPLE_RATE)
    release_samples = int(0.4 * SAMPLE_RATE)
    env = np.ones(n)
    if n > attack_samples + release_samples:
        env[:attack_samples] = np.linspace(0, 1, attack_samples)
        env[-release_samples:] = np.linspace(1, 0, release_samples)
    return left * env * gain, right * env * gain

def synth_arp_pluck(freq, dur=0.16, gain=0.22):
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    osc1 = np.sin(2 * np.pi * freq * t)
    osc2 = np.sin(2 * np.pi * freq * 2.0 * t) * 0.4
    saw = (2.0 * (t * freq - np.floor(t * freq + 0.5))) * 0.3
    env = np.exp(-t * 18.0)
    wave = (osc1 + osc2 + saw) * env * gain
    return wave

# ----------------- SOUND EFFECTS (SFX) -----------------
def sfx_sub_drop(dur=2.8, gain=0.75):
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    f = 130.0 * np.exp(-t * 2.0) + 28.0
    phase = 2 * np.pi * np.cumsum(f) / SAMPLE_RATE
    env = np.exp(-t * 1.5)
    wave = np.sin(phase) * env * gain
    return wave

def sfx_whoosh(dur=0.7, pan_dir=1.0, gain=0.38):
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    noise = np.random.uniform(-1, 1, n)
    # Volume envelope: rise then fall
    env = np.sin(np.pi * (t / dur)) ** 2
    # Pan curve
    pan = np.linspace(-pan_dir, pan_dir, n)
    left = noise * env * (1.0 - pan) * 0.5 * gain
    right = noise * env * (1.0 + pan) * 0.5 * gain
    return left, right

def sfx_riser(dur=2.2, gain=0.45):
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    noise = np.random.uniform(-1, 1, n)
    # Sine chirp rising in frequency
    f = 180.0 * np.exp(t * 1.8)
    phase = 2 * np.pi * np.cumsum(f) / SAMPLE_RATE
    chirp = np.sin(phase) * 0.4
    env = (t / dur) ** 2.2
    wave = (noise * 0.6 + chirp) * env * gain
    return wave

def sfx_lock_beep(freq=1200.0, dur=0.08, gain=0.3):
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    f = freq + 400.0 * np.exp(-t * 50.0)
    phase = 2 * np.pi * np.cumsum(f) / SAMPLE_RATE
    env = np.exp(-t * 30.0)
    wave = np.sin(phase) * env * gain
    return wave

def sfx_profit_chime(gain=0.4):
    # C6, E6, G6, C7 ascending major chime
    notes = [1046.5, 1318.5, 1567.98, 2093.0]
    total_dur = 1.2
    n = int(total_dur * SAMPLE_RATE)
    left = np.zeros(n)
    right = np.zeros(n)
    for i, freq in enumerate(notes):
        delay = i * 0.08
        s_idx = int(delay * SAMPLE_RATE)
        c_dur = total_dur - delay
        cn = int(c_dur * SAMPLE_RATE)
        t = np.linspace(0, c_dur, cn, endpoint=False)
        sine = np.sin(2 * np.pi * freq * t)
        harm = np.sin(2 * np.pi * freq * 2 * t) * 0.25
        env = np.exp(-t * 4.5)
        chime_wave = (sine + harm) * env * gain
        pan = (i / 3.0) * 2.0 - 1.0 # Panned across stereo field
        left[s_idx:s_idx + cn] += chime_wave * (1.0 - pan * 0.5)
        right[s_idx:s_idx + cn] += chime_wave * (1.0 + pan * 0.5)
    return left, right

def sfx_slam_impact(gain=0.8):
    dur = 1.8
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    # Heavy low sub boom
    sub_f = 65.0 * np.exp(-t * 4.0) + 30.0
    sub_phase = 2 * np.pi * np.cumsum(sub_f) / SAMPLE_RATE
    sub = np.sin(sub_phase) * np.exp(-t * 2.5) * 0.75
    # High impact crack
    noise = np.random.uniform(-1, 1, n) * np.exp(-t * 35.0) * 0.4
    wave = (sub + noise) * gain
    return wave

# ----------------- COMPOSE MUSIC & TIMELINE -----------------
print("Synthesizing musical timeline (BPM: 128, Duration: 30s)...")

# Chord progressions (in Hz)
# Chord A: Am (A3: 220, C4: 261.63, E4: 329.63, A4: 440)
# Chord F: Fmaj (F3: 174.61, A3: 220, C4: 261.63, F4: 349.23)
# Chord C: Cmaj (C3: 130.81, G3: 196, C4: 261.63, E4: 329.63)
# Chord G: Gmaj (G3: 196, B3: 246.94, D4: 293.66, G4: 392)
chords = [
    [220.0, 261.63, 329.63, 440.0],
    [174.61, 220.0, 261.63, 349.23],
    [130.81, 196.0, 261.63, 329.63],
    [196.0, 246.94, 293.66, 392.0]
]
root_freqs = [110.0, 87.31, 130.81, 98.0] # Bass notes (A2, F2, C3, G2)
pentatonic_arp = [440.0, 523.25, 659.25, 783.99, 880.0, 1046.5]

# 1. AMBIENT & INTRO (0.0s - 3.75s)
add_audio(0.0, sfx_sub_drop(3.0, gain=0.85))
add_audio(0.0, sfx_whoosh(1.4, pan_dir=0.8, gain=0.35)[0], sfx_whoosh(1.4, pan_dir=0.8, gain=0.35)[1])
add_audio(1.8, sfx_whoosh(0.9, pan_dir=-0.8, gain=0.4)[0], sfx_whoosh(0.9, pan_dir=-0.8, gain=0.4)[1])

# Intro arpeggio fading in
for step in range(8):
    t_arp = 0.94 + step * (BEAT_DUR / 2.0)
    note = pentatonic_arp[step % len(pentatonic_arp)]
    gain = 0.08 + (step / 8.0) * 0.15
    add_audio(t_arp, synth_arp_pluck(note, dur=0.18, gain=gain))

# Intro Pad
p_left, p_right = synth_pad_chord(chords[0], dur=3.5, gain=0.15)
add_audio(0.5, p_left, p_right)

# 2. BEAT COMMENCES (3.75s to 24.375s)
# 44 beats total in main section
num_beats = int((24.375 - 3.75) / BEAT_DUR)

# Major Act Reveal at 4.68s (Bar 3)
add_audio(3.75, synth_crash(2.5, gain=0.6))
add_audio(3.75, sfx_slam_impact(gain=0.9))

for b in range(num_beats):
    t_beat = 3.75 + b * BEAT_DUR
    bar_index = int(b // 4)
    chord_idx = bar_index % 4
    current_chord = chords[chord_idx]
    current_root = root_freqs[chord_idx]

    # Kick on every beat (4-on-the-floor)
    add_audio(t_beat, synth_kick(pitch=150.0, end_pitch=42.0, dur=0.32, gain=0.85))

    # Snare on beats 2 and 4 (beats 1, 3 in 0-indexed)
    if b % 2 == 1:
        add_audio(t_beat, synth_snare(dur=0.25, gain=0.6))

    # Closed hi-hat on every 8th note offbeat
    add_audio(t_beat, synth_hihat(dur=0.06, open_hh=False, gain=0.22))
    add_audio(t_beat + BEAT_DUR * 0.5, synth_hihat(dur=0.06, open_hh=(b % 2 == 1), gain=0.32))

    # Rolling 16th-note synth bassline
    for sub_step in range(4):
        t_sub = t_beat + sub_step * (BEAT_DUR / 4.0)
        # Octave bounces
        octave_mult = 2.0 if sub_step in [1, 3] else 1.0
        f_bass = current_root * octave_mult
        add_audio(t_sub, synth_saw_bass(f_bass, dur=0.12, gain=0.4))

    # Melodic Arpeggio runs
    for sub_step in [0, 2]:
        t_sub = t_beat + sub_step * (BEAT_DUR / 4.0)
        arp_note = current_chord[(b * 2 + sub_step) % len(current_chord)]
        add_audio(t_sub, synth_arp_pluck(arp_note, dur=0.18, gain=0.24))

    # Sustained chords on bar heads
    if b % 4 == 0:
        c_left, c_right = synth_pad_chord(current_chord, dur=BAR_DUR * 0.95, gain=0.16)
        add_audio(t_beat, c_left, c_right)

# Specific Synchronized Sound Effects for Visual Cues
# 4.6s - 9.0s: 4 Quant Engines lock on
engine_lock_times = [5.2, 6.1, 7.0, 7.9]
engine_lock_freqs = [880.0, 1100.0, 1320.0, 1760.0]
for t_lock, f_lock in zip(engine_lock_times, engine_lock_freqs):
    add_audio(t_lock, sfx_lock_beep(freq=f_lock, dur=0.09, gain=0.35))

# 9.5s: Dynamic ADR Sweep
add_audio(9.5, sfx_whoosh(0.8, pan_dir=0.9, gain=0.4)[0], sfx_whoosh(0.8, pan_dir=0.9, gain=0.4)[1])

# 13.2s: Real-time Tick Break-Even Profit Lock Chime!
add_audio(13.2, sfx_profit_chime(gain=0.6)[0], sfx_profit_chime(gain=0.6)[1])

# 15.0s: Multi-EA Suite transition swoosh
add_audio(15.0, synth_crash(1.8, gain=0.45))
add_audio(15.0, sfx_whoosh(0.7, pan_dir=-0.9, gain=0.45)[0], sfx_whoosh(0.7, pan_dir=-0.9, gain=0.45)[1])
add_audio(16.5, sfx_whoosh(0.5, pan_dir=0.8, gain=0.35)[0], sfx_whoosh(0.5, pan_dir=0.8, gain=0.35)[1])
add_audio(18.0, sfx_whoosh(0.5, pan_dir=-0.8, gain=0.35)[0], sfx_whoosh(0.5, pan_dir=-0.8, gain=0.35)[1])
add_audio(19.5, sfx_whoosh(0.5, pan_dir=0.8, gain=0.35)[0], sfx_whoosh(0.5, pan_dir=0.8, gain=0.35)[1])

# 20.6s: 100% Free Lifetime Whitelist fanfare & sparkle
add_audio(20.625, synth_crash(2.0, gain=0.55))
add_audio(20.7, sfx_slam_impact(gain=0.7))
for sparkle in range(5):
    t_sp = 21.2 + sparkle * 0.14
    add_audio(t_sp, sfx_lock_beep(freq=2400.0 + sparkle * 350.0, dur=0.06, gain=0.25))

# 24.375s - 26.25s: TENSION RISER BUILD-UP
add_audio(24.375, sfx_riser(dur=1.875, gain=0.65))
# Rapid snare roll
for roll in range(16):
    t_roll = 24.375 + roll * (BEAT_DUR / 4.0)
    roll_gain = 0.2 + (roll / 16.0) * 0.6
    add_audio(t_roll, synth_snare(dur=0.12, gain=roll_gain))

# 26.25s: FINAL GRAND CLIMAX & CTA (eabudakubat.com)
add_audio(26.25, synth_crash(3.5, gain=0.75))
add_audio(26.25, sfx_slam_impact(gain=0.95))
add_audio(26.25, synth_kick(pitch=170.0, end_pitch=35.0, dur=0.6, gain=0.95))
# Grand final epic chord (A minor majestic octave spread)
climax_chord = [110.0, 164.81, 220.0, 261.63, 329.63, 440.0, 523.25, 659.25, 880.0]
cl_left, cl_right = synth_pad_chord(climax_chord, dur=3.5, gain=0.3)
add_audio(26.25, cl_left, cl_right)

# 27.5s: Final verified profit chime echo
add_audio(27.3, sfx_profit_chime(gain=0.45)[0], sfx_profit_chime(gain=0.45)[1])

# MASTERING: Soft saturation limiting and smooth 0.4s fade-out at end
print("Mastering and soft-clipping audio...")
fade_out_samples = int(0.6 * SAMPLE_RATE)
fade_env = np.ones(TOTAL_SAMPLES)
fade_env[-fade_out_samples:] = np.linspace(1.0, 0.0, fade_out_samples)

audio_left *= fade_env
audio_right *= fade_env

# Tanh soft limiter to prevent clipping and add warm analog punch
audio_left = np.tanh(audio_left * 1.1) * 0.92
audio_right = np.tanh(audio_right * 1.1) * 0.92

# Convert to 16-bit PCM WAV
audio_stereo = np.vstack([audio_left, audio_right]).T
audio_16bit = np.int16(audio_stereo * 32767)

out_wav = os.path.join(os.getcwd(), "motion-graphics", "soundtrack_and_sfx.wav")
wavfile.write(out_wav, SAMPLE_RATE, audio_16bit)
print(f"Master soundtrack and SFX generated successfully: {out_wav} (Size: {os.path.getsize(out_wav)} bytes)")
