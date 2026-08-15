import os

cart_drawer_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"
index_css_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\index.css"

# 1. Update CartDrawer.tsx to safely handle image property
with open(cart_drawer_path, 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace("src={item.img}", "src={item.img || (item as any).image}")

with open(cart_drawer_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("SUCCESS: Updated CartDrawer.tsx to support item.image fallback")

# 2. Update index.css so salon-stagger classes do not hide content with opacity: 0
with open(index_css_path, 'r', encoding='utf-8') as f:
    css = f.read()

old_stagger = """.salon-stagger-1 { animation: heroFadeUp 420ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both; }
.salon-stagger-2 { animation: heroFadeUp 420ms cubic-bezier(0.22, 1, 0.36, 1) 130ms both; }
.salon-stagger-3 { animation: heroFadeUp 420ms cubic-bezier(0.22, 1, 0.36, 1) 180ms both; }
.salon-stagger-4 { animation: heroFadeUp 420ms cubic-bezier(0.22, 1, 0.36, 1) 230ms both; }
.salon-stagger-5 { animation: heroFadeUp 420ms cubic-bezier(0.22, 1, 0.36, 1) 280ms both; }
.salon-stagger-6 { animation: heroFadeUp 420ms cubic-bezier(0.22, 1, 0.36, 1) 330ms both; }"""

new_stagger = """.salon-stagger-1, .salon-stagger-2, .salon-stagger-3, .salon-stagger-4, .salon-stagger-5, .salon-stagger-6 {
  opacity: 1 !important;
  transform: none !important;
}"""

css = css.replace(old_stagger, new_stagger)

with open(index_css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("SUCCESS: Updated index.css so Cart Drawer content is 100% visible by default")
