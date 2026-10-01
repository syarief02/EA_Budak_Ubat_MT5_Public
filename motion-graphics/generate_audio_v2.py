import numpy as np
import scipy.signal as signal
import wave
import struct
import math

SAMPLE_RATE = 44100
DURATION = 30.0
T = np.linspace(0, DURATION, int(SAMPLE_RATE * DURATION), endpoint=False)

def note_to_freq(note_name):
    # D1 = 36.71 Hz
    notes = {'C':-9, 'C#':-8, 'D':-7, 'D#':-6, 'E':-5, 'F':-4, 'F#':-3, 'G':-2, 'G#':-1, 'A':0, 'A#':1, 'B':2}
    letter = note_name[:-1]
    octave = int(note_name[-1])
    n = notes[letter] + (octave - 4) * 12
    return 440.0 * (2.0 ** (n / 12.0))

def apply_env(audio, attack_s, decay_s, sustain_l, release_s, duration_s):
    samples = len(audio)
    attack_samps = int(attack_s * SAMPLE_RATE)
    decay_samps = int(decay_s * SAMPLE_RATE)
    release_samps = int(release_s * SAMPLE_RATE)
    
    if attack_samps + decay_samps + release_samps > samples:
        attack_samps = int(samples * 0.1)
        decay_samps = int(samples * 0.1)
        release_samps = int(samples * 0.2)
        
    env = np.ones(samples) * sustain_l
    
    # Attack
    if attack_samps > 0:
        env[:attack_samps] = np.linspace(0, 1, attack_samps)
    
    # Decay
    if decay_samps > 0:
        env[attack_samps:attack_samps+decay_samps] = np.linspace(1, sustain_l, decay_samps)
        
    # Release
    if release_samps > 0:
        env[-release_samps:] = np.linspace(sustain_l, 0, release_samps)
        
    return audio * env

def pad(start_time, duration, freqs):
    samples = int(duration * SAMPLE_RATE)
    t = np.linspace(0, duration, samples, endpoint=False)
    
    out_l = np.zeros(samples)
    out_r = np.zeros(samples)
    
    lfo = 0.5 * (1 + np.sin(2 * np.pi * 0.5 * t))
    
    for f in freqs:
        saw_l = signal.sawtooth(2 * np.pi * (f * 0.995) * t)
        saw_r = signal.sawtooth(2 * np.pi * (f * 1.005) * t)
        
        # Simple LP filter approximation using convolution or butterworth
        b, a = signal.butter(2, 1000 / (SAMPLE_RATE/2), btype='low')
        saw_l = signal.lfilter(b, a, saw_l)
        saw_r = signal.lfilter(b, a, saw_r)
        
        out_l += saw_l
        out_r += saw_r
        
    out_l *= (0.5 + 0.5 * lfo)
    out_r *= (0.5 + 0.5 * lfo)
    
    out_l = apply_env(out_l, 1.0, 0, 1.0, 2.0, duration)
    out_r = apply_env(out_r, 1.0, 0, 1.0, 2.0, duration)
    return out_l * 0.2, out_r * 0.2

def sub_bass(duration, f):
    samples = int(duration * SAMPLE_RATE)
    t = np.linspace(0, duration, samples, endpoint=False)
    sig = np.sin(2 * np.pi * f * t) + 0.15 * np.sin(2 * np.pi * f * 2 * t)
    sig = apply_env(sig, 0.5, 0, 1.0, 0.5, duration)
    return sig * 0.6, sig * 0.6

def piano(duration, f):
    samples = int(duration * SAMPLE_RATE)
    t = np.linspace(0, duration, samples, endpoint=False)
    sig = np.zeros(samples)
    
    harmonics = [1, 2, 3, 4, 5, 6]
    amps = [1.0, 0.5, 0.25, 0.12, 0.06, 0.03]
    
    for h, a in zip(harmonics, amps):
        decay_rate = 2.0 * h
        env = np.exp(-decay_rate * t)
        sig += a * env * np.sin(2 * np.pi * f * h * t)
        
    sig = apply_env(sig, 0.01, 0, 1.0, 0.1, duration)
    return sig * 0.4, sig * 0.4

def bell(duration, f):
    samples = int(duration * SAMPLE_RATE)
    t = np.linspace(0, duration, samples, endpoint=False)
    
    ratio = 2.76
    mod_idx = 3.0 * np.exp(-3.0 * t)
    
    modulator = np.sin(2 * np.pi * (f * ratio) * t)
    carrier = np.sin(2 * np.pi * f * t + mod_idx * modulator)
    
    carrier *= np.exp(-1.5 * t)
    carrier = apply_env(carrier, 0.01, 0, 1.0, 0.5, duration)
    return carrier * 0.3, carrier * 0.3

