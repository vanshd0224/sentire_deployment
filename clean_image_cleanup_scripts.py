import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\find_thirty_ml_products_usage.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\inspect_all_perfume_images_data.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\verify_perfumes_data_list.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up image cleanup scripts!")
