import os

navbar_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\Navbar.tsx"

with open(navbar_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix parameter destructuring
old_params = """export default function Navbar({
  onOpenBundleModal,
  onNavigate,
  currentPage,
  cartCount = 0,
  onOpenCart,
  onSelectProduct,
}: NavbarProps) {"""

new_params = """export default function Navbar({
  onOpenBundleModal,
  onNavigate,
  currentPage,
  cartCount = 0,
  onOpenAccount,
  onOpenCart,
  onSelectProduct,
}: NavbarProps) {"""

content = content.replace(old_params, new_params)

# Clean up duplicate interface lines
content = content.replace(
    'onOpenAccount?: () => void;\n  onOpenAccount?: () => void;',
    'onOpenAccount?: () => void;'
)

with open(navbar_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("SUCCESS: Fixed onOpenAccount parameter destructuring in Navbar.tsx!")
