import os

index_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\index.html"

with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "if (data && data.reply && !data.reply.includes('trouble right now')) {",
    "if (data && data.reply && !data.reply.includes('${core.name}') && !data.reply.includes('${core.desc}') && !data.reply.includes('trouble right now')) {"
)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: Updated index.html to filter out unparsed template string responses from backend")
