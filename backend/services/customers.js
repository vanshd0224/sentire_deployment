const mongoose = require('mongoose');
const Customer = require('../models/Customer');

/**
 * The customer behind a Shiprocket Checkout order: the mobile number
 * Shiprocket verified with its OTP, and the name / email they entered.
 * Saved under the phone, so their profile and My Orders work on any device.
 */
const last10 = (p) => String(p || '').replace(/\D/g, '').slice(-10);

function customerFromOrder(o) {
  const a = o?.shipping_address || {};
  const digits = last10(o?.phone || a.phone || o?.billing_address?.phone);
  if (!/^[6-9]\d{9}$/.test(digits)) return null;
  return {
    phone: `+91${digits}`,
    name: [a.first_name, a.last_name].filter(Boolean).join(' ').trim(),
    email: String(o?.email || a.email || '').trim(),
  };
}

/** Save (or fill in) the customer from an order; keeps a name they already set. */
async function saveCustomerFromOrder(o) {
  const c = customerFromOrder(o);
  if (!c || mongoose.connection.readyState !== 1) return c;
  const existing = await Customer.findOne({ phone: c.phone }).lean();
  const set = { lastLoginAt: new Date() };
  if (!existing?.name && c.name) set.name = c.name;
  if (!existing?.email && c.email) set.email = c.email;
  await Customer.updateOne({ phone: c.phone }, { $set: set }, { upsert: true });
  return { ...c, name: existing?.name || c.name, email: existing?.email || c.email };
}

module.exports = { customerFromOrder, saveCustomerFromOrder };
