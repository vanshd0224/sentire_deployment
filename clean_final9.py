import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_form_post_script.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up clean_form_post_script.py")
