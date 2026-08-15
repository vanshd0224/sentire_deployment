import os

frontend_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend"

matches = []
for root, dirs, files in os.walk(frontend_dir):
    for f in files:
        if f.endswith(('.tsx', '.ts', '.html', '.js')):
            file_path = os.path.join(root, f)
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as file:
                lines = file.readlines()
                for line_idx, line in enumerate(lines, 1):
                    if 'Deep Crush' in line or 'sendChatMessage' in line or 'suite-chat-messages' in line:
                        matches.append(f"{file_path} [Line {line_idx}]: {line.strip()}")

print("FOUND MATCHES:")
for m in matches:
    print(m)
