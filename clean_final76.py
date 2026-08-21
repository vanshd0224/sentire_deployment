import os

for f in ["fetch_msg91_js.js", "search_msg91_methods.js", "clean_final75.py"]:
    p = os.path.join(r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend", f)
    if os.path.exists(p):
        os.remove(p)
    p2 = os.path.join(r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment", f)
    if os.path.exists(p2):
        os.remove(p2)

print("Cleaned up clean_final76.py")
