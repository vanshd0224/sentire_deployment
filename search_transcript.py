import json

transcript_path = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.system_generated\logs\transcript.jsonl"

keywords = ["order confirmation", "confirmation", "shiprocket", "whatsapp", "razorpay"]

found = []

with open(transcript_path, "r", encoding="utf-8", errors="ignore") as f:
    for idx, line in enumerate(f, 1):
        for kw in keywords:
            if kw in line.lower():
                try:
                    data = json.loads(line)
                    text = data.get("content", "")
                    if text and len(text) > 20:
                        found.append(f"Line {idx} [{kw}]: {text[:300]}")
                except:
                    pass

for item in found[:20]:
    safe_item = item.encode('ascii', 'ignore').decode('ascii')
    print(safe_item)
