import os

base_dir = r"C:\Users\asus\.gemini\antigravity\scratch"

print("=== ALL .ENV FILES ACROSS SCRATCH ===")
for root, dirs, files in os.walk(base_dir):
    for f in files:
        if ".env" in f.lower():
            fp = os.path.join(root, f)
            print(f"\n--- {fp} ---")
            try:
                with open(fp, "r", encoding="utf-8") as file_in:
                    print(file_in.read())
            except Exception as e:
                print(e)
