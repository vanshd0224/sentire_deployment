import os

backend_chatbot_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\services\ai\chatbotService.js"
index_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\index.html"

# 1. Update backend/services/ai/chatbotService.js with image engraving knowledge
with open(backend_chatbot_path, 'r', encoding='utf-8') as f:
    bcode = f.read()

# Update RAG context fallback knowledge block in _retrieveRelevantContext
old_kb_summary = 'return "Sentire By PC features 11 Core 50 ML Extraits de Parfum (White Oud, Deep Crush, Rich, Midnight, Seductive, Personna, Purple Oud, Mirai, Calantha, O809, Herrlich). We offer 30 ML & 10 ML travel sizes, complimentary bottle engraving, and express shipping across India.";'

new_kb_summary = 'return "Sentire By PC features 11 Core 50 ML Extraits de Parfum. We offer 100% COMPLIMENTARY Laser Engraving on all 50 ML bottles — including Text Engraving (names, initials, dates) and Image/Photo Engraving (custom portraits, line-art, or photos laser-etched directly onto the glass bottle!).";'

bcode = bcode.replace(old_kb_summary, new_kb_summary)

# Update RAG prompt instructions to include Image & Photo Engraving rule
old_prompt_instr = """MANDATORY INSTRUCTION:
Check the provided context first. If the answer exists there, reply using it. If the context does not contain the answer, rely on your internal training data."""

new_prompt_instr = """MANDATORY INSTRUCTION:
Check the provided context first. If the answer exists there, reply using it. If the context does not contain the answer, rely on your internal training data.

PERSONALISATION & ENGRAVING RULE:
Whenever the user asks about personalisation, custom bottles, image engraving, photo engraving, or engraving:
Explicitly inform them that SENTIRE By PC provides 100% COMPLIMENTARY laser engraving on all 50 ML signature bottles — supporting BOTH Custom Text Engraving (names, initials, dates) AND Image & Photo Engraving (custom portraits, line-art, or photo etching directly onto the glass bottle!)."""

bcode = bcode.replace(old_prompt_instr, new_prompt_instr)

# Update fallback for engraving in _getRAGFallback
old_engrave_fallback = """    if (q.includes('engrav')) {
      return "Custom bottle laser engraving is **100% COMPLIMENTARY** on all 50 ML signature bottles! You can engrave initials, full names, or special dates directly onto the luxury glass bottle.";
    }"""

new_engrave_fallback = """    if (q.includes('engrav') || q.includes('photo') || q.includes('image') || q.includes('personal')) {
      return "Product Personalisation at **Sentire by PC** is **100% COMPLIMENTARY** on all 50 ML signature bottles! We offer two luxury options:\\n" +
        "1. **Text & Name Engraving**: Engrave initials, full names, dates, or custom quotes.\\n" +
        "2. **Image & Photo Engraving**: High-precision laser etching of custom portraits, photos, line-art, or logos directly onto the glass bottle!";
    }"""

bcode = bcode.replace(old_engrave_fallback, new_engrave_fallback)

with open(backend_chatbot_path, 'w', encoding='utf-8') as f:
    f.write(bcode)

print("SUCCESS: Updated backend ChatbotService with Image Engraving & Personalisation Knowledge")

# 2. Update index.html getDynamicAIResponse fallback
with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

old_html_engrave = """    if (q.includes('engrav') || q.includes('custom') || q.includes('name on bottle') || q.includes('personal')) {
      return "Custom bottle laser engraving is <strong>100% COMPLIMENTARY</strong> on all 50 ML signature bottles! You can engrave initials, full names, or special dates directly onto the luxury glass bottle.";
    }"""

new_html_engrave = """    if (q.includes('engrav') || q.includes('custom') || q.includes('name on bottle') || q.includes('personal') || q.includes('photo') || q.includes('image')) {
      return "Product Personalisation at <strong>Sentire by PC</strong> is <strong>100% COMPLIMENTARY</strong> on all 50 ML signature bottles! We offer two luxury options:<br/>" +
        "• <strong>Text & Name Engraving</strong>: Engrave initials, names, dates, or quotes.<br/>" +
        "• <strong>Image & Photo Engraving</strong>: High-precision laser etching of custom portraits, photos, line-art, or logos directly onto the glass bottle!";
    }"""

html = html.replace(old_html_engrave, new_html_engrave)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("SUCCESS: Updated index.html with Image Engraving & Personalisation Knowledge")
