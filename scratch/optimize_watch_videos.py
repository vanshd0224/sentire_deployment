import os
import subprocess

videos_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\videos\watch"
ffmpeg_bin = r"C:\Program Files\BlueStacks_nxt\ffmpeg.exe"

watch_videos = [
    "purple-oud.mp4",
    "calantha.mp4",
    "deep-crush.mp4",
    "midnight.mp4",
    "personna.mp4",
    "rich.mp4",
    "herrlich.mp4",
    "mirai.mp4",
    "0809.mp4",
    "seductive.mp4",
    "white-oud.mp4",
]

print("Starting video compression optimization...")

for vname in watch_videos:
    src_path = os.path.join(videos_dir, vname)
    if not os.path.exists(src_path):
        print(f"Skipping missing video {vname}")
        continue

    temp_path = os.path.join(videos_dir, "opt_" + vname)
    orig_size = os.path.getsize(src_path)

    cmd = [
        ffmpeg_bin,
        "-y",
        "-i", src_path,
        "-vf", "scale=360:640",
        "-c:v", "libopenh264",
        "-b:v", "650k",
        "-an",
        temp_path
    ]

    try:
        res = subprocess.run(cmd, capture_output=True, text=True, check=True)
        new_size = os.path.getsize(temp_path)
        os.replace(temp_path, src_path)
        print(f"[{vname}] {orig_size / 1024 / 1024:.2f} MB -> {new_size / 1024 / 1024:.2f} MB ({100 - (new_size/orig_size*100):.1f}% smaller)")
    except Exception as e:
        print(f"Failed to compress {vname}: {e}")
        if os.path.exists(temp_path):
            os.remove(temp_path)

print("Video compression optimization complete.")
