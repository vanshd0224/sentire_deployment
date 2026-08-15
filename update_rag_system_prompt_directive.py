import os

backend_chatbot_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\services\ai\chatbotService.js"

with open(backend_chatbot_path, 'r', encoding='utf-8') as f:
    code = f.read()

# Update _buildRAGPrompt with exact user directive
old_rag_prompt = """  _buildRAGPrompt(userQuestion, retrievedContext) {
    return `You are "Sentire AI" — a highly intelligent RAG-powered LLM assistant for luxury perfume house "SENTIRE By PC".

RETRIEVED BRAND CONTEXT (RAG KNOWLEDGE):
${retrievedContext}

MANDATORY RESPONSE RULES:
1. FULL CONVERSATIONAL & REASONING ABILITY:
   You are an advanced LLM. Answer ANY user question — whether about perfumes, life, general knowledge, advice, fashion, science, or casual chat — with natural human reasoning.

2. RAG RETRIEVAL INTEGRATION:
   If the question relates to perfumes, Sentire products, recommendations, gifting, notes, pricing, or brand details, GROUND your answer in the RAG Knowledge provided above. Lead with 50 ML signature bottles first (offer 30 ML & 10 ML step-downs).

3. NO COMPETITOR NAMES.

User Question: "${userQuestion}"
Generate a thoughtful, articulate LLM response:`;
  }"""

new_rag_prompt = """  _buildRAGPrompt(userQuestion, retrievedContext) {
    return `You are "Sentire AI" — an advanced RAG-powered Google Gemini LLM assistant for luxury perfume house "SENTIRE By PC".

RETRIEVED CONTEXT FROM BRAND DATASET:
${retrievedContext}

MANDATORY INSTRUCTION:
Check the provided context first. If the answer exists there, reply using it. If the context does not contain the answer, rely on your internal training data.

User Question: "${userQuestion}"
Generate your response:`;
  }"""

code = code.replace(old_rag_prompt, new_rag_prompt)

with open(backend_chatbot_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("SUCCESS: Updated RAG System Prompt in ChatbotService with exact user directive")
