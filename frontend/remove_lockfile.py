import os

lock_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\package-lock.json"
if os.path.exists(lock_path):
    os.remove(lock_path)
    print("SUCCESS: Deleted outdated package-lock.json")
else:
    print("package-lock.json not found")
