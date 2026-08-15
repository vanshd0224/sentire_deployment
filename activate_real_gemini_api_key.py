import os

env_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\.env"
backend_chatbot_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\services\ai\chatbotService.js"

api_key = "AIzaSyDsre9XitnehMTO7Du3aw5-vJfLSjZWl0c"

# 1. Update backend/.env
with open(env_path, 'r', encoding='utf-8') as f:
    env_content = f.read()

env_content = env_content.replace("GEMINI_API_KEY=mock_gemini_key", f"GEMINI_API_KEY={api_key}")

with open(env_path, 'w', encoding='utf-8') as f:
    f.write(env_content)

print(f"SUCCESS: Updated backend/.env with real Google API Key {api_key}")

# 2. Update chatbotService.js to use real API Key
with open(backend_chatbot_path, 'r', encoding='utf-8') as f:
    code = f.read()

old_constructor = """  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (this.apiKey && this.apiKey !== 'mock_gemini_key') {
      try {
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      } catch (e) {
        logger.warn('Gemini AI init notice:', e.message);
      }
    }
  }"""

new_constructor = f"""  constructor() {{
    this.apiKey = process.env.GEMINI_API_KEY || "{api_key}";
    if (this.apiKey && this.apiKey !== 'mock_gemini_key') {{
      try {{
        this.genAI = new GoogleGenerativeAI(this.apiKey);
        this.model = this.genAI.getGenerativeModel({{ model: 'gemini-1.5-flash' }});
        logger.info('Gemini 1.5 Flash AI Model initialized successfully with real API key');
      }} catch (e) {{
        logger.warn('Gemini AI init notice:', e.message);
      }}
    }}
  }}"""

code = code.replace(old_constructor, new_constructor)

with open(backend_chatbot_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("SUCCESS: Updated ChatbotService to activate Gemini 1.5 Flash AI model with real API Key")
