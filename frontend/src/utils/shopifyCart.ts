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
  "deep crush": { 10: "46888622489761", 30: "46888622522529", 50: "46888622555297" },
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
  "purple oud": { 10: "46888622981281", 30: "46888623014049", 50: "46888623046817" },
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
  "white oud": { 10: "46888623276193", 30: "46888623308961", 50: "46888623341729" },
  "perfume-11": { 10: "46888623276193", 30: "46888623308961", 50: "46888623341729" },
  "11": { 10: "46888623276193", 30: "46888623308961", 50: "46888623341729" },
};

export const resolveShopifyVariantId = (item: any): string => {
  const pId = String(item?.productId || item?.id || "").toLowerCase().trim();
  const pName = String(item?.name || "").toLowerCase().trim();
  const sizeNum = parseInt(String(item?.size || "").replace(/\D/g, ""), 10) || 50;

  const normalizedId = pId.replace(/[\s\-_]/g, "");
  const normalizedName = pName.replace(/[\s\-_]/g, "");

  if (SHOPIFY_VARIANT_MAP[pId]?.[sizeNum]) {
    return SHOPIFY_VARIANT_MAP[pId][sizeNum];
  }

  for (const [key, sizeMap] of Object.entries(SHOPIFY_VARIANT_MAP)) {
    const normKey = key.replace(/[\s\-_]/g, "");
    if (normalizedName.includes(normKey) || normalizedId.includes(normKey)) {
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

    const storefrontToken = (import.meta.env && import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN) || "";
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (storefrontToken) {
      headers["X-Shopify-Storefront-Access-Token"] = storefrontToken;
    }

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
        headers,
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
        headers,
        body: JSON.stringify({ query: mutation, variables })
      });

      const data = await res.json();
      const updatedCart = data?.data?.cartLinesAdd?.cart;
      const userErrors = data?.data?.cartLinesAdd?.userErrors || [];

      if (updatedCart?.checkoutUrl) {
        localStorage.setItem("shopify_checkout_url", updatedCart.checkoutUrl);
        console.log("Shopify Storefront cartLinesAdd Success:", updatedCart);
      } else if (userErrors.length > 0 || !updatedCart) {
        // Stale or invalid Cart ID recovery: Clear stale ID and create new cart
        console.warn("Stale Shopify Cart ID detected. Creating fresh cart...", userErrors);
        localStorage.removeItem("shopify_cart_id");
        localStorage.removeItem("shopify_checkout_url");

        // Re-call cartCreate
        const createMutation = `
          mutation cartCreate($input: CartInput!) {
            cartCreate(input: $input) {
              cart { id checkoutUrl }
              userErrors { field message }
            }
          }
        `;
        const createRes = await fetch(graphqlUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({
            query: createMutation,
            variables: { input: { lines: [{ merchandiseId, quantity }] } }
          })
        });
        const createData = await createRes.json();
        const freshCart = createData?.data?.cartCreate?.cart;
        if (freshCart?.id && freshCart?.checkoutUrl) {
          localStorage.setItem("shopify_cart_id", freshCart.id);
          localStorage.setItem("shopify_checkout_url", freshCart.checkoutUrl);
          console.log("Shopify Storefront Cart Recovery Success:", freshCart);
        }
      }
    }
  } catch (e) {
    console.log("Shopify Storefront Sync Notice:", e);
  }
};

// Option A: Native HTML Form POST Checkout redirect supporting multi-item, multi-quantity, multi-variant carts
export const redirectToShopifyFormCheckout = (items: any[]) => {
  if (!items || items.length === 0) return;

  const shopDomain = "hbj1d0-99.myshopify.com";
  const form = document.createElement("form");
  form.method = "POST";
  form.action = `https://${shopDomain}/cart/add`;
  form.style.display = "none";

  items.forEach((item, index) => {
    const variantId = resolveShopifyVariantId(item);
    const qty = Number(item.quantity) || 1;

    const idInput = document.createElement("input");
    idInput.type = "hidden";
    idInput.name = `items[${index}][id]`;
    idInput.value = variantId;
    form.appendChild(idInput);

    const qtyInput = document.createElement("input");
    qtyInput.type = "hidden";
    qtyInput.name = `items[${index}][quantity]`;
    qtyInput.value = String(qty);
    form.appendChild(qtyInput);
  });

  const returnToInput = document.createElement("input");
  returnToInput.type = "hidden";
  returnToInput.name = "return_to";
  returnToInput.value = "/checkout";
  form.appendChild(returnToInput);

  document.body.appendChild(form);
  console.log("[Option A Checkout] Submitting Native Multi-Item Form POST to Shopify...");
  form.submit();
};

// Asynchronously create a fresh GraphQL Shopify Cart via Server-Side Cloud Run Backend Proxy
export const createOrGetShopifyCheckoutUrl = async (items: any[]): Promise<string> => {
  if (!items || items.length === 0) return "";

  try {
    const backendUrl = (import.meta.env && import.meta.env.VITE_BACKEND_URL) || "https://ecommerce-backend-1041917436859.asia-south1.run.app";
    const res = await fetch(`${backendUrl}/checkout/create-cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    });

    const data = await res.json();
    if (data?.checkoutUrl) {
      console.log("[Option B Server Proxy Success] Signed Checkout URL:", data.checkoutUrl);
      return data.checkoutUrl;
    }
  } catch (err) {
    console.error("[Option B Server Proxy Warning] Call error:", err);
  }

  // Fallback direct permalink
  const permalinkItems = items
    .map((item) => `${resolveShopifyVariantId(item)}:${item.quantity || 1}`)
    .join(",");
  return `https://hbj1d0-99.myshopify.com/cart/${permalinkItems}`;
};
