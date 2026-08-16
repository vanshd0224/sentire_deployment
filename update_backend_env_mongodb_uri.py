import os

mongo_uri = "mongodb+srv://vgupta242004_db_user:PM9V8Modrfry6yRA@clusterbackend.dxe8poq.mongodb.net/sentire_db?retryWrites=true&w=majority&appName=Clusterbackend"

# 1. Update backend/.env
env_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\.env"
if os.path.exists(env_path):
    with open(env_path, "r", encoding="utf-8") as f:
        env_code = f.read()
    
    lines = env_code.splitlines()
    new_lines = []
    for line in lines:
        if line.startswith("MONGODB_URI="):
            new_lines.append(f"MONGODB_URI={mongo_uri}")
        else:
            new_lines.append(line)
    
    with open(env_path, "w", encoding="utf-8") as f:
        f.write("\n".join(new_lines))

# 2. Update shopify-backend/.env if exists
env_path_2 = r"C:\Users\asus\.gemini\antigravity\scratch\shopify-backend\.env"
if os.path.exists(env_path_2):
    with open(env_path_2, "r", encoding="utf-8") as f:
        env_code = f.read()
    
    lines = env_code.splitlines()
    new_lines = []
    for line in lines:
        if line.startswith("MONGODB_URI="):
            new_lines.append(f"MONGODB_URI={mongo_uri}")
        else:
            new_lines.append(line)
    
    with open(env_path_2, "w", encoding="utf-8") as f:
        f.write("\n".join(new_lines))

print("SUCCESS: Updated MONGODB_URI in backend/.env!")
