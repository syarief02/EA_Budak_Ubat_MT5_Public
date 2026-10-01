import numpy as np
import scipy.signal as signal
import scipy.io.wavfile as wavfile
import os

SAMPLE_RATE = 44100
DURATION = 30.0
TOTAL_SAMPLES = int(SAMPLE_RATE * DURATION)
BPM = 90.0
BEAT = 60.0 / BPM          # 0.666667s
EIGHTH = BEAT / 2.0        # 0.333333s
SIXTEENTH = BEAT / 4.0     # 0.166667s

# Stereo Master Bus
master_left = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
master_right = np.zeros(TOTAL_SAMPLES, dtype=np.float64)

def mix(start_sec, left, right=None, gain=1.0):
    global master_left, master_right
    if right is None:
        right = left
    start = int(round(start_sec * SAMPLE_RATE))
    if start >= TOTAL_SAMPLES:
        return
    length = min(len(left), TOTAL_SAMPLES - start)
    master_left[start:start+length] += left[:length] * gain
    master_right[start:start+length] += right[:length] * gain

def note_freq(name):
    # Reference A4 = 440
    notes = {'C':-9, 'C#':-8, 'D':-7, 'D#':-6, 'E':-5, 'F':-4, 'F#':-3, 'G':-2, 'G#':-1, 'A':0, 'A#':1, 'B':2}
    letter = name[:-1]
    octave = int(name[-1])
    semitones = notes[letter] + (octave - 4) * 12
    return 440.0 * (2.0 ** (semitones / 12.0))

# -------------------------------------------------------------
# INSTRUMENT ENGINES (Pure, Click-Free, Anti-Aliased)
# -------------------------------------------------------------

def synth_piano(freq, dur=1.2, vel=0.7):
    """Lush acoustic piano: fundamental + warm decaying harmonics"""
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    # Harmonics: fundamental, 2nd, 3rd, 4th, 5th
    harmonics = [
        (1.0, 1.0, 3.2),    # mult, amp, decay
        (2.0, 0.55, 4.5),
        (3.0, 0.28, 6.0),
        (4.0, 0.14, 8.0),
        (5.0, 0.06, 10.5),
    ]
    sig = np.zeros(n)
    for mult, amp, decay in harmonics:
        f = freq * mult
        if f < SAMPLE_RATE / 2.2:
            sig += amp * np.sin(2 * np.pi * f * t) * np.exp(-t * decay)
    # Gentle hammer attack (5ms)
    attack_n = int(0.005 * SAMPLE_RATE)
    sig[:attack_n] *= np.linspace(0, 1, attack_n)
    # Soft stereo width
    pan = np.clip((freq - 440) / 880, -0.4, 0.4)
    l = sig * (1.0 - pan) * vel * 0.45
    r = sig * (1.0 + pan) * vel * 0.45
    return l, r

def synth_warm_pad(frequencies, dur=4.0, gain=0.25):
    """Rich cinematic analog pad with gentle chorus and stereo detune"""
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    left = np.zeros(n)
    right = np.zeros(n)
    for freq in frequencies:
        for detune, pan in [(-0.003, -0.6), (0.0, 0.0), (0.003, 0.6)]:
            f = freq * (1.0 + detune)
            # Mixed warm triangle + soft saw
            tri = 2.0 * np.abs(2.0 * (t * f - np.floor(t * f + 0.5))) - 1.0
            saw = 2.0 * (t * f - np.floor(t * f + 0.5))
            wave = tri * 0.7 + saw * 0.3
            left += wave * (1.0 - pan * 0.5)
            right += wave * (1.0 + pan * 0.5)
    # Smooth 2-pole lowpass filter at 900Hz to remove harsh harmonics
    b, a = signal.butter(2, 900.0 / (SAMPLE_RATE / 2.0), btype='low')
    left = signal.lfilter(b, a, left)
    right = signal.lfilter(b, a, right)
    # Gentle attack (0.4s) and release (0.6s)
    att_n = int(0.4 * SAMPLE_RATE)
    rel_n = int(0.6 * SAMPLE_RATE)
    env = np.ones(n)
    if n > att_n + rel_n:
        env[:att_n] = np.sin(np.linspace(0, np.pi/2, att_n)) ** 2
        env[-rel_n:] = np.cos(np.linspace(0, np.pi/2, rel_n)) ** 2
    return left * env * gain * 0.2, right * env * gain * 0.2

