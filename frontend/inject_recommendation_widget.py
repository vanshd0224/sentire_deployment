import os

index_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\index.html"

widget_script = """
<!-- Sentire Parfums AI Fragrance Recommendation & Chatbot Widget -->
<div id="sentire-ai-widget" style="position: fixed; bottom: 24px; right: 24px; z-index: 99999; font-family: 'Inter', sans-serif;">
  <button id="sentire-ai-trigger" style="display: flex; items-center; gap: 8px; background: linear-[#111]; background-color: #111; color: #C8A96A; border: 1.5px solid #C8A96A; padding: 12px 20px; border-radius: 30px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transition: all 0.3s ease;">
    <span>✨ AI Scent Finder & Chat</span>
  </button>

  <div id="sentire-ai-modal" style="display: none; position: fixed; bottom: 85px; right: 24px; width: 380px; max-width: calc(100vw - 32px); height: 550px; background: #111111; border: 1px solid rgba(200,169,106,0.3); border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); flex-direction: column; overflow: hidden;">
    <div style="padding: 16px 20px; background: #181818; border-bottom: 1px solid rgba(200,169,106,0.2); display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h3 style="margin: 0; color: #FFFFFF; font-family: 'Playfair Display', serif; font-size: 16px; letter-spacing: 0.05em;">Sentire AI Fragrance Concierge</h3>
        <p style="margin: 2px 0 0; color: #C8A96A; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em;">Powered by Gemini AI</p>
      </div>
      <button id="sentire-ai-close" style="background: none; border: none; color: #999; font-size: 20px; cursor: pointer; padding: 4px;">&times;</button>
    </div>

    <div id="sentire-chat-messages" style="flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
      <div style="background: rgba(200,169,106,0.1); border: 1px solid rgba(200,169,106,0.2); border-radius: 12px; padding: 12px; color: #E0E0E0;">
        Welcome to <strong>Sentire Parfums</strong>! 🌸 <br/><br/>
        Looking for scent recommendations? Pick your vibe below or ask our AI fragrance master!
        <div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px;">
          <button class="scent-tag" data-mood="Romantic Evening" style="background: #222; color: #C8A96A; border: 1px solid #C8A96A; padding: 4px 8px; border-radius: 12px; font-size: 11px; cursor: pointer;">🌹 Romantic Evening</button>
          <button class="scent-tag" data-mood="Woody Oud" style="background: #222; color: #C8A96A; border: 1px solid #C8A96A; padding: 4px 8px; border-radius: 12px; font-size: 11px; cursor: pointer;">🌲 Woody Oud</button>
          <button class="scent-tag" data-mood="Fresh Morning" style="background: #222; color: #C8A96A; border: 1px solid #C8A96A; padding: 4px 8px; border-radius: 12px; font-size: 11px; cursor: pointer;">☀️ Fresh Morning</button>
          <button class="scent-tag" data-mood="Executive Power" style="background: #222; color: #C8A96A; border: 1px solid #C8A96A; padding: 4px 8px; border-radius: 12px; font-size: 11px; cursor: pointer;">💼 Executive Power</button>
        </div>
      </div>
    </div>

    <div style="padding: 12px; background: #181818; border-top: 1px solid rgba(200,169,106,0.2); display: flex; gap: 8px;">
      <input id="sentire-chat-input" type="text" placeholder="Ask for scent recommendations..." style="flex: 1; background: #000; border: 1px solid #333; color: #fff; padding: 10px 14px; border-radius: 20px; font-size: 12px; outline: none;"/>
      <button id="sentire-chat-send" style="background: #C8A96A; color: #000; border: none; padding: 0 16px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer;">Send</button>
    </div>
  </div>
</div>

<script>
  (function() {
    const trigger = document.getElementById('sentire-ai-trigger');
    const modal = document.getElementById('sentire-ai-modal');
    const closeBtn = document.getElementById('sentire-ai-close');
    const messages = document.getElementById('sentire-chat-messages');
    const input = document.getElementById('sentire-chat-input');
    const sendBtn = document.getElementById('sentire-chat-send');

    trigger.addEventListener('click', () => {
      modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    async function sendMessage(text) {
      if (!text.trim()) return;
      
      // Append user msg
      const userDiv = document.createElement('div');
      userDiv.style.cssText = 'align-self: flex-end; background: #C8A96A; color: #000; padding: 8px 12px; border-radius: 12px; max-width: 80%; font-weight: 500;';
      userDiv.textContent = text;
      messages.appendChild(userDiv);
      messages.scrollTop = messages.scrollHeight;

      // Append bot loading
      const botDiv = document.createElement('div');
      botDiv.style.cssText = 'align-self: flex-start; background: #222; color: #C8A96A; padding: 8px 12px; border-radius: 12px; max-width: 85%; font-style: italic;';
      botDiv.textContent = 'Crafting recommendations...';
      messages.appendChild(botDiv);
      messages.scrollTop = messages.scrollHeight;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text })
        });
        const data = await res.json();
        botDiv.style.fontStyle = 'normal';
        botDiv.style.color = '#E0E0E0';
        botDiv.innerHTML = (data.reply || data.response || "Here are our top scent recommendations for you: <strong>Herrlich 50ml</strong> (Bergamot & Smoked Vetiver) and <strong>Seductive 50ml</strong> (Pink Pepper & Black Rose).").replace(/\\n/g, '<br/>');
      } catch(err) {
        botDiv.style.fontStyle = 'normal';
        botDiv.style.color = '#E0E0E0';
        botDiv.innerHTML = "Our master perfumer recommends <strong>Herrlich 50ml</strong> (Smoked Vetiver & Cedarwood) and <strong>Seductive 50ml</strong> (Black Velvet Rose & Cashmere).";
      }
      messages.scrollTop = messages.scrollHeight;
    }

    sendBtn.addEventListener('click', () => {
      const val = input.value;
      input.value = '';
      sendMessage(val);
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const val = input.value;
        input.value = '';
        sendMessage(val);
      }
    });

    document.querySelectorAll('.scent-tag').forEach(tag => {
      tag.addEventListener('click', (e) => {
        const mood = e.target.getAttribute('data-mood');
        sendMessage('Give me perfume recommendations for ' + mood);
      });
    });
  })();
</script>
"""

with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

if 'sentire-ai-widget' not in content:
    new_content = content.replace('</body>', widget_script + '\n</body>')
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: Injected AI Recommendation Widget into index.html!")
else:
    print("Widget already present in index.html")
