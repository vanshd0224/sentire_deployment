import os
import shutil

user_home = r"C:\Users\asus"
src_csv = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\shopify_all_11_perfumes_import.csv"

targets = [
    r"C:\Users\asus\Downloads\shopify_all_11_perfumes_import.csv",
    r"C:\Users\asus\OneDrive\Desktop\shopify_all_11_perfumes_import.csv",
    r"C:\Users\asus\OneDrive\Documents\shopify_all_11_perfumes_import.csv"
]

for t in targets:
    try:
        os.makedirs(os.path.dirname(t), exist_ok=True)
        shutil.copyfile(src_csv, t)
        print(f"SUCCESS: Copied to {t}")
    except Exception as e:
        print(f"Failed {t}: {e}")