def synth_sub_bass(freq, dur=1.5, gain=0.6):
    """Clean deep sub-bass with warm 2nd harmonic"""
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    sig = np.sin(2 * np.pi * freq * t) + 0.25 * np.sin(2 * np.pi * freq * 2 * t)
    # Smooth envelope
    att_n = int(0.02 * SAMPLE_RATE)
    rel_n = int(0.15 * SAMPLE_RATE)
    env = np.ones(n)
    if n > att_n + rel_n:
        env[:att_n] = np.linspace(0, 1, att_n)
        env[-rel_n:] = np.linspace(1, 0, rel_n)
    sig = sig * env * gain
    return sig, sig

def synth_strings(frequencies, dur=5.0, gain=0.22):
    """Lush string ensemble (detuned saws with ensemble chorus, NO noise)"""
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    left = np.zeros(n)
    right = np.zeros(n)
    for freq in frequencies:
        for detune, pan, phase_shift in [(-0.005, -0.7, 0.0), (0.004, 0.7, 1.2), (0.000, 0.0, 2.4)]:
            f = freq * (1.0 + detune)
            # Band-limited sine series approximating bowed string
            s1 = np.sin(2 * np.pi * f * t + phase_shift)
            s2 = 0.5 * np.sin(2 * np.pi * f * 2 * t + phase_shift)
            s3 = 0.25 * np.sin(2 * np.pi * f * 3 * t + phase_shift)
            s4 = 0.12 * np.sin(2 * np.pi * f * 4 * t + phase_shift)
            sig = s1 + s2 + s3 + s4
            left += sig * (1.0 - pan * 0.5)
            right += sig * (1.0 + pan * 0.5)
    # Warm lowpass at 1200Hz
    b, a = signal.butter(2, 1200.0 / (SAMPLE_RATE / 2.0), btype='low')
    left = signal.lfilter(b, a, left)
    right = signal.lfilter(b, a, right)
    # Long expressive attack and decay
    att_n = int(0.8 * SAMPLE_RATE)
    rel_n = int(0.8 * SAMPLE_RATE)
    env = np.ones(n)
    if n > att_n + rel_n:
        env[:att_n] = np.sin(np.linspace(0, np.pi/2, att_n)) ** 2
        env[-rel_n:] = np.cos(np.linspace(0, np.pi/2, rel_n)) ** 2
    return left * env * gain * 0.15, right * env * gain * 0.15

def synth_brass_stab(frequencies, dur=1.2, gain=0.35):
    """Epic orchestral brass hit with filter bite"""
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    left = np.zeros(n)
    right = np.zeros(n)
    for freq in frequencies:
        saw = 2.0 * (t * freq - np.floor(t * freq + 0.5))
        saw_sub = np.sin(2 * np.pi * (freq / 2.0) * t) * 0.5
        voice = saw * 0.7 + saw_sub * 0.3
        left += voice
        right += voice
    # Filter envelope simulation
    b, a = signal.butter(2, 1600.0 / (SAMPLE_RATE / 2.0), btype='low')
    left = signal.lfilter(b, a, left)
    right = signal.lfilter(b, a, right)
    # Attack 15ms, punchy decay
    att_n = int(0.015 * SAMPLE_RATE)
    env = np.exp(-t * 2.8)
    env[:att_n] *= np.linspace(0, 1, att_n)
    return left * env * gain * 0.25, right * env * gain * 0.25

