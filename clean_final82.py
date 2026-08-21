import os

for f in ["search_modal.py", "search_modal2.py", "clean_final81.py"]:
    p = os.path.join(r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment", f)
    if os.path.exists(p):
        os.remove(p)

print("Cleaned up clean_final82.py")
