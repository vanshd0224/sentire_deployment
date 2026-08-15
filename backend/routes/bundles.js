const express = require('express');
const router = express.Router();
const { z } = require('zod');
const shopifyAdmin = require('../services/shopify/shopifyAdmin');
const { error } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

const bundleSchema = z.object({
  productIds: z.array(z.string()).min(1, 'productIds must contain at least one item')
});

/**
 * POST /bundles/price
 * Calculates bundle discount price based on selected items
 */
router.post('/price', async (req, res) => {
  const validation = bundleSchema.safeParse(req.body);
  if (!validation.success) {
    return error(res, validation.error.errors[0].message, 'VALIDATION_ERROR', 400);
  }

  const { productIds } = validation.data;

  try {
    const products = await shopifyAdmin.getProducts().catch(() => []);
    
    // Calculate total price
    let totalPrice = 0;
    productIds.forEach(id => {
      const match = products.find(p => p.id.toString() === id.toString() || p.id.toString().includes(id));
      const price = parseFloat(match?.variants?.[0]?.price || '5000');
      totalPrice += price;
    });

    if (totalPrice === 0) {
      totalPrice = productIds.length * 4999;
    }

    // 15% Bundle Discount logic if 2+ products selected
    const discountRate = productIds.length >= 2 ? 0.15 : 0.0;
    const discount = totalPrice * discountRate;
    const finalPrice = totalPrice - discount;

    return res.status(200).json({
      totalPrice: totalPrice.toFixed(2),
      discount: discount.toFixed(2),
      finalPrice: finalPrice.toFixed(2)
    });
  } catch (err) {
    logger.error(`Error calculating bundle price: ${err.message}`);
    return error(res, 'Failed to calculate bundle pricing', 'BUNDLE_ERROR', 500);
  }
});

module.exports = router;
