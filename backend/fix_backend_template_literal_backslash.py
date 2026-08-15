import os

backend_chatbot_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\services\ai\chatbotService.js"

with open(backend_chatbot_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Fix literal backslashes before template interpolation dollar signs
code = code.replace('\\${core.name}', '${core.name}')
code = code.replace('\\${core.desc}', '${core.desc}')
code = code.replace('\\${f.name}', '${f.name}')
code = code.replace('\\${f.family}', '${f.family}')
code = code.replace('\\${f.desc}', '${f.desc}')
code = code.replace("\\${f.sizes.join(', ')}", "${f.sizes.join(', ')}")
code = code.replace('\\${secondaryStr}', '${secondaryStr}')
code = code.replace('\\${coreElevenStr}', '${coreElevenStr}')
code = code.replace('\\${userQuestion}', '${userQuestion}')
code = code.replace('\\${err.message}', '${err.message}')
code = code.replace('\\${title}', '${title}')

with open(backend_chatbot_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("SUCCESS: Fixed all template literal backslash escapes in backend/services/ai/chatbotService.js")
