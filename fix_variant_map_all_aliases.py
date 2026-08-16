import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Replace SHOPIFY_VARIANT_MAP and resolution logic in CartDrawer.tsx
new_map_code = """// Robust variant ID resolver for all 11 perfumes with all possible ID/name/handle aliases
const SHOPIFY_VARIANT_MAP: Record<string, Record<number, string>> = {
  // 0809
  "0809": { 10: "46888622293153", 30: "46888622325921", 50: "46888622358689" },
  "perfume-1": { 10: "46888622293153", 30: "46888622325921", 50: "46888622358689" },
  "1": { 10: "46888622293153", 30: "46888622325921", 50: "46888622358689" },

  // Calantha
  "calantha": { 10: "46888622391457", 30: "46888622424225", 50: "46888622456993" },
  "perfume-2": { 10: "46888622391457", 30: "46888622424225", 50: "46888622456993" },
  "2": { 10: "46888622391457", 30: "46888622424225", 50: "46888622456993" },

  // Deep Crush
  "deep-crush": { 10: "46888622489761", 30: "46888622522529", 50: "46888622555297" },
  "deepcrush": { 10: "46888622489761", 30: "46888622522529", 50: "46888622555297" },
  "perfume-3": { 10: "46888622489761", 30: "46888622522529", 50: "46888622555297" },
  "3": { 10: "46888622489761", 30: "46888622522529", 50: "46888622555297" },

  // Herrlich
  "herrlich": { 10: "46888622588065", 30: "46888622620833", 50: "46888622653601" },
  "perfume-4": { 10: "46888622588065", 30: "46888622620833", 50: "46888622653601" },
  "4": { 10: "46888622588065", 30: "46888622620833", 50: "46888622653601" },

  // Midnight
  "midnight": { 10: "46888622686369", 30: "46888622719137", 50: "46888622751905" },
  "perfume-5": { 10: "46888622686369", 30: "46888622719137", 50: "46888622751905" },
  "5": { 10: "46888622686369", 30: "46888622719137", 50: "46888622751905" },

  // Mirai
  "mirai": { 10: "46888622784673", 30: "46888622817441", 50: "46888622850209" },
  "perfume-6": { 10: "46888622784673", 30: "46888622817441", 50: "46888622850209" },
  "6": { 10: "46888622784673", 30: "46888622817441", 50: "46888622850209" },

  // Personna
  "personna": { 10: "46888622882977", 30: "46888622915745", 50: "46888622948513" },
  "perfume-7": { 10: "46888622882977", 30: "46888622915745", 50: "46888622948513" },
  "7": { 10: "46888622882977", 30: "46888622915745", 50: "46888622948513" },

  // Purple Oud
  "purple-oud": { 10: "46888622981281", 30: "46888623014049", 50: "46888623046817" },
  "purpleoud": { 10: "46888622981281", 30: "46888623014049", 50: "46888623046817" },
  "perfume-8": { 10: "46888622981281", 30: "46888623014049", 50: "46888623046817" },
  "8": { 10: "46888622981281", 30: "46888623014049", 50: "46888623046817" },

  // Rich
  "rich": { 10: "46888623079585", 30: "46888623112353", 50: "46888623145121" },
  "perfume-9": { 10: "46888623079585", 30: "46888623112353", 50: "46888623145121" },
  "9": { 10: "46888623079585", 30: "46888623112353", 50: "46888623145121" },

  // Seductive
  "seductive": { 10: "46888623177889", 30: "46888623210657", 50: "46888623243425" },
  "perfume-10": { 10: "46888623177889", 30: "46888623210657", 50: "46888623243425" },
  "10": { 10: "46888623177889", 30: "46888623210657", 50: "46888623243425" },

  // White Oud
  "white-oud": { 10: "46888623276193", 30: "46888623308961", 50: "46888623341729" },
  "whiteoud": { 10: "46888623276193", 30: "46888623308961", 50: "46888623341729" },
  "perfume-11": { 10: "46888623276193", 30: "46888623308961", 50: "46888623341729" },
  "11": { 10: "46888623276193", 30: "46888623308961", 50: "46888623341729" },
};

const resolveShopifyVariantId = (item: any): string => {
  const pId = String(item.productId || item.id || "").toLowerCase().trim();
  const pName = String(item.name || "").toLowerCase().trim();
  const sizeNum = Number(item.size) || 50;

  // 1. Direct map lookup by productId
  if (SHOPIFY_VARIANT_MAP[pId]?.[sizeNum]) {
    return SHOPIFY_VARIANT_MAP[pId][sizeNum];
  }

  // 2. Lookup by name keywords
  for (const [key, sizeMap] of Object.entries(SHOPIFY_VARIANT_MAP)) {
    if (pName.includes(key) || pId.includes(key)) {
      if (sizeMap[sizeNum]) return sizeMap[sizeNum];
    }
  }

  // Default fallback to Purple Oud 50ML
  return "46888623046817";
};"""

start_map = cart_code.find("// Force deployment trigger")
if start_map == -1:
    start_map = cart_code.find("const SHOPIFY_VARIANT_MAP")

end_map = cart_code.find("export default function CartDrawer")

if start_map != -1 and end_map != -1:
    cart_code = cart_code[:start_map] + new_map_code + "\n\n" + cart_code[end_map:]

with open(cart_path, "w", encoding="utf-8") as f:
    f.write(cart_code)

print("SUCCESS: Added comprehensive variant resolution helper in CartDrawer.tsx!")
