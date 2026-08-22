const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

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
  "zephyrine": { 10: "46888622293153", 30: "46888622325921" }
};

function resolveVariantId(item) {
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

    const lines = items.map((item) => ({
      merchandiseId: `gid://shopify/ProductVariant/${resolveVariantId(item)}`,
      quantity: Number(item.quantity) || 1
    }));

    const input = { lines };
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