def strings(duration, freqs):
    samples = int(duration * SAMPLE_RATE)
    t = np.linspace(0, duration, samples, endpoint=False)
    out_l = np.zeros(samples)
    out_r = np.zeros(samples)
    
    noise = np.random.randn(samples)
    
    for f in freqs:
        # Narrow bandpass
        b, a = signal.butter(2, [f*0.99 / (SAMPLE_RATE/2), f*1.01 / (SAMPLE_RATE/2)], btype='band')
        filtered = signal.lfilter(b, a, noise)
        out_l += filtered * 20.0
        out_r += filtered * 20.0
        
    out_l = apply_env(out_l, 1.5, 0, 1.0, 1.5, duration)
    out_r = apply_env(out_r, 1.5, 0, 1.0, 1.5, duration)
    return out_l * 0.2, out_r * 0.2

def brass(duration, freqs):
    samples = int(duration * SAMPLE_RATE)
    t = np.linspace(0, duration, samples, endpoint=False)
    out = np.zeros(samples)
    
    for f in freqs:
        saw = signal.sawtooth(2 * np.pi * f * t)
        
        # Filter envelope
        env = np.exp(-2.0 * t)
        fc = 400 + 2000 * env
        
        # Time varying filter is hard with lfilter, use a static approximation or biquad in C.
        # We'll use a static LP for simplicity here
        b, a = signal.butter(2, 1200 / (SAMPLE_RATE/2), btype='low')
        saw = signal.lfilter(b, a, saw)
        out += saw
        
    out = apply_env(out, 0.1, 0, 1.0, 0.2, duration)
    return out * 0.3, out * 0.3

def clockwork():
    dur = 0.05
    samples = int(dur * SAMPLE_RATE)
    noise = np.random.randn(samples)
    b, a = signal.butter(2, 3000 / (SAMPLE_RATE/2), btype='high')
    noise = signal.lfilter(b, a, noise)
    noise = apply_env(noise, 0.001, 0.02, 0, 0.01, dur)
    return noise * 0.1, noise * 0.1

def kick():
    dur = 0.3
    samples = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, samples, endpoint=False)
    # Pitch sweep 150 -> 40 in 50ms
    f_t = np.maximum(40, 150 - (110 / 0.05) * t)
    phase = np.cumsum(f_t) / SAMPLE_RATE * 2 * np.pi
    sine = np.sin(phase)
    sine = apply_env(sine, 0.001, 0.1, 0.1, 0.1, dur)
    
    noise = np.random.randn(samples)
    noise = apply_env(noise, 0.001, 0.02, 0, 0.01, dur)
    
    out = sine * 0.8 + noise * 0.1
    return out, out

def snare():
    dur = 0.3
    samples = int(dur * SAMPLE_RATE)
    t = np.linspace(0, dur, samples, endpoint=False)
    
    noise = np.random.randn(samples)
    noise = apply_env(noise, 0.005, 0.1, 0, 0.1, dur)
    
    sine = np.sin(2 * np.pi * 200 * t)
    sine = apply_env(sine, 0.005, 0.05, 0, 0.01, dur)
    
    out = noise * 0.5 + sine * 0.3
    return out, out

def hihat():
    dur = 0.1
    samples = int(dur * SAMPLE_RATE)
    noise = np.random.randn(samples)
    b, a = signal.butter(2, 8000 / (SAMPLE_RATE/2), btype='high')
    noise = signal.lfilter(b, a, noise)
    noise = apply_env(noise, 0.001, 0.03, 0, 0.01, dur)
    return noise * 0.2, noise * 0.2

def add_clip(track_l, track_r, start, clip_l, clip_r):
    start_samp = int(start * SAMPLE_RATE)
    length = len(clip_l)
    end_samp = start_samp + length
    if end_samp > len(track_l):
        length = len(track_l) - start_samp
        clip_l = clip_l[:length]
        clip_r = clip_r[:length]
    track_l[start_samp:start_samp+length] += clip_l
    track_r[start_samp:start_samp+length] += clip_r

master_l = np.zeros(len(T))
master_r = np.zeros(len(T))

# D Major frequencies
Dmaj = [note_to_freq('D3'), note_to_freq('F#3'), note_to_freq('A3')]
Dmaj_pad = pad(0.5, 29.5, Dmaj)
add_clip(master_l, master_r, 0.5, Dmaj_pad[0], Dmaj_pad[1])

# Sub bass
sub1 = sub_bass(6.0, note_to_freq('D1'))
add_clip(master_l, master_r, 0.0, sub1[0], sub1[1])
sub2 = sub_bass(6.0, note_to_freq('A1'))
add_clip(master_l, master_r, 6.0, sub2[0], sub2[1])
sub3 = sub_bass(6.0, note_to_freq('D2'))
add_clip(master_l, master_r, 12.0, sub3[0], sub3[1])
sub4 = sub_bass(6.0, note_to_freq('D1'))
add_clip(master_l, master_r, 24.0, sub4[0], sub4[1])

