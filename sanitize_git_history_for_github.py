import os
import re

test_files = [
    "backend/test_active_models_fallback.js",
    "backend/test_multi_model_fallback.js",
    "implement_multi_model_fallback_rag_chain.py",
    "make_rag_pure_creative_llm.py",
    "backend/services/ai/chatbotService.js"
]

print("Sanitizing API key strings from test files...")

for tf in test_files:
    if os.path.exists(tf):
        with open(tf, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace plain API key with process.env.GEMINI_API_KEY
        content = re.sub(r'AQ\.Ab8[A-Za-z0-9_-]+', 'process.env.GEMINI_API_KEY', content)
        content = re.sub(r'AIzaSy[A-Za-z0-9_-]+', 'process.env.GEMINI_API_KEY', content)

        with open(tf, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Sanitized: {tf}")

print("SUCCESS: Test files sanitized!")
