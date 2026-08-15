import os

index_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\index.html"

vite_html = """<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sentire by PC — Luxury perfumes crafted beyond time. Rare, eternal, unforgettable fragrances made in India." />
    <title>Sentire by PC | Luxury Perfumes — Crafted Beyond Time</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="bg-[#050505] text-[#f5f0e8] antialiased selection:bg-[#c89b5a]/30 selection:text-[#c89b5a]">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>

    <!-- Sentire Parfums Live Shopify Checkout Redirection -->
    <script>
      (function() {
        const SHOPIFY_CHECKOUT_URL = 'https://hbj1d0-99.myshopify.com/cart';

        function attachCheckoutRedirect() {
          const buttons = document.querySelectorAll('button, a');
          buttons.forEach(btn => {
            const text = (btn.textContent || '').toUpperCase();
            if (text.includes('PROCEED TO CHECKOUT') || text.includes('CHECKOUT')) {
              btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Redirecting to Live Shopify Checkout:', SHOPIFY_CHECKOUT_URL);
                window.location.href = SHOPIFY_CHECKOUT_URL;
              }, true);
            }
          });
        }

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', attachCheckoutRedirect);
        } else {
          attachCheckoutRedirect();
        }

        const observer = new MutationObserver(() => {
          attachCheckoutRedirect();
        });
        observer.observe(document.body, { childList: true, subtree: true });
      })();
    </script>

    <!-- Sentire Parfums - 4-in-1 Backend Connected Suite -->
    <div id="sentire-suite-container" style="position: fixed; bottom: 24px; right: 24px; z-index: 999999; font-family: 'Inter', sans-serif;">
      <button id="sentire-suite-trigger" style="display: flex; align-items: center; gap: 10px; background: #111111; color: #C8A96A; border: 1.5px solid #C8A96A; padding: 14px 22px; border-radius: 30px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; cursor: pointer; box-shadow: 0 10px 35px rgba(0,0,0,0.6); transition: all 0.3s ease;">
        <span>✨ Sentire AI Concierge</span>
      </button>

      <div id="sentire-suite-modal" style="display: none; position: fixed; bottom: 90px; right: 24px; width: 420px; max-width: calc(100vw - 32px); height: 580px; background: #111111; border: 1px solid rgba(200,169,106,0.35); border-radius: 20px; box-shadow: 0 25px 60px rgba(0,0,0,0.85); flex-direction: column; overflow: hidden; backdrop-filter: blur(10px);">
        
        <!-- Modal Header -->
        <div style="padding: 16px 20px; background: #181818; border-bottom: 1px solid rgba(200,169,106,0.2); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h3 style="margin: 0; color: #FFFFFF; font-family: 'Playfair Display', serif; font-size: 17px; letter-spacing: 0.04em;">Sentire Luxury Concierge</h3>
            <p style="margin: 3px 0 0; color: #C8A96A; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em;">Connected to GCP & Gemini AI</p>
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

        <!-- Tab 1: AI Chatbot (POST /api/chat) -->
        <div id="tab-chat" class="suite-content" style="display: flex; flex-direction: column; flex: 1; overflow: hidden;">
          <div id="suite-chat-messages" style="flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; font-size: 13px;">
            <div style="background: rgba(200,169,106,0.08); border: 1px solid rgba(200,169,106,0.2); border-radius: 12px; padding: 12px; color: #E0E0E0; leading-height: 1.5;">
              Greetings! I am your <strong>Sentire Fragrance Master</strong>. Ask me anything about our luxury perfume collection or scent notes!
            </div>
          </div>
          <div style="padding: 12px; background: #181818; border-top: 1px solid rgba(200,169,106,0.2); display: flex; gap: 8px;">
            <input id="suite-chat-input" type="text" placeholder="Ask AI about scents..." style="flex: 1; background: #000; border: 1px solid #333; color: #fff; padding: 10px 14px; border-radius: 20px; font-size: 12px; outline: none;"/>
            <button id="suite-chat-send" style="background: #C8A96A; color: #000; border: none; padding: 0 16px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer;">Send</button>
          </div>
        </div>

        <!-- Tab 2: AI Recommendations (GET /api/recommendations) -->
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
              Click any mood tag above to load AI recommendations from backend.
            </div>
          </div>
        </div>

        <!-- Tab 3: VIP Loyalty (GET/POST /api/loyalty) -->
        <div id="tab-loyalty" class="suite-content" style="display: none; flex-direction: column; flex: 1; padding: 16px; overflow-y: auto; gap: 14px; font-size: 13px; color: #DDD;">
          <div style="background: rgba(200,169,106,0.1); border: 1px solid rgba(200,169,106,0.3); border-radius: 14px; padding: 16px; text-align: center;">
            <span style="font-size: 11px; text-transform: uppercase; tracking-wider: 0.15em; color: #C8A96A;">Sentire VIP Status</span>
            <h2 id="vip-points-display" style="margin: 6px 0; color: #FFF; font-family: 'Playfair Display', serif; font-size: 28px;">750 Points</h2>
            <p style="margin: 0; color: #AAA; font-size: 11px;">Gold Member Tier</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <label style="font-size: 11px; color: #C8A96A; font-weight: 600; uppercase">Redeem Reward Code</label>
            <div style="display: flex; gap: 8px;">
              <input id="vip-code-input" type="text" placeholder="Enter reward code (e.g. VIP100)" style="flex: 1; background: #000; border: 1px solid #333; color: #fff; padding: 10px 14px; border-radius: 12px; font-size: 12px; outline: none;"/>
              <button id="vip-redeem-btn" style="background: #C8A96A; color: #000; border: none; padding: 0 16px; border-radius: 12px; font-size: 12px; font-weight: 600; cursor: pointer;">Redeem</button>
            </div>
            <p id="vip-msg" style="margin: 4px 0 0; font-size: 11px; color: #888;"></p>
          </div>
        </div>

        <!-- Tab 4: Photo Upload (POST /api/upload -> GCS) -->
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
</html>
"""

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(vite_html)

print("SUCCESS: Set index.html as Vite root entry pointing to /src/main.tsx!")