def synth_fm_bell(freq, dur=3.5, mod_ratio=2.756, gain=0.35):
    """Crystalline FM bell / coin ring with long reverb tail"""
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    mod_index = 2.5 * np.exp(-t * 3.5)
    modulator = np.sin(2 * np.pi * (freq * mod_ratio) * t)
    carrier = np.sin(2 * np.pi * freq * t + mod_index * modulator)
    # Envelope
    env = np.exp(-t * 1.6)
    att_n = int(0.003 * SAMPLE_RATE)
    env[:att_n] *= np.linspace(0, 1, att_n)
    sig = carrier * env * gain
    # Panned stereo shimmer
    pan = np.sin(freq * 0.05) * 0.5
    return sig * (1.0 - pan), sig * (1.0 + pan)

# -------------------------------------------------------------
# PERCUSSION ENGINE (Pristine, Zero Clicks)
# -------------------------------------------------------------

def drum_kick(dur=0.38, gain=0.85):
    """Punchy 808-style electronic kick with smooth pitch drop"""
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    f = 42.0 + (140.0 - 42.0) * np.exp(-t * 28.0)
    phase = 2 * np.pi * np.cumsum(f) / SAMPLE_RATE
    body = np.sin(phase) * np.exp(-t * 8.5)
    click = np.sin(2 * np.pi * 850 * t) * np.exp(-t * 90.0) * 0.35
    wave = (body + click) * gain
    return wave, wave

def drum_snare(dur=0.28, gain=0.65):
    """Clean modern snare: 200Hz tone + filtered snap"""
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    tone = np.sin(2 * np.pi * 205.0 * t) * np.exp(-t * 26.0)
    noise = np.random.uniform(-1, 1, n)
    b, a = signal.butter(2, [800.0 / (SAMPLE_RATE/2), 6000.0 / (SAMPLE_RATE/2)], btype='band')
    noise = signal.lfilter(b, a, noise) * np.exp(-t * 18.0)
    wave = (tone * 0.5 + noise * 0.5) * gain
    return wave, wave

def drum_hihat(dur=0.08, open_hh=False, gain=0.28):
    """Crisp high-hat with metallic sparkle"""
    actual_dur = dur * 3.0 if open_hh else dur
    n = int(actual_dur * SAMPLE_RATE)
    t = np.linspace(0, actual_dur, n, endpoint=False)
    noise = np.random.uniform(-1, 1, n)
    b, a = signal.butter(2, 7500.0 / (SAMPLE_RATE/2), btype='high')
    noise = signal.lfilter(b, a, noise)
    metal = (np.sin(2 * np.pi * 5200 * t) + np.sin(2 * np.pi * 8400 * t)) * 0.25
    decay = 14.0 if open_hh else 60.0
    env = np.exp(-t * decay)
    wave = (noise * 0.75 + metal) * env * gain
    return wave, wave

def drum_crash(dur=2.5, gain=0.5):
    """Shimmering crash cymbal"""
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    noise = np.random.uniform(-1, 1, n)
    b, a = signal.butter(2, 4500.0 / (SAMPLE_RATE/2), btype='high')
    noise = signal.lfilter(b, a, noise)
    metal = np.sin(2 * np.pi * 5800 * t) * 0.25 + np.sin(2 * np.pi * 8900 * t) * 0.25
    env = np.exp(-t * 2.4)
    wave = (noise * 0.75 + metal) * env * gain
    return wave, wave

def sfx_clock_tick(gain=0.25):
    """Swiss escapement precision tick (5ms bandpass transient)"""
    dur = 0.04
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    tone = np.sin(2 * np.pi * 3200 * t) + np.sin(2 * np.pi * 4800 * t) * 0.5
    env = np.exp(-t * 110.0)
    wave = tone * env * gain
    return wave, wave

def sfx_sub_drop(dur=3.0, gain=0.85):
    """Massive cinema 808 sub drop (120Hz -> 32Hz)"""
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    f = 32.0 + (120.0 - 32.0) * np.exp(-t * 1.8)
    phase = 2 * np.pi * np.cumsum(f) / SAMPLE_RATE
    env = np.exp(-t * 1.2)
    wave = np.sin(phase) * env * gain
    return wave, wave

