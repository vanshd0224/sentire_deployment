import os

modal_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\AccountDrawerModal.tsx"

with open(modal_path, "r", encoding="utf-8") as f:
    modal_code = f.read()

# Add a prominent "Log In / Register with Shopify" option in AccountDrawerModal
old_buttons = """        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}"""

new_buttons = """        {/* Shopify Official Account Login / Register */}
        <a
          href="https://hbj1d0-99.myshopify.com/account/login"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3 rounded-full bg-[#120e0a] px-4 py-3 text-xs font-bold text-[#c89b5a] border border-[#c89b5a]/40 shadow-sm hover:bg-[#c89b5a] hover:text-black transition-all mb-3 cursor-pointer text-center"
        >
          <span>🛍️ Log In / Register on Shopify Store</span>
        </a>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}"""

if "Shopify Official Account Login" not in modal_code:
    modal_code = modal_code.replace(old_buttons, new_buttons)

with open(modal_path, "w", encoding="utf-8") as f:
    f.write(modal_code)

print("SUCCESS: Added Shopify Account Login & Register link in AccountDrawerModal.tsx!")
