import json
import os

transcript_path = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.system_generated\logs\transcript.jsonl"

print("=== SEARCHING TRANSCRIPT FOR DATABASE DECISIONS ===")
with open(transcript_path, "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "database" in line.lower() or "cloud sql" in line.lower() or "postgres" in line.lower() or "firestore" in line.lower() or "mongo" in line.lower():
            try:
                data = json.loads(line)
                content = str(data.get("content", ""))
                print(f"Step {idx+1}: {content[:300]}...\n")
            except Exception as e:
                pass
