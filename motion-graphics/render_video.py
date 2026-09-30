import time
import os
import subprocess
import base64
from playwright.sync_api import sync_playwright
import imageio_ffmpeg

FFMPEG_PATH = imageio_ffmpeg.get_ffmpeg_exe()
HTML_PATH = os.path.abspath("motion-graphics/player.html").replace("\\", "/")
AUDIO_PATH = os.path.abspath("motion-graphics/soundtrack_and_sfx.wav")
WEBM_OUTPUT = os.path.abspath("motion-graphics/temp_video.webm")
MP4_OUTPUT = os.path.abspath("motion-graphics/ea_budak_ubat_motion_graphics_30s.mp4")
WEB_MP4_OUTPUT = os.path.abspath("ea-budak-ubat-web/public/videos/ea_budak_ubat_30s.mp4")

print(f"Using FFmpeg: {FFMPEG_PATH}")
print(f"Loading HTML: {HTML_PATH}")

t_start = time.time()

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        args=[
            "--enable-gpu-rasterization",
            "--enable-zero-copy",
            "--disable-background-timer-throttling",
            "--disable-backgrounding-occluded-windows",
            "--disable-renderer-backgrounding"
        ]
    )
    page = browser.new_page(viewport={'width': 1920, 'height': 1080})
    page.goto(f"file:///{HTML_PATH}")
    page.wait_for_selector("#motionCanvas")

    print("Configuring MediaRecorder on 1080p canvas stream...")
    page.evaluate("""
        () => {
            // Hide overlay button and controls during recording
            const overlay = document.getElementById('overlayPlay');
            if (overlay) overlay.style.display = 'none';

            window.recordedChunks = [];
            const canvas = document.getElementById('motionCanvas');
            const stream = canvas.captureStream(30);
            
            const options = {
                mimeType: 'video/webm;codecs=vp9',
                videoBitsPerSecond: 20000000 // 20 Mbps high quality
            };
            window.mediaRecorder = new MediaRecorder(stream, options);
            window.mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    window.recordedChunks.push(e.data);
                }
            };
            window.isRecordingDone = false;
            window.mediaRecorder.onstop = async () => {
                const blob = new Blob(window.recordedChunks, { type: 'video/webm' });
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    window.recordedBase64 = reader.result.split(',')[1];
                    window.isRecordingDone = true;
                };
            };
        }
    """)

    print("Starting MediaRecorder and native 60fps playback engine...")
    page.evaluate("""
        () => {
            window.mediaRecorder.start(200);
            play();
        }
    """)

    # Let the video record for 30.3 seconds in real time
    record_seconds = 30.3
    step_interval = 2.0
    elapsed = 0.0
    while elapsed < record_seconds:
        time.sleep(step_interval)
        elapsed += step_interval
        current_t = page.evaluate("currentTime")
        print(f"Recording progress: {current_t:.1f}s / 30.0s")

    print("Stopping MediaRecorder...")
    page.evaluate("window.mediaRecorder.stop(); pause();")

    print("Extracting recorded video blob...")
    page.wait_for_function("window.isRecordingDone === true", timeout=30000)

    base64_data = page.evaluate("window.recordedBase64")
    video_bytes = base64.b64decode(base64_data)
    with open(WEBM_OUTPUT, "wb") as f:
        f.write(video_bytes)
    print(f"Captured WebM video: {WEBM_OUTPUT} ({len(video_bytes)} bytes)")

    browser.close()

# FFmpeg Muxing & Encoding to Broadcast 1080p MP4 (H.264 + AAC)
print("Encoding master broadcast MP4 with FFmpeg...")
cmd = [
    FFMPEG_PATH,
    "-y",
    "-i", WEBM_OUTPUT,
    "-i", AUDIO_PATH,
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "18",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "320k",
    "-t", "30.0",
    MP4_OUTPUT
]

proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
if proc.returncode != 0:
    print("FFmpeg error:", proc.stderr)
else:
    print(f"SUCCESS! Master MP4 generated: {MP4_OUTPUT}")
    print(f"Master file size: {os.path.getsize(MP4_OUTPUT)} bytes")

# Also produce faststart web-optimized version
print("Generating web-optimized faststart MP4 for website...")
cmd_web = [
    FFMPEG_PATH,
    "-y",
    "-i", MP4_OUTPUT,
    "-c:v", "copy",
    "-c:a", "copy",
    "-movflags", "+faststart",
    WEB_MP4_OUTPUT
]
subprocess.run(cmd_web, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
print(f"Web MP4 generated: {WEB_MP4_OUTPUT} ({os.path.getsize(WEB_MP4_OUTPUT)} bytes)")
print(f"Total time elapsed: {time.time() - t_start:.2f} seconds")
