import os

navbar_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\Navbar.tsx"
app_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\App.tsx"

# Update Navbar.tsx
with open(navbar_path, 'r', encoding='utf-8') as f:
    nav_content = f.read()

# Add onOpenAccount to NavbarProps
nav_content = nav_content.replace(
    'cartCount?: number;',
    'cartCount?: number;\n  onOpenAccount?: () => void;'
)

# Attach onClick to Account button
nav_content = nav_content.replace(
    '<button aria-label="Account" className="nav-icon-btn hidden sm:flex">',
    '<button aria-label="Account" className="nav-icon-btn flex cursor-pointer" onClick={() => onOpenAccount?.()}>'
)

with open(navbar_path, 'w', encoding='utf-8') as f:
    f.write(nav_content)

print("SUCCESS: Updated Navbar.tsx with onOpenAccount handler")

# Update App.tsx
with open(app_path, 'r', encoding='utf-8') as f:
    app_content = f.read()

# Import AccountDrawerModal
app_content = app_content.replace(
    'import MobileBottomNav from "./components/MobileBottomNav";',
    'import MobileBottomNav from "./components/MobileBottomNav";\nimport AccountDrawerModal from "./components/AccountDrawerModal";'
)

# Add state isAccountOpen
app_content = app_content.replace(
    'const [isCartOpen, setIsCartOpen] = useState(false);',
    'const [isCartOpen, setIsCartOpen] = useState(false);\n  const [isAccountOpen, setIsAccountOpen] = useState(false);'
)

# Pass onOpenAccount to Navbar
app_content = app_content.replace(
    'onOpenCart={() => setIsCartOpen(true)}',
    'onOpenCart={() => setIsCartOpen(true)}\n        onOpenAccount={() => setIsAccountOpen(true)}'
)

# Render AccountDrawerModal
app_content = app_content.replace(
    '</main>',
    '</main>\n      <AccountDrawerModal isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />'
)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_content)

print("SUCCESS: Updated App.tsx with AccountDrawerModal state and rendering")
