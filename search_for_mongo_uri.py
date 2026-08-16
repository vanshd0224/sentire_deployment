import os

project_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment"

print("=== SEARCHING FOR MONGODB URI IN ALL ENV / CONFIG FILES ===")
for root, dirs, files in os.walk(project_dir):
    for f in files:
        if f.startswith(".env") or f.endswith(".env") or f.endswith(".json") or f.endswith(".py"):
            fp = os.path.join(root, f)
            try:
                with open(fp, "r", encoding="utf-8") as file_in:
                    content = file_in.read()
                    if "mongodb+srv" in content or "mongodb://" in content:
                        print(f"FOUND IN: {os.path.relpath(fp, project_dir)}")
                        for line in content.splitlines():
                            if "mongo" in line.lower():
                                print(f"  {line.strip()}")
            except Exception as e:
                pass
