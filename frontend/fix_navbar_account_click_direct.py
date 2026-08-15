import os

navbar_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\Navbar.tsx"
app_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\App.tsx"

# Update Navbar.tsx Account button
with open(navbar_path, 'r', encoding='utf-8') as f:
    nav_content = f.read()

nav_content = nav_content.replace(
    '<button aria-label="Account" className="nav-icon-btn flex cursor-pointer" onClick={() => onOpenAccount?.()}>',
    '<button aria-label="Account" id="navbar-account-btn" className="nav-icon-btn flex cursor-pointer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOpenAccount?.(); }}>'
)

with open(navbar_path, 'w', encoding='utf-8') as f:
    f.write(nav_content)

print("SUCCESS: Updated Navbar.tsx with explicit Account button click handler")

# Update App.tsx handleAccountClick
with open(app_path, 'r', encoding='utf-8') as f:
    app_content = f.read()

app_content = app_content.replace(
    'const handleAccountClick = () => {\n    if (auth.currentUser) {\n      setCurrentPage("account");\n      window.scrollTo({ top: 0, behavior: "smooth" });\n    } else {\n      setIsAccountOpen(false);\n      setTimeout(() => setIsAccountOpen(true), 50);\n    }\n  };',
    'const handleAccountClick = () => {\n    console.log("Account Icon Clicked! Auth User:", auth.currentUser);\n    if (auth.currentUser) {\n      setCurrentPage("account");\n      window.scrollTo({ top: 0, behavior: "smooth" });\n    } else {\n      setIsAccountOpen(true);\n    }\n  };'
)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_content)

print("SUCCESS: Updated App.tsx handleAccountClick with console logging and direct trigger")
