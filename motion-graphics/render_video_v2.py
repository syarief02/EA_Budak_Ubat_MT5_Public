"""
EA Budak Ubat - Liquid Gold Motion Graphics V2
Headless Video Renderer using Playwright + FFmpeg
Renders player_v2.html to MP4 (H.264 + AAC)
"""
import subprocess
import os
import sys
import time
import base64
import shutil

# Ensure UTF-8 output if possible, but keep prints strictly ASCII-safe
if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PLAYER_HTML = os.path.join(SCRIPT_DIR, "player_v2.html")
AUDIO_WAV = os.path.join(SCRIPT_DIR, "soundtrack_v2.wav")
OUTPUT_WEBM = os.path.join(SCRIPT_DIR, "raw_capture_v2.webm")
OUTPUT_MP4 = os.path.join(SCRIPT_DIR, "ea_budak_ubat_motion_v2_30s.mp4")
WEB_MP4 = os.path.join(SCRIPT_DIR, "..", "ea-budak-ubat-web", "public", "videos", "ea_budak_ubat_30s.mp4")
PUBLIC_REEL_DIR = os.path.join(SCRIPT_DIR, "..", "ea-budak-ubat-web", "public", "reel")

FFMPEG = None
try:
    import imageio_ffmpeg
    FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
except Exception:
    FFMPEG = "ffmpeg"


def find_chromium():
    base = os.path.join(os.environ.get("LOCALAPPDATA", ""), "ms-playwright")
    if os.path.exists(base):
        for d in sorted(os.listdir(base), reverse=True):
            if d.startswith("chromium"):
                chrome = os.path.join(base, d, "chrome-win64", "chrome.exe")
                if os.path.exists(chrome):
                    return chrome
                chrome = os.path.join(base, d, "chrome-win", "chrome.exe")
                if os.path.exists(chrome):
                    return chrome
    return None


