import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\copy_and_deploy_zephyrine_images.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\check_all_perfumes_list.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\get_zephyrine_shopify_variants.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\inspect_zephyrine_code_locations.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\inspect_zephyrine_images.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\search_zephyrine_downloads.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\search_zephyrine_in_code.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up Zephyrine scripts!")
