import os

artifacts_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"

files = os.listdir(artifacts_dir)
files_sorted = sorted(files, key=lambda f: os.path.getmtime(os.path.join(artifacts_dir, f)), reverse=True)

print("=== ALL RECENT FILES IN USER UPLOADED ===")
for i, f in enumerate(files_sorted[:15]):
    print(f"[{i}] {f} -> {os.path.getmtime(os.path.join(artifacts_dir, f))}")
