const crypto = require('crypto');

const META_PIXEL_ID = process.env.META_PIXEL_ID || '4305047443093499';
const META_CAPI_TOKEN = process.env.META_CAPI_TOKEN || 'EAAOrZBJm6eOUBSVZBpg9UVS3ZBZBUWdY9UyAlAQzF3q9iIHZAM41lXnevRq2dGOh1YHTMLsML8aB56ZAXX99Nkz0BZCAsjmb54NgZC3qleyNqalKvQdV1ZA7ZBD9ispcMX7vfD5nZCWaYZAZAzc66FZBUfr5XoRjR8G90EvhiMwCZCocDAQ2eX4haWoIHKbfk7H5Cj5n9AZCHQZDZD';

/**
 * SHA256 Hash helper for PII matching
 */
function hashField(value) {
  if (!value) return undefined;
  const clean = value.toString().trim().toLowerCase();
  if (!clean) return undefined;
  return crypto.createHash('sha256').update(clean).digest('hex');
}

/**
 * Send Server-Side Purchase Event to Meta Conversions API (CAPI)
 */
async function sendServerPurchaseEvent(orderPayload) {
  try {
    const orderId = orderPayload?.id?.toString() || orderPayload?.name;
    const totalPrice = parseFloat(orderPayload?.total_price || orderPayload?.current_total_price || 0);
    const currency = orderPayload?.currency || 'INR';
    const email = orderPayload?.email || orderPayload?.customer?.email;
    const phone = orderPayload?.phone || orderPayload?.customer?.phone || orderPayload?.shipping_address?.phone;

    const lineItems = orderPayload?.line_items || [];
    const contentIds = lineItems.map(item => item.product_id?.toString() || item.sku || item.title);
    const contents = lineItems.map(item => ({
      id: item.product_id?.toString() || item.sku || item.title,
      quantity: item.quantity || 1,
      item_price: parseFloat(item.price || 0)
    }));

    const eventTime = Math.floor(Date.now() / 1000);

    const userData = {
      em: hashField(email),
      ph: hashField(phone),
      fn: hashField(orderPayload?.customer?.first_name || orderPayload?.shipping_address?.first_name),
      ln: hashField(orderPayload?.customer?.last_name || orderPayload?.shipping_address?.last_name),
      ct: hashField(orderPayload?.shipping_address?.city),
      st: hashField(orderPayload?.shipping_address?.province_code || orderPayload?.shipping_address?.province),
      zp: hashField(orderPayload?.shipping_address?.zip),
      country: hashField(orderPayload?.shipping_address?.country_code || 'in')
    };

    // Clean undefined fields
    Object.keys(userData).forEach(key => userData[key] === undefined && delete userData[key]);

    const payload = {
      data: [
        {
          event_name: 'Purchase',
          event_time: eventTime,
          event_id: `purchase_order_${orderId}`,
          action_source: 'website',
          user_data: userData,
          custom_data: {
            currency: currency,
            value: totalPrice,
            content_type: 'product',
            content_ids: contentIds,
            contents: contents,
            order_id: orderId,
            num_items: lineItems.reduce((acc, i) => acc + (i.quantity || 1), 0)
          }
        }
      ]
    };

    const res = await fetch(`https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log(`Server-side CAPI Purchase event for Order #${orderId} response:`, data);
    return data;
  } catch (error) {
    console.error('Server-side Meta CAPI Purchase error:', error.message);
    return null;
  }
}

module.exports = {
  sendServerPurchaseEvent
};
