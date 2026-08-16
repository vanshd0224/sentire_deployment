// Official Shopify Storefront API Cart Manager
export const SHOPIFY_VARIANT_MAP: Record<string, Record<number, string>> = {
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

export const resolveShopifyVariantId = (item: any): string => {
  const pId = String(item?.productId || item?.id || "").toLowerCase().trim();
  const pName = String(item?.name || "").toLowerCase().trim();
  const sizeNum = Number(item?.size) || 50;

  if (SHOPIFY_VARIANT_MAP[pId]?.[sizeNum]) {
    return SHOPIFY_VARIANT_MAP[pId][sizeNum];
  }

  for (const [key, sizeMap] of Object.entries(SHOPIFY_VARIANT_MAP)) {
    if (pName.includes(key) || pId.includes(key)) {
      if (sizeMap[sizeNum]) return sizeMap[sizeNum];
    }
  }

  return "46888623046817";
};

// Shopify Storefront GraphQL cartCreate / cartLinesAdd mutation caller
export const syncAddToCartToShopifyStorefront = async (item: any, quantity: number = 1) => {
  try {
    const shopDomain = "hbj1d0-99.myshopify.com";
    const graphqlUrl = `https://${shopDomain}/api/2026-07/graphql.json`;
    const numericVariantId = resolveShopifyVariantId(item);
    const merchandiseId = `gid://shopify/ProductVariant/${numericVariantId}`;

    const existingCartId = localStorage.getItem("shopify_cart_id");

    if (!existingCartId) {
      // 1. Create new cart with cartCreate mutation
      const mutation = `
        mutation cartCreate($input: CartInput!) {
          cartCreate(input: $input) {
            cart {
              id
              checkoutUrl
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const variables = {
        input: {
          lines: [
            {
              merchandiseId,
              quantity
            }
          ]
        }
      };

      const res = await fetch(graphqlUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation, variables })
      });

      const data = await res.json();
      const newCart = data?.data?.cartCreate?.cart;
      if (newCart?.id && newCart?.checkoutUrl) {
        localStorage.setItem("shopify_cart_id", newCart.id);
        localStorage.setItem("shopify_checkout_url", newCart.checkoutUrl);
        console.log("Shopify Storefront cartCreate Success:", newCart);
      }
    } else {
      // 2. Add lines to existing cart with cartLinesAdd mutation
      const mutation = `
        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              id
              checkoutUrl
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const variables = {
        cartId: existingCartId,
        lines: [
          {
            merchandiseId,
            quantity
          }
        ]
      };

      const res = await fetch(graphqlUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation, variables })
      });

      const data = await res.json();
      const updatedCart = data?.data?.cartLinesAdd?.cart;
      if (updatedCart?.checkoutUrl) {
        localStorage.setItem("shopify_checkout_url", updatedCart.checkoutUrl);
        console.log("Shopify Storefront cartLinesAdd Success:", updatedCart);
      }
    }
  } catch (e) {
    console.log("Shopify Storefront Sync Notice:", e);
  }
};
