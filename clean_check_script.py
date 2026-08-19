import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\check_perfumes_in_data.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up check_perfumes_in_data.py")
