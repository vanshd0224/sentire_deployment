import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_admin_test.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\search_env_files_and_tokens.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up scripts!")
