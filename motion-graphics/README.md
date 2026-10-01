# EA Budak Ubat — Liquid Gold Motion Graphics V2 (30-Second Reel)

Official cinematic motion design showcase for **[https://eabudakubat.com](https://eabudakubat.com)**.

---

## 🎬 Creative Direction: "Liquid Gold" Premium Cinematic

A luxury institutional aesthetic built from scratch to replace the standard tech/matrix style with warm liquid gold, precision Swiss horology clockwork, and majestic orchestral-electronic soundscapes.

### Video Specifications
- **Resolution:** 1920×1080 (Full HD, 16:9)
- **Frame Rate:** 60 FPS
- **Duration:** Exactly 30.00 seconds
- **Video Codec:** H.264 High Profile, CRF 18, `yuv420p`
- **Audio Codec:** AAC 320 kbps Stereo, 44.1 kHz
- **Streaming:** FastStart enabled (`moov` atom at head of file)

---

## 🎵 Soundtrack Architecture (`generate_audio_v2.py`)
- **Key:** D Major (warm, triumphant, institutional)
- **Tempo:** 90 BPM (stately, luxurious)
- **Synthesis:**
  - Additive harmonic piano motif (4-note ascending theme)
  - Warm analog saw pad with stereo detuning
  - Pure sub-bass foundation (D1 ~36Hz)
  - FM bell & chime synthesis
  - Synthesized rhythmic percussion (deep kick, hi-hats, snare, 808 sub drops)
  - Soft-knee limiter mastering to -1 dBFS

---

## 🎭 5-Act Visual Storyboard

| Act | Timestamp | Scene | Key Motion & Audio Elements |
|---|---|---|---|
| **Act 1** | `0.0s – 6.0s` | **The Golden Forge** | Molten liquid gold drop falls in slow motion; concentric ripples expand; 3D Crown materializes with 24K gold foil typography. Sub-bass drone & liquid splash SFX. |
| **Act 2** | `6.0s – 12.0s` | **Precision Engine** | Crown morphs into Swiss chronometer gears: ADR AI, Break-Even, Risk Mgmt, OnTick(), and SafeGuard. Mechanical clockwork ticking and strings swell. |
| **Act 3** | `12.0s – 18.0s` | **The Arsenal** | 6 minted 3D gold medallions orbit in a cosmic double helix against amber candlestick telemetry: EA Budak Ubat, GoldMind AI, MathEdge Pro, Aligator Gozaimasu, Encik Moku, BracketBlitz. Ascending 6-coin chime scale. |
| **Act 4** | `18.0s – 24.0s` | **The Gift** | Luxury vault unboxing; $149 USD retail price tag is struck through and explodes into triumphant **$0 FREE** lifetime whitelist for all 14 partner brokers. 808 sub drop & brass hit. |
| **Act 5** | `24.0s – 30.0s` | **The Call** | Golden Crown settles; grand lockup for `https://eabudakubat.com`; 3-step setup guide (Choose Broker, Verify Whitelist, Deploy). Resonant major bell & resolution piano. |

---

## 🛠️ Reproduction & Rendering Commands

1. **Synthesize Audio:**
   ```bash
   python motion-graphics/generate_audio_v2.py
   ```
2. **Headless Render 60fps MP4:**
   ```bash
   python motion-graphics/render_video_v2.py
   ```
3. **Interactive Browser Preview:**
   Open `motion-graphics/player_v2.html` in Chrome/Edge with live timeline scrubber, act pills, and audio sync.
