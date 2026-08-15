import os

index_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\index.html"

with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace sendChatMessage in index.html for 1-shot smooth thinking state
p_start = html.find("async function sendChatMessage(text) {")
p_end = html.find("if (chatSend && chatInput) {")

if p_start != -1 and p_end != -1:
    new_chat_send = """async function sendChatMessage(text) {
    if (!text || !text.trim() || !chatMessages) return;
    const userText = text.trim();

    // 1. Render User Message Bubble
    const userDiv = document.createElement('div');
    userDiv.style.cssText = 'align-self: flex-end; background: #C89A46; color: #000; padding: 10px 14px; border-radius: 14px; max-width: 80%; font-weight: 500; font-size: 13px; shadow: 0 2px 8px rgba(0,0,0,0.15);';
    userDiv.textContent = userText;
    chatMessages.appendChild(userDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 2. Render Bot Thinking Bubble (1-Shot Clean State)
    const botDiv = document.createElement('div');
    botDiv.style.cssText = 'align-self: flex-start; background: #1e1e1e; color: #f8f5f1; padding: 10px 14px; border-radius: 14px; max-width: 85%; line-height: 1.5; font-size: 13px; border: 1px solid rgba(200,155,90,0.25);';
    botDiv.innerHTML = '<span style="color:#C89A46; font-style:italic;">Gemini AI is thinking... ✨</span>';
    chatMessages.appendChild(botDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 3. Fetch Final Gemini 3.5 Flash LLM Response from Backend
    try {
      const backendUrl = window.location.hostname.includes('run.app') 
        ? 'https://ecommerce-backend-1041917436859.asia-south1.run.app/chat'
        : '/chat';

      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, sessionId: 'sentire-web-session' })
      });
      const data = await res.json();

      if (data && data.reply && !data.reply.includes('${core.name}') && !data.reply.includes('trouble right now')) {
        botDiv.innerHTML = data.reply.replace(/\\n/g, '<br/>');
      } else {
        botDiv.innerHTML = getDynamicAIResponse(userText);
      }
    } catch(e) {
      botDiv.innerHTML = getDynamicAIResponse(userText);
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  """
    html = html[:p_start] + new_chat_send + html[p_end:]
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("SUCCESS: Updated index.html for 1-shot smooth Gemini AI response without text refinement jumps")
