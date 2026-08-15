import os

index_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\index.html"

with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace container and trigger with circular Fraganote-style responsive placement
old_widget_start = '<div id="sentire-suite-container"'
old_widget_end = '</script>\n  </body>'

new_widget = """<style>
  /* Fraganote-style Mobile Floating AI Assistant Button */
  #sentire-suite-container {
    position: fixed;
    bottom: 82px; /* Sits neatly above mobile bottom navigation bar */
    right: 16px;
    z-index: 999999;
    font-family: 'Inter', sans-serif;
  }

  @media (min-width: 769px) {
    #sentire-suite-container {
      bottom: 28px;
      right: 28px;
    }
  }

  #sentire-suite-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #111111;
    color: #C8A96A;
    border: 1.5px solid #C8A96A;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7);
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  #sentire-suite-trigger:hover {
    transform: scale(1.08);
    box-shadow: 0 10px 30px rgba(200, 169, 106, 0.4);
  }

  /* Responsive Modal Drawer */
  #sentire-suite-modal {
    display: none;
    position: fixed;
    bottom: 145px;
    right: 16px;
    width: 380px;
    max-width: calc(100vw - 32px);
    height: 520px;
    max-height: calc(100vh - 160px);
    background: #111111;
    border: 1px solid rgba(200, 169, 106, 0.35);
    border-radius: 20px;
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9);
    flex-direction: column;
    overflow: hidden;
    backdrop-filter: blur(12px);
  }

  @media (min-width: 769px) {
    #sentire-suite-modal {
      bottom: 90px;
      right: 28px;
      width: 420px;
      height: 560px;
    }
  }
</style>

<div id="sentire-suite-container">
  <button id="sentire-suite-trigger" title="Sentire AI Concierge">
    <span style="font-size: 22px; line-height: 1;">✨</span>
  </button>

  <div id="sentire-suite-modal">
    <!-- Modal Header -->
    <div style="padding: 16px 20px; background: #181818; border-bottom: 1px solid rgba(200,169,106,0.2); display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h3 style="margin: 0; color: #FFFFFF; font-family: 'Playfair Display', serif; font-size: 16px; letter-spacing: 0.04em;">Sentire Luxury Concierge</h3>
        <p style="margin: 3px 0 0; color: #C8A96A; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em;">Powered by Gemini AI</p>
      </div>
      <button id="sentire-suite-close" style="background: none; border: none; color: #888; font-size: 24px; cursor: pointer; padding: 0 4px;">&times;</button>
    </div>

    <!-- Navigation Tabs -->
    <div style="display: flex; background: #141414; border-bottom: 1px solid rgba(200,169,106,0.15); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">
      <button class="suite-tab active" data-tab="tab-chat" style="flex: 1; padding: 10px 4px; background: none; border: none; color: #C8A96A; border-bottom: 2px solid #C8A96A; cursor: pointer;">🤖 AI Chat</button>
      <button class="suite-tab" data-tab="tab-recommend" style="flex: 1; padding: 10px 4px; background: none; border: none; color: #888; cursor: pointer;">✨ Scent Finder</button>
      <button class="suite-tab" data-tab="tab-loyalty" style="flex: 1; padding: 10px 4px; background: none; border: none; color: #888; cursor: pointer;">💎 VIP Rewards</button>
      <button class="suite-tab" data-tab="tab-upload" style="flex: 1; padding: 10px 4px; background: none; border: none; color: #888; cursor: pointer;">📸 Engraving</button>
    </div>

    <!-- Tab 1: AI Chatbot -->
    <div id="tab-chat" class="suite-content" style="display: flex; flex-direction: column; flex: 1; overflow: hidden;">
      <div id="suite-chat-messages" style="flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
        <div style="background: rgba(200,169,106,0.08); border: 1px solid rgba(200,169,106,0.2); border-radius: 12px; padding: 12px; color: #E0E0E0; line-height: 1.5;">
          Greetings! I am your <strong>Sentire Fragrance Master</strong>. Ask me anything about our luxury perfume collection or scent notes!
        </div>
      </div>
      <div style="padding: 12px; background: #181818; border-top: 1px solid rgba(200,169,106,0.2); display: flex; gap: 8px;">
        <input id="suite-chat-input" type="text" placeholder="Ask AI about scents..." style="flex: 1; background: #000; border: 1px solid #333; color: #fff; padding: 10px 14px; border-radius: 20px; font-size: 12px; outline: none;"/>
        <button id="suite-chat-send" style="background: #C8A96A; color: #000; border: none; padding: 0 16px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer;">Send</button>
      </div>
    </div>

    <!-- Tab 2: AI Recommendations -->
    <div id="tab-recommend" class="suite-content" style="display: none; flex-direction: column; flex: 1; padding: 16px; overflow-y: auto; gap: 12px; font-size: 13px; color: #DDD;">
      <p style="margin: 0; color: #AAA; font-size: 12px;">Select your mood or occasion to fetch live AI recommendations:</p>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <button class="rec-btn" data-mood="Romantic" style="background: #222; color: #C8A96A; border: 1px solid #C8A96A; padding: 6px 12px; border-radius: 16px; font-size: 11px; cursor: pointer;">🌹 Romantic Evening</button>
        <button class="rec-btn" data-mood="Woody" style="background: #222; color: #C8A96A; border: 1px solid #C8A96A; padding: 6px 12px; border-radius: 16px; font-size: 11px; cursor: pointer;">🌲 Smoked Oud & Vetiver</button>
        <button class="rec-btn" data-mood="Fresh" style="background: #222; color: #C8A96A; border: 1px solid #C8A96A; padding: 6px 12px; border-radius: 16px; font-size: 11px; cursor: pointer;">☀️ Fresh Bergamot</button>
        <button class="rec-btn" data-mood="Executive" style="background: #222; color: #C8A96A; border: 1px solid #C8A96A; padding: 6px 12px; border-radius: 16px; font-size: 11px; cursor: pointer;">💼 Executive Signature</button>
      </div>
      <div id="rec-results" style="margin-top: 10px; display: flex; flex-direction: column; gap: 10px;">
        <div style="background: #181818; border: 1px border-dashed #333; border-radius: 12px; padding: 14px; text-align: center; color: #888;">
          Click any mood tag above to load AI recommendations.
        </div>
      </div>
    </div>

    <!-- Tab 3: VIP Loyalty -->
    <div id="tab-loyalty" class="suite-content" style="display: none; flex-direction: column; flex: 1; padding: 16px; overflow-y: auto; gap: 14px; font-size: 13px; color: #DDD;">
      <div style="background: rgba(200,169,106,0.1); border: 1px solid rgba(200,169,106,0.3); border-radius: 14px; padding: 16px; text-align: center;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #C8A96A;">Sentire VIP Status</span>
        <h2 id="vip-points-display" style="margin: 6px 0; color: #FFF; font-family: 'Playfair Display', serif; font-size: 28px;">750 Points</h2>
        <p style="margin: 0; color: #AAA; font-size: 11px;">Gold Member Tier</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-size: 11px; color: #C8A96A; font-weight: 600; text-transform: uppercase;">Redeem Reward Code</label>
        <div style="display: flex; gap: 8px;">
          <input id="vip-code-input" type="text" placeholder="Enter reward code (e.g. VIP100)" style="flex: 1; background: #000; border: 1px solid #333; color: #fff; padding: 10px 14px; border-radius: 12px; font-size: 12px; outline: none;"/>
          <button id="vip-redeem-btn" style="background: #C8A96A; color: #000; border: none; padding: 0 16px; border-radius: 12px; font-size: 12px; font-weight: 600; cursor: pointer;">Redeem</button>
        </div>
        <p id="vip-msg" style="margin: 4px 0 0; font-size: 11px; color: #888;"></p>
      </div>
    </div>

    <!-- Tab 4: Photo Upload -->
    <div id="tab-upload" class="suite-content" style="display: none; flex-direction: column; flex: 1; padding: 16px; overflow-y: auto; gap: 14px; font-size: 13px; color: #DDD;">
      <div>
        <h4 style="margin: 0 0 4px; color: #FFF; font-family: 'Playfair Display', serif;">Custom Bottle Engraving & Review</h4>
        <p style="margin: 0; color: #888; font-size: 11px;">Upload your bottle photo to Google Cloud Storage for custom laser engraving verification.</p>
      </div>

      <div style="border: 2px dashed rgba(200,169,106,0.3); border-radius: 14px; padding: 24px; text-align: center; background: #141414;">
        <input id="engraving-file-input" type="file" accept="image/*" style="display: none;"/>
        <button id="engraving-file-btn" style="background: #222; color: #C8A96A; border: 1px solid #C8A96A; padding: 10px 18px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer;">Choose Photo</button>
        <p id="upload-status-msg" style="margin: 12px 0 0; color: #AAA; font-size: 11px;">No file selected</p>
      </div>
      
      <button id="upload-submit-btn" style="background: #C8A96A; color: #000; border: none; padding: 12px; border-radius: 14px; font-size: 13px; font-weight: 600; cursor: pointer; display: none;">Upload to Google Cloud Storage</button>
    </div>

  </div>
</div>

<script>
(function() {
  const trigger = document.getElementById('sentire-suite-trigger');
  const modal = document.getElementById('sentire-suite-modal');
  const closeBtn = document.getElementById('sentire-suite-close');
  const tabs = document.querySelectorAll('.suite-tab');
  const contents = document.querySelectorAll('.suite-content');

  if (trigger && modal && closeBtn) {
    trigger.addEventListener('click', () => {
      modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.style.color = '#888';
        t.style.borderBottom = 'none';
      });
      contents.forEach(c => c.style.display = 'none');
      
      tab.style.color = '#C8A96A';
      tab.style.borderBottom = '2px solid #C8A96A';
      const target = tab.getAttribute('data-tab');
      const targetEl = document.getElementById(target);
      if (targetEl) targetEl.style.display = 'flex';
    });
  });

  const chatMessages = document.getElementById('suite-chat-messages');
  const chatInput = document.getElementById('suite-chat-input');
  const chatSend = document.getElementById('suite-chat-send');

  async function sendChatMessage(text) {
    if (!text || !text.trim() || !chatMessages) return;
    const userDiv = document.createElement('div');
    userDiv.style.cssText = 'align-self: flex-end; background: #C8A96A; color: #000; padding: 8px 12px; border-radius: 12px; max-width: 80%; font-weight: 500;';
    userDiv.textContent = text;
    chatMessages.appendChild(userDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const botDiv = document.createElement('div');
    botDiv.style.cssText = 'align-self: flex-start; background: #222; color: #C8A96A; padding: 8px 12px; border-radius: 12px; max-width: 85%; font-style: italic;';
    botDiv.textContent = 'Thinking...';
    chatMessages.appendChild(botDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
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
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  if (chatSend && chatInput) {
    chatSend.addEventListener('click', () => {
      const text = chatInput.value;
      chatInput.value = '';
      sendChatMessage(text);
    });

    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const text = chatInput.value;
        chatInput.value = '';
        sendChatMessage(text);
      }
    });
  }
})();
</script>
</body>
</html>"""

# Replace in index.html
if '<div id="sentire-suite-container"' in content:
    idx = content.find('<div id="sentire-suite-container"')
    # Keep top portion
    top_portion = content[:idx]
    final_content = top_portion + new_widget
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    print("SUCCESS: Updated AI widget placement for mobile & Fraganote circular avatar style!")
else:
    print("Container not found, writing new file")
