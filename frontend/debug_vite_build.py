import subprocess
import os

frontend_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend"

print("=== RUNNING VITE BUILD DIAGNOSTIC ===")
res = subprocess.run(
    ["cmd.exe", "/c", "npx vite build"],
    cwd=frontend_dir,
    capture_output=True,
    text=True
)

print("STDOUT:\n", res.stdout)
print("STDERR:\n", res.stderr)
print("EXIT CODE:", res.returncode)
