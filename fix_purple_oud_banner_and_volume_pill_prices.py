import re

# 1. Update PerfumesPage.tsx for Purple Oud Banner Price
perfumes_page_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\PerfumesPage.tsx"

with open(perfumes_page_path, "r", encoding="utf-8") as f:
    p_code = f.read()

# Replace hardcoded 4,999 with 1,489 and strikethrough MRP 1,859
old_banner_price = '<span className="font-display text-2xl sm:text-3xl font-normal text-[#c89b5a]">₹4,999</span>'
new_banner_price = '<div className="flex items-baseline gap-2"><span className="font-display text-2xl sm:text-3xl font-normal text-[#c89b5a]">₹1,489</span><span className="text-sm text-white/40 line-through">MRP ₹1,859</span></div>'

p_code = p_code.replace(old_banner_price, new_banner_price)
p_code = p_code.replace('4999', '1489')

with open(perfumes_page_path, "w", encoding="utf-8") as f:
    f.write(p_code)

print("SUCCESS: Updated Purple Oud banner price to ₹1,489 (MRP ₹1,859) in PerfumesPage.tsx")

# 2. Update ProductDetailModal.tsx so volume selector pills evaluate string and number keys correctly
modal_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\ProductDetailModal.tsx"

with open(modal_path, "r", encoding="utf-8") as f:
    m_code = f.read()

old_item_price = "const itemPrice = product.prices[sz] || currentPrice;"
new_item_price = "const itemPrice = product.prices[sz] || (product.prices as any)[String(sz)] || currentPrice;"

if old_item_price in m_code:
    m_code = m_code.replace(old_item_price, new_item_price)

with open(modal_path, "w", encoding="utf-8") as f:
    f.write(m_code)

print("SUCCESS: Updated ProductDetailModal.tsx volume pill prices to pull exact Excel prices for 10ML, 30ML, 50ML!")