# Piano Act 1
p1 = piano(0.4, note_to_freq('D4'))
p2 = piano(0.4, note_to_freq('F#4'))
p3 = piano(0.4, note_to_freq('A4'))
p4 = piano(2.0, note_to_freq('D5'))
add_clip(master_l, master_r, 3.0, p1[0], p1[1])
add_clip(master_l, master_r, 3.4, p2[0], p2[1])
add_clip(master_l, master_r, 3.8, p3[0], p3[1])
add_clip(master_l, master_r, 4.2, p4[0], p4[1])

# Piano Act 2
p1_2 = piano(0.4, note_to_freq('A4'))
p2_2 = piano(0.4, note_to_freq('D5'))
p3_2 = piano(0.4, note_to_freq('F#5'))
p4_2 = piano(2.0, note_to_freq('A5'))
add_clip(master_l, master_r, 8.0, p1_2[0], p1_2[1])
add_clip(master_l, master_r, 8.4, p2_2[0], p2_2[1])
add_clip(master_l, master_r, 8.8, p3_2[0], p3_2[1])
add_clip(master_l, master_r, 9.2, p4_2[0], p4_2[1])

# Strings
str_clip1 = strings(7.0, [note_to_freq('D4'), note_to_freq('F#4'), note_to_freq('A4')])
add_clip(master_l, master_r, 5.0, str_clip1[0], str_clip1[1])

str_clip2 = strings(6.0, [note_to_freq('D4'), note_to_freq('F#4'), note_to_freq('A4')])
add_clip(master_l, master_r, 16.0, str_clip2[0], str_clip2[1])

# Bell
b1 = bell(5.0, note_to_freq('D5'))
add_clip(master_l, master_r, 2.5, b1[0], b1[1])
b2 = bell(6.0, note_to_freq('D4'))
add_clip(master_l, master_r, 24.0, b2[0], b2[1])

# Clockwork
for i in range(10):
    cw = clockwork()
    add_clip(master_l, master_r, 6.0 + i*0.667, cw[0], cw[1])

# Electronic Beat Act 2
for i in range(4):
    k = kick()
    hh = hihat()
    add_clip(master_l, master_r, 9.0 + i*(60/90), k[0], k[1])
    add_clip(master_l, master_r, 9.0 + i*(60/90) + 0.333, hh[0], hh[1])

# Beat Act 3 & 4
for i in range(12, 24):
    # This is a bit rough, but handles kick/snare pattern
    if i % 2 == 0:
        k = kick()
        add_clip(master_l, master_r, float(i), k[0], k[1])
    else:
        s = snare()
        add_clip(master_l, master_r, float(i), s[0], s[1])
    for j in range(4): # 8ths
        hh = hihat()
        add_clip(master_l, master_r, float(i) + j*0.25, hh[0], hh[1])

# Coins
coins = ['D5', 'E5', 'F#5', 'A5', 'B5', 'D6']
for i, c in enumerate(coins):
    b = bell(2.0, note_to_freq(c))
    add_clip(master_l, master_r, 12.5 + i*0.5, b[0], b[1])

# Brass
br1 = brass(1.0, [note_to_freq('D4'), note_to_freq('F#4'), note_to_freq('A4')])
add_clip(master_l, master_r, 20.0, br1[0], br1[1])
br2 = brass(1.0, [note_to_freq('G3'), note_to_freq('B3'), note_to_freq('D4')])
add_clip(master_l, master_r, 22.0, br2[0], br2[1])

# Piano end
p_end1 = piano(1.0, note_to_freq('A4'))
p_end2 = piano(1.0, note_to_freq('F#4'))
p_end3 = piano(4.0, note_to_freq('D4'))
add_clip(master_l, master_r, 25.0, p_end1[0], p_end1[1])
add_clip(master_l, master_r, 26.0, p_end2[0], p_end2[1])
add_clip(master_l, master_r, 27.0, p_end3[0], p_end3[1])


# Mastering
def soft_limiter(sig):
    # Simple soft knee limiter
    threshold = 0.8
    out = np.copy(sig)
    mask = np.abs(out) > threshold
    out[mask] = threshold + (out[mask] - threshold) / (1 + ((out[mask] - threshold) / (1 - threshold))**2)
    
    # Normalize to -1dBFS (approx 0.89)
    peak = np.max(np.abs(out))
    if peak > 0:
        out *= (0.89 / peak)
    return out

master_l = soft_limiter(master_l)
master_r = soft_limiter(master_r)

master_l = np.int16(master_l * 32767)
master_r = np.int16(master_r * 32767)
stereo = np.empty(master_l.size * 2, dtype=np.int16)
stereo[0::2] = master_l
stereo[1::2] = master_r

with wave.open(r"c:\Users\User\OneDrive\Desktop\ea bu mt5 public\motion-graphics\soundtrack_v2.wav", 'w') as f:
    f.setnchannels(2)
    f.setsampwidth(2)
    f.setframerate(SAMPLE_RATE)
    f.writeframes(stereo.tobytes())