def render_video():
    from playwright.sync_api import sync_playwright

    print("=" * 60)
    print("EA BUDAK UBAT - LIQUID GOLD MOTION V2 RENDERER")
    print("=" * 60)

    if not os.path.exists(PLAYER_HTML):
        print(f"ERROR: Player file not found: {PLAYER_HTML}")
        sys.exit(1)

    print(f"Player HTML: {PLAYER_HTML}")
    print(f"Soundtrack:  {AUDIO_WAV} (exists: {os.path.exists(AUDIO_WAV)})")
    print(f"Output MP4:  {OUTPUT_MP4}")
    print(f"Web Target:  {WEB_MP4}")
    print(f"FFmpeg Bin:  {FFMPEG}")

    with sync_playwright() as p:
        chrome_bin = find_chromium()
        print(f"Chromium:    {chrome_bin or 'system-bundled'}")

        launch_args = {
            "headless": True,
            "args": [
                "--no-sandbox",
                "--disable-gpu",
                "--autoplay-policy=no-user-gesture-required",
                "--window-size=1920,1080",
            ],
        }
        if chrome_bin:
            launch_args["executable_path"] = chrome_bin

        browser = p.chromium.launch(**launch_args)
        context = browser.new_context(
            viewport={"width": 1920, "height": 1080},
            device_scale_factor=1,
        )
        page = context.new_page()

        file_url = f"file:///{PLAYER_HTML.replace(os.sep, '/')}"
        print(f"Navigating:  {file_url}")
        page.goto(file_url, wait_until="networkidle")
        page.wait_for_timeout(1000)

        # Hide controls for clean full-frame video capture
        page.evaluate("const c = document.getElementById('controls'); if(c) c.style.display = 'none';")

        print("Initializing MediaRecorder stream (VP9 60fps)...")
        page.evaluate("""() => {
            window._captureChunks = [];
            window._captureComplete = false;
            window._captureBase64 = null;

            const canvas = document.getElementById('canvas');
            const stream = canvas.captureStream(60);

            const recorder = new MediaRecorder(stream, {
                mimeType: 'video/webm;codecs=vp9',
                videoBitsPerSecond: 25000000
            });

            recorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) {
                    window._captureChunks.push(e.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(window._captureChunks, { type: 'video/webm' });
                const reader = new FileReader();
                reader.onloadend = () => {
                    window._captureBase64 = reader.result.split(',')[1];
                    window._captureComplete = true;
                };
                reader.readAsDataURL(blob);
            };

            recorder.start(100);
            window._recorder = recorder;
        }""")

        # Trigger playback from time 0
        page.evaluate("""() => {
            currentTime = 0;
            isPlaying = true;
            lastFrameTime = null;
        }""")

        print("Recording 30-second timeline...")
        start_time = time.time()

        for _ in range(38):
            time.sleep(1.0)
            ct = page.evaluate("currentTime")
            playing = page.evaluate("isPlaying")
            elapsed = time.time() - start_time
            state_str = "PLAYING" if playing else "STOPPED"
            print(f"  [{elapsed:4.1f}s] Canvas Time: {ct/1000:4.1f}s / 30.0s [{state_str}]")
            if ct >= 30000 or (not playing and ct >= 29500):
                break

        print("Stopping MediaRecorder...")
        page.evaluate("if (window._recorder && window._recorder.state !== 'inactive') window._recorder.stop();")
        page.wait_for_timeout(2000)

        # Wait for base64 conversion
        for _ in range(20):
            complete = page.evaluate("window._captureComplete === true")
            if complete:
                break
            time.sleep(0.5)

        b64_data = page.evaluate("window._captureBase64")
        if not b64_data:
            print("ERROR: Failed to retrieve video stream base64 data.")
            browser.close()
            sys.exit(1)

        webm_bytes = base64.b64decode(b64_data)
        with open(OUTPUT_WEBM, "wb") as f:
            f.write(webm_bytes)

        print(f"[OK] WebM captured: {OUTPUT_WEBM} ({len(webm_bytes)/1024/1024:.2f} MB)")
        browser.close()

    # Mux WebM + WAV into Master MP4 with FFmpeg
    print("\nMuxing video and audio with FFmpeg...")
    ffmpeg_cmd = [
        FFMPEG,
        "-y",
        "-i", OUTPUT_WEBM,
    ]

    if os.path.exists(AUDIO_WAV):
        ffmpeg_cmd += ["-i", AUDIO_WAV]

    ffmpeg_cmd += [
        "-c:v", "libx264",
        "-preset", "slow",
        "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-r", "60",
    ]

    if os.path.exists(AUDIO_WAV):
        ffmpeg_cmd += [
            "-c:a", "aac",
            "-b:a", "320k",
            "-ac", "2",
            "-ar", "44100",
            "-shortest",
        ]

    ffmpeg_cmd += [
        "-movflags", "+faststart",
        "-t", "30",
        OUTPUT_MP4
    ]

    print("Executing FFmpeg command...")
    res = subprocess.run(ffmpeg_cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("FFmpeg error occurred:\n" + res.stderr[-1000:])
        sys.exit(1)

    if not os.path.exists(OUTPUT_MP4):
        print("ERROR: Master MP4 was not produced.")
        sys.exit(1)

    mp4_size = os.path.getsize(OUTPUT_MP4)
    print(f"[SUCCESS] Master MP4 created: {OUTPUT_MP4} ({mp4_size/1024/1024:.2f} MB)")

    # Copy to web public directory
    os.makedirs(os.path.dirname(WEB_MP4), exist_ok=True)
    shutil.copy2(OUTPUT_MP4, WEB_MP4)
    print(f"[SUCCESS] Web distribution copy: {WEB_MP4}")

    # Extract high-definition scene stills for /reel showcase storyboard
    print("\nExtracting HD Scene Preview Stills...")
    scenes = [
        ("scene1_matrix.jpg", 4.5),
        ("scene2_flagship.jpg", 9.5),
        ("scene3_breakeven.jpg", 13.5),
        ("scene4_arsenal.jpg", 16.5),
        ("scene5_freelicense.jpg", 21.5),
        ("scene6_cta.jpg", 27.5),
    ]

    os.makedirs(PUBLIC_REEL_DIR, exist_ok=True)
    for fname, ts in scenes:
        out_local = os.path.join(SCRIPT_DIR, fname)
        out_public = os.path.join(PUBLIC_REEL_DIR, fname)
        extract_cmd = [
            FFMPEG, "-y",
            "-ss", str(ts),
            "-i", OUTPUT_MP4,
            "-frames:v", "1",
            "-q:v", "2",
            out_local
        ]
        subprocess.run(extract_cmd, capture_output=True)
        if os.path.exists(out_local):
            shutil.copy2(out_local, out_public)
            kb = os.path.getsize(out_local) / 1024
            print(f"  [OK] {fname} ({kb:.0f} KB) @ {ts:.1f}s")

    # Clean temporary webm capture file
    if os.path.exists(OUTPUT_WEBM):
        try:
            os.remove(OUTPUT_WEBM)
        except Exception:
            pass

    print("\n" + "=" * 60)
    print("V2 LIQUID GOLD MOTION GRAPHICS PRODUCTION COMPLETE!")
    print("=" * 60)


if __name__ == "__main__":
    render_video()
