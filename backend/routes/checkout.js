const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const ENGRAVING_FEE_VARIANT_ID = "46947691659425";

const SHOPIFY_VARIANT_MAP = {
  "0809": { 10: "46888622293153", 30: "46888622325921", 50: "46888622358689" },
  "calantha": { 10: "46888622391457", 30: "46888622424225", 50: "46888622456993" },
  "deep-crush": { 10: "46888622489761", 30: "46888622522529", 50: "46888622555297" },
  "herrlich": { 10: "46888622588065", 30: "46888622620833", 50: "46888622653601" },
  "midnight": { 10: "46888622686369", 30: "46888622719137", 50: "46888622751905" },
  "mirai": { 10: "46888622784673", 30: "46888622817441", 50: "46888622850209" },
  "personna": { 10: "46888622882977", 30: "46888622915745", 50: "46888622948513" },
  "purple-oud": { 10: "46888622981281", 30: "46888623014049", 50: "46888623046817" },
  "rich": { 10: "46888623079585", 30: "46888623112353", 50: "46888623145121" },
  "seductive": { 10: "46888623177889", 30: "46888623210657", 50: "46888623243425" },
  "white-oud": { 10: "46888623276193", 30: "46888623308961", 50: "46888623341729" },
  "zephyrine": { 10: "46946124628129", 30: "46946124660897" },
  "bijou": { 10: "46946155430049", 30: "46946155462817" },
  "dapper": { 10: "46946174337185", 30: "46946174369953" },
  "le-chocolat": { 10: "46946200354977", 30: "46946200387745" },
  "pc-leather": { 10: "46946216509601", 30: "46946216542369" },
  "quantillion": { 10: "46946240823457", 30: "46946240856225" },
  "reiz": { 10: "46946264088737", 30: "46946264121505" },
  "sent-aura": { 10: "46946279981217", 30: "46946280013985" },
  "vanaco": { 10: "46946298298529", 30: "46946298331297" },
  "woo-dy": { 10: "46946307014817", 30: "46946307047585" },
  "custom-bottle-engraving": { 0: ENGRAVING_FEE_VARIANT_ID, 50: ENGRAVING_FEE_VARIANT_ID }
};

function resolveVariantId(item) {
  if (item?.variantId) {
    return item.variantId;
  }

  const pId = String(item?.productId || item?.id || "").toLowerCase().trim();
  const pName = String(item?.name || "").toLowerCase().trim();
  const sizeNum = parseInt(String(item?.size || "").replace(/\D/g, ""), 10) || 50;

  if (pId.includes("engraving") || pName.includes("engraving")) {
    return ENGRAVING_FEE_VARIANT_ID;
  }

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
}

// POST /checkout/create-cart
router.post('/create-cart', async (req, res) => {
  try {
    const { items, discountCode } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    const shopDomain = process.env.SHOPIFY_SHOP || 'hbj1d0-99.myshopify.com';
    const graphqlUrl = `https://${shopDomain}/api/2026-07/graphql.json`;

    const expandedLines = [];
    let engravingCount = 0;

    items.forEach((item) => {
      const vid = resolveVariantId(item);
      expandedLines.push({
        merchandiseId: `gid://shopify/ProductVariant/${vid}`,
        quantity: Number(item.quantity) || 1
      });

      if (item?.isPersonalised || item?.engravingText) {
        engravingCount += (Number(item.quantity) || 1);
      }
    });

    if (engravingCount > 0) {
      expandedLines.push({
        merchandiseId: `gid://shopify/ProductVariant/${ENGRAVING_FEE_VARIANT_ID}`,
        quantity: engravingCount
      });
    }

    const input = { lines: expandedLines };
    if (discountCode) {
      input.discountCodes = [discountCode];
    }

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

    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables: { input } })
    });

    const data = await response.json();
    let checkoutUrl = data?.data?.cartCreate?.cart?.checkoutUrl;

    if (checkoutUrl) {
      if (discountCode && !checkoutUrl.includes("discount=")) {
        checkoutUrl += (checkoutUrl.includes("?") ? "&" : "?") + `discount=${encodeURIComponent(discountCode)}`;
      }
      return res.status(200).json({ success: true, checkoutUrl });
    }

    // Fallback to permalink URL
    const permalinkItems = items.map(item => `${resolveVariantId(item)}:${item.quantity || 1}`).join(',');
    let permalinkUrl = `https://${shopDomain}/cart/${permalinkItems}`;
    if (discountCode) {
      permalinkUrl += `?discount=${encodeURIComponent(discountCode)}`;
    }
    return res.status(200).json({ success: true, checkoutUrl: permalinkUrl });

  } catch (error) {
    console.error('[Backend Checkout Proxy Error]:', error);
    const shopDomain = process.env.SHOPIFY_SHOP || 'hbj1d0-99.myshopify.com';
    const { items, discountCode } = req.body || {};
    const itemsArr = Array.isArray(items) ? items : [];
    const permalinkItems = itemsArr.map(item => `${resolveVariantId(item)}:${item.quantity || 1}`).join(',');
    let permalinkUrl = `https://${shopDomain}/cart/${permalinkItems}`;
    if (discountCode) {
      permalinkUrl += `?discount=${encodeURIComponent(discountCode)}`;
    }
    return res.status(200).json({ success: true, checkoutUrl: permalinkUrl });
  }
});

module.exports = router;
