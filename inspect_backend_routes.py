import os

backend_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend"

print("=== INSPECTING BACKEND ROUTE FILES ===")
for root, dirs, files in os.walk(os.path.join(backend_dir, "routes")):
    for f in files:
        if f.endswith(".js"):
            fp = os.path.join(root, f)
            print(f"Route File: {os.path.relpath(fp, backend_dir)}")
