import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\audit_entire_shopify_pipeline.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up audit scripts!")
