import os

scratch_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment"
temp_files = ["check_all_env_and_configs.py", "clean_mobile_scripts.py", "search_shopify_api_keys.py"]

for f in temp_files:
    p = os.path.join(scratch_dir, f)
    if os.path.exists(p):
        os.remove(p)

print("Cleaned up scratch scripts!")