def sfx_whoosh(dur=0.7, pan_left_to_right=True, gain=0.4):
    """Smooth filtered stereo whoosh"""
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    noise = np.random.uniform(-1, 1, n)
    b, a = signal.butter(2, [400.0 / (SAMPLE_RATE/2), 3500.0 / (SAMPLE_RATE/2)], btype='band')
    filtered = signal.lfilter(b, a, noise)
    env = np.sin(np.pi * (t / dur)) ** 2
    pan = np.linspace(-1, 1, n) if pan_left_to_right else np.linspace(1, -1, n)
    left = filtered * env * (1.0 - pan * 0.5) * gain
    right = filtered * env * (1.0 + pan * 0.5) * gain
    return left, right

def sfx_liquid_splash(gain=0.5):
    """Liquid gold droplet splash sound"""
    dur = 0.8
    n = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, n, endpoint=False)
    # Pitch drop bubble + high splash
    f_bubble = 600.0 * np.exp(-t * 18.0) + 180.0
    phase = 2 * np.pi * np.cumsum(f_bubble) / SAMPLE_RATE
    bubble = np.sin(phase) * np.exp(-t * 12.0)
    noise = np.random.uniform(-1, 1, n)
    b, a = signal.butter(2, [1800.0 / (SAMPLE_RATE/2), 7000.0 / (SAMPLE_RATE/2)], btype='band')
    spray = signal.lfilter(b, a, noise) * np.exp(-t * 9.0)
    wave = (bubble * 0.6 + spray * 0.4) * gain
    return wave, wave

def sfx_chime_cascade(gain=0.45):
    """Ascending cascade of crystalline chimes"""
    notes = [note_freq('D5'), note_freq('F#5'), note_freq('A5'), note_freq('D6'), note_freq('F#6'), note_freq('A6')]
    cascade_dur = 1.2
    n = int(cascade_dur * SAMPLE_RATE)
    left = np.zeros(n)
    right = np.zeros(n)
    for i, freq in enumerate(notes):
        st = i * 0.11
        l, r = synth_fm_bell(freq, dur=1.0, mod_ratio=2.756, gain=gain * 0.8)
        st_samp = int(st * SAMPLE_RATE)
        rem = min(len(l), n - st_samp)
        pan = (i / float(len(notes) - 1)) * 1.4 - 0.7
        left[st_samp:st_samp+rem] += l[:rem] * (1.0 - pan * 0.5)
        right[st_samp:st_samp+rem] += r[:rem] * (1.0 + pan * 0.5)
    return left, right


# =============================================================
# COMPOSE 30-SECOND LIQUID GOLD CINEMATIC SCORE
# =============================================================
print("Composing 30-Second Liquid Gold Score (90 BPM, D Major)...")

# Chord progression in D Major:
# Bar 1-3 (0.0s - 6.0s): D Major (D3, F#3, A3, D4)
# Bar 4-6 (6.0s - 12.0s): B Minor -> G Major -> A Major -> D Major
# Bar 7-9 (12.0s - 18.0s): D Major -> B Minor -> G Major -> A Major (Full groove)
# Bar 10-12 (18.0s - 24.0s): D Major -> A Major -> G Major -> D Major (Triumphant)
# Bar 13-15 (24.0s - 30.0s): D Major Grand Resolution

chord_D = [note_freq('D3'), note_freq('F#3'), note_freq('A3'), note_freq('D4')]
chord_Bm = [note_freq('B2'), note_freq('D3'), note_freq('F#3'), note_freq('B3')]
chord_G = [note_freq('G2'), note_freq('B2'), note_freq('D3'), note_freq('G3')]
chord_A = [note_freq('A2'), note_freq('C#3'), note_freq('E3'), note_freq('A3')]

