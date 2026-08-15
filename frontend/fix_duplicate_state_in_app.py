import os

app_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\App.tsx"

with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace duplicate state declaration
duplicate_str = "const [isAccountOpen, setIsAccountOpen] = useState(false);\n  const [isAccountOpen, setIsAccountOpen] = useState(false);"
content = content.replace(duplicate_str, "const [isAccountOpen, setIsAccountOpen] = useState(false);")

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: Fixed duplicate isAccountOpen state in App.tsx!")
