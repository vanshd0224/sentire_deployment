import os

navbar_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\Navbar.tsx"
mobile_nav_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\MobileBottomNav.tsx"
modal_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\AccountDrawerModal.tsx"
app_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\App.tsx"

# 1. Update Navbar.tsx to add My Account in mobile drawer menu
with open(navbar_path, 'r', encoding='utf-8') as f:
    nav_content = f.read()

mobile_account_link = """                <button
                  onClick={() => { setMobileNavOpen(false); onOpenAccount?.(); }}
                  className="flex min-h-[44px] items-center justify-between text-[12.5px] font-semibold tracking-[0.16em] uppercase text-ink hover:text-[#c89b5a] text-left py-2 border-b border-black/8 cursor-pointer"
                >
                  My Account / Login <span className="text-[#c89b5a]">👤</span>
                </button>"""

if 'My Account / Login' not in nav_content:
    nav_content = nav_content.replace(
        '<button\n                  onClick={() => { setMobileNavOpen(false); onNavigate?.("track-order"); }}',
        mobile_account_link + '\n\n                <button\n                  onClick={() => { setMobileNavOpen(false); onNavigate?.("track-order"); }}'
    )
    with open(navbar_path, 'w', encoding='utf-8') as f:
        f.write(nav_content)
    print("SUCCESS: Added My Account / Login link to Navbar mobile drawer")

# 2. Update AccountDrawerModal.tsx to add backdrop click handler
with open(modal_path, 'r', encoding='utf-8') as f:
    modal_content = f.read()

modal_content = modal_content.replace(
    '<div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">',
    '<div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>'
)

with open(modal_path, 'w', encoding='utf-8') as f:
    f.write(modal_content)
print("SUCCESS: Added backdrop click handler to AccountDrawerModal.tsx")

# 3. Update App.tsx for robust handleAccountClick
with open(app_path, 'r', encoding='utf-8') as f:
    app_content = f.read()

# Make handleAccountClick toggle if needed and ensure isAccountOpen sets true
app_content = app_content.replace(
    'const handleAccountClick = () => {\n    if (auth.currentUser) {\n      setCurrentPage("account");\n      window.scrollTo({ top: 0, behavior: "smooth" });\n    } else {\n      setIsAccountOpen(true);\n    }\n  };',
    'const handleAccountClick = () => {\n    if (auth.currentUser) {\n      setCurrentPage("account");\n      window.scrollTo({ top: 0, behavior: "smooth" });\n    } else {\n      setIsAccountOpen(false);\n      setTimeout(() => setIsAccountOpen(true), 50);\n    }\n  };'
)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_content)
print("SUCCESS: Updated App.tsx handleAccountClick for reliable trigger")