# -------------------------------------------------------------
# ACT 1: THE GOLDEN FORGE (0.0s – 6.0s)
# -------------------------------------------------------------
# 0.0s: Molten gold drop falls in space, deep sub drone
mix(0.0, *synth_sub_bass(note_freq('D1'), dur=6.0, gain=0.75))
mix(0.0, *synth_warm_pad(chord_D, dur=6.0, gain=0.35))
mix(0.0, *sfx_whoosh(1.4, pan_left_to_right=True, gain=0.35))

# 1.2s: Droplet splash & expanding ripples
mix(1.2, *sfx_liquid_splash(gain=0.6))

# 2.2s: 3D Crown materializes with resonant gold bell
mix(2.2, *synth_fm_bell(note_freq('D5'), dur=4.5, gain=0.45))

# 2.9s - 4.5s: Piano Theme (Ascending 4-note motif: D4 -> F#4 -> A4 -> D5)
mix(2.9, *synth_piano(note_freq('D4'), dur=0.6, vel=0.75))
mix(3.4, *synth_piano(note_freq('F#4'), dur=0.6, vel=0.80))
mix(3.9, *synth_piano(note_freq('A4'), dur=0.6, vel=0.85))
mix(4.4, *synth_piano(note_freq('D5'), dur=2.5, vel=0.95))

# 4.5s: Strings swell beneath Crown
mix(4.5, *synth_strings([note_freq('F#4'), note_freq('A4'), note_freq('D5')], dur=4.5, gain=0.3))


# -------------------------------------------------------------
# ACT 2: PRECISION ENGINE (6.0s – 12.0s)
# -------------------------------------------------------------
# 5.8s: Transition whoosh into Swiss horology gears
mix(5.7, *sfx_whoosh(0.8, pan_left_to_right=False, gain=0.4))

# 6.0s - 9.0s: Precision clockwork escapement ticking (16th notes at 90 BPM = every 0.1667s)
for step in range(18):
    t_tick = 6.0 + step * SIXTEENTH
    mix(t_tick, *sfx_clock_tick(gain=0.22 if step % 2 == 0 else 0.14))

# 6.0s: Bass shifts to B1
mix(6.0, *synth_sub_bass(note_freq('B1'), dur=2.7, gain=0.65))
mix(6.0, *synth_warm_pad(chord_Bm, dur=3.0, gain=0.35))

# 7.5s - 9.0s: Piano second phrase (F#4 -> A4 -> C#5 -> E5)
mix(7.5, *synth_piano(note_freq('F#4'), dur=0.5, vel=0.75))
mix(8.0, *synth_piano(note_freq('A4'), dur=0.5, vel=0.80))
mix(8.5, *synth_piano(note_freq('C#5'), dur=0.5, vel=0.85))
mix(9.0, *synth_piano(note_freq('E5'), dur=2.0, vel=0.90))

# 8.7s: Bass moves to G1
mix(8.7, *synth_sub_bass(note_freq('G1'), dur=3.3, gain=0.7))
mix(8.7, *synth_warm_pad(chord_G, dur=3.3, gain=0.35))

# 9.0s - 12.0s: Rhythmic pulse enters (kick on quarter notes, closed hihat on 8ths)
for b in range(4):
    t_b = 9.333 + b * BEAT
    mix(t_b, *drum_kick(dur=0.32, gain=0.75))
    mix(t_b + EIGHTH, *drum_hihat(dur=0.06, open_hh=False, gain=0.25))

# 11.2s: Tension riser into the 6-Quant Arsenal
mix(11.2, *sfx_whoosh(0.85, pan_left_to_right=True, gain=0.45))


# -------------------------------------------------------------
# ACT 3: THE MULTI-ALGORITHM ARSENAL (12.0s – 18.0s)
# -------------------------------------------------------------
# 12.0s: Full groove drops! Kick + Snare + HiHats at 90 BPM
mix(12.0, *drum_crash(dur=2.8, gain=0.6))
mix(12.0, *sfx_sub_drop(dur=2.5, gain=0.8))

