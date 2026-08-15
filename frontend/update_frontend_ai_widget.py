import os

index_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\index.html"

with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

old_fallback = """    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      botDiv.style.fontStyle = 'normal';
      botDiv.style.color = '#E0E0E0';
      botDiv.innerHTML = (data.reply || data.response || "Sentire Master Perfumer recommends trying <strong>Herrlich 50ml</strong> or <strong>Seductive 50ml</strong>.").replace(/\\n/g, '<br/>');
    } catch(e) {
      botDiv.style.fontStyle = 'normal';
      botDiv.style.color = '#E0E0E0';
      botDiv.innerHTML = "Our recommendation: <strong>Herrlich 50ml</strong> (Bergamot & Vetiver) or <strong>Seductive 50ml</strong> (Black Rose & Cashmere).";
    }"""

new_fallback = """    try {
      const backendUrl = window.location.hostname.includes('run.app') 
        ? 'https://ecommerce-backend-1041917436859.asia-south1.run.app/chat'
        : '/chat';

      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId: 'sentire-web-session' })
      });
      const data = await res.json();
      botDiv.style.fontStyle = 'normal';
      botDiv.style.color = '#E0E0E0';
      botDiv.innerHTML = (data.reply || data.response || "For that, I'd put <strong>Deep Crush (50 ML)</strong> or <strong>White Oud (50 ML)</strong> in your hand. Deep Crush is soft musk wrapped in warmth — intimate and quietly magnetic.").replace(/\\n/g, '<br/>');
    } catch(e) {
      botDiv.style.fontStyle = 'normal';
      botDiv.style.color = '#E0E0E0';
      botDiv.innerHTML = "For that, I'd put <strong>Deep Crush (50 ML)</strong> or <strong>White Oud (50 ML)</strong> in your hand. Deep Crush is soft musk wrapped in warmth — intimate and quietly magnetic. Start with the 50 ML signature bottle, or try the 30 ML / 10 ML formats.";
    }"""

html = html.replace(old_fallback, new_fallback)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("SUCCESS: Updated frontend/index.html AI Concierge Widget")
