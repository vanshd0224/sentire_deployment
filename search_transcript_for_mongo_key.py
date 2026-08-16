import json

transcript_path = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.system_generated\logs\transcript.jsonl"

print("=== SEARCHING TRANSCRIPT FOR MONGODB URI ===")
with open(transcript_path, "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "mongodb" in line.lower() or "mongo" in line.lower() or "cluster" in line.lower():
            try:
                data = json.loads(line)
                content = str(data.get("content", ""))
                if "type" in data and data["type"] == "USER_INPUT":
                    print(f"User Message L{idx+1}: {content}\n")
                elif "mongodb+srv" in content:
                    print(f"Model/System L{idx+1}: {content[:200]}...\n")
            except Exception as e:
                pass