# 9 beats of full driving rhythm (12.0s to 18.0s)
num_groove_beats = int(round((18.0 - 12.0) / BEAT))
for b in range(num_groove_beats):
    t_b = 12.0 + b * BEAT
    # Kick on 1 and 3 (every 2 beats) + extra syncopation
    if b % 2 == 0:
        mix(t_b, *drum_kick(dur=0.35, gain=0.88))
    # Snare on 2 and 4
    if b % 2 == 1:
        mix(t_b, *drum_snare(dur=0.25, gain=0.72))
    # Hi-hats on 8th notes
    mix(t_b, *drum_hihat(dur=0.06, open_hh=False, gain=0.25))
    mix(t_b + EIGHTH, *drum_hihat(dur=0.08, open_hh=(b % 2 == 1), gain=0.32))

# Harmonic pad progression across Act 3
mix(12.0, *synth_warm_pad(chord_D, dur=2.7, gain=0.38))
mix(12.0, *synth_sub_bass(note_freq('D1'), dur=2.7, gain=0.75))

mix(14.7, *synth_warm_pad(chord_Bm, dur=2.7, gain=0.38))
mix(14.7, *synth_sub_bass(note_freq('B1'), dur=2.7, gain=0.75))

# 6 Minted Gold Medallions orbit - Ascending FM chime for each of the 6 EAs:
# 12.4s: EA Budak Ubat (D5)
# 12.9s: GoldMind AI (E5)
# 13.4s: MathEdge Pro (F#5)
# 13.9s: Aligator Gozaimasu (A5)
# 14.4s: Encik Moku (B5)
# 14.9s: BracketBlitz (D6)
coin_notes = [note_freq('D5'), note_freq('E5'), note_freq('F#5'), note_freq('A5'), note_freq('B5'), note_freq('D6')]
for i, c_freq in enumerate(coin_notes):
    mix(12.4 + i * 0.5, *synth_fm_bell(c_freq, dur=2.0, gain=0.35))

# 15.5s: Orchestral strings swell with candlestick chart backdrop
mix(15.2, *synth_strings([note_freq('D4'), note_freq('F#4'), note_freq('A4'), note_freq('D5')], dur=3.2, gain=0.35))
mix(17.4, *sfx_whoosh(0.7, pan_left_to_right=False, gain=0.4))


# -------------------------------------------------------------
# ACT 4: THE GIFT ($149 USD -> $0 FREE) (18.0s – 24.0s)
# -------------------------------------------------------------
# 18.0s: Vault latch unlocks
mix(18.0, *sfx_liquid_splash(gain=0.45))
mix(18.0, *synth_sub_bass(note_freq('G1'), dur=2.7, gain=0.75))
mix(18.0, *synth_warm_pad(chord_G, dur=2.7, gain=0.38))

# 18.5s: Ascending Chime Cascade ($149 struck through)
mix(18.5, *sfx_chime_cascade(gain=0.5))

# 19.5s: Massive 808 Sub Drop & Triumphant Brass Hit ($0 FREE explosion!)
mix(19.5, *sfx_sub_drop(dur=3.2, gain=0.92))
mix(19.5, *drum_crash(dur=3.0, gain=0.65))
mix(19.5, *synth_brass_stab(chord_D, dur=1.8, gain=0.45))
mix(19.5, *synth_fm_bell(note_freq('D5'), dur=4.0, gain=0.45))

# Full driving celebration beat (19.5s to 24.0s)
for b in range(7):
    t_b = 19.5 + b * BEAT
    if b % 2 == 0:
        mix(t_b, *drum_kick(dur=0.35, gain=0.9))
    if b % 2 == 1:
        mix(t_b, *drum_snare(dur=0.25, gain=0.75))
    mix(t_b, *drum_hihat(dur=0.06, open_hh=False, gain=0.28))
    mix(t_b + EIGHTH, *drum_hihat(dur=0.08, open_hh=True, gain=0.35))

