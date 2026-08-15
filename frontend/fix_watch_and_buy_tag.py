import os

app_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\App.tsx"

with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'onOpenAccount={() => setIsAccountOpen(true)}\n          <RetailerBadges />',
    'onOpenAccount={() => setIsAccountOpen(true)} />\n          <RetailerBadges />'
)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: Fixed WatchAndBuy closing tag in App.tsx")
