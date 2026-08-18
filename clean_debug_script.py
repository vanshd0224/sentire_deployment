import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\debug_why_user_sees_empty_cart.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up debug script!")