# 20.8s: Second triumphant brass chord (G Major -> A Major)
mix(20.8, *synth_brass_stab(chord_A, dur=1.6, gain=0.42))
mix(20.8, *synth_warm_pad(chord_A, dur=2.5, gain=0.35))

# 22.2s: Piano arpeggios in celebration
mix(22.0, *synth_piano(note_freq('A4'), dur=0.4, vel=0.85))
mix(22.3, *synth_piano(note_freq('D5'), dur=0.4, vel=0.90))
mix(22.6, *synth_piano(note_freq('F#5'), dur=0.4, vel=0.95))
mix(22.9, *synth_piano(note_freq('A5'), dur=1.8, vel=1.0))


# -------------------------------------------------------------
# ACT 5: THE CALL TO ACTION (24.0s – 30.0s)
# -------------------------------------------------------------
# 24.0s: Beat gracefully pulls back, Crown settles
mix(24.0, *sfx_whoosh(0.9, pan_left_to_right=True, gain=0.4))
mix(24.1, *drum_crash(dur=3.5, gain=0.55))
mix(24.1, *synth_sub_bass(note_freq('D1'), dur=5.5, gain=0.7))

# 24.1s: Resonant Cathedral Bell on D4 (rich, long reverb)
mix(24.1, *synth_fm_bell(note_freq('D4'), dur=5.8, gain=0.5))

# 24.8s - 27.5s: Descending resolution piano phrase (A4 -> F#4 -> D4)
mix(24.8, *synth_piano(note_freq('A4'), dur=1.0, vel=0.78))
mix(25.6, *synth_piano(note_freq('F#4'), dur=1.0, vel=0.75))
mix(26.4, *synth_piano(note_freq('D4'), dur=3.2, vel=0.85))

# Warm strings & pad hold final peaceful D Major chord
mix(24.0, *synth_strings(chord_D, dur=5.5, gain=0.3))
mix(24.0, *synth_warm_pad(chord_D, dur=5.5, gain=0.32))

# 27.2s: Final sparkle chime echo
mix(27.2, *synth_fm_bell(note_freq('D6'), dur=2.5, gain=0.28))


# -------------------------------------------------------------
# MASTERING BUS (Strictly Linear, Analog Tanh Saturation, No Discontinuities)
# -------------------------------------------------------------
print("Mastering audio bus with analog soft-knee saturation...")

# 1. Gentle fade-in (10ms) and fade-out (0.6s) to ensure zero pop/click
fade_in_n = int(0.01 * SAMPLE_RATE)
fade_out_n = int(0.6 * SAMPLE_RATE)

master_left[:fade_in_n] *= np.linspace(0, 1, fade_in_n)
master_right[:fade_in_n] *= np.linspace(0, 1, fade_in_n)

master_left[-fade_out_n:] *= np.linspace(1, 0, fade_out_n)
master_right[-fade_out_n:] *= np.linspace(1, 0, fade_out_n)

# 2. Check pre-saturation peaks
peak_pre = max(np.max(np.abs(master_left)), np.max(np.abs(master_right)))
print(f"Pre-mastering peak level: {peak_pre:.3f}")
if peak_pre > 0:
    master_left /= (peak_pre / 1.15)
    master_right /= (peak_pre / 1.15)

# 3. Clean hyperbolic tangent saturation (warm analog curve, zero phase inversion, zero clipping)
master_left = np.tanh(master_left) * 0.92
master_right = np.tanh(master_right) * 0.92

# 4. Convert to standard 16-bit PCM
stereo = np.vstack([master_left, master_right]).T
audio_16bit = np.int16(stereo * 32767.0)

# Output paths
out_v2 = os.path.join(os.path.dirname(__file__), "soundtrack_v2.wav")
wavfile.write(out_v2, SAMPLE_RATE, audio_16bit)
print(f"Successfully wrote clean soundtrack: {out_v2} ({os.path.getsize(out_v2)} bytes)")
