const express = require('express');
const router = express.Router();
const shiprocketService = require('../services/shiprocketService');

/**
 * GET /api/pincode/check?pincode=302016
 */
router.get('/check', async (req, res) => {
  try {
    const { pincode } = req.query;

    if (!pincode || !/^\d{6}$/.test(pincode.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 6-digit Indian Pincode.'
      });
    }

    const cleanPincode = pincode.trim();
    const originPincode = process.env.SHIPROCKET_PICKUP_PINCODE || '302016';

    // 1. SPECIAL JAIPUR 24-HOUR RULE (Prefix 302xxx)
    if (cleanPincode.startsWith('302')) {
      return res.json({
        success: true,
        pincode: cleanPincode,
        serviceable: true,
        estimated_days: '1 Day',
        delivery_text: 'Delivered within 24 Hours',
        badge: '⚡ 24-Hour Jaipur Express Delivery',
        express: true,
        cod_available: true,
        location: 'Jaipur, Rajasthan (Origin Warehouse)'
      });
    }

    // 2. TRY SHIPROCKET API (Real-Time Serviceability)
    const shiprocketResult = await shiprocketService.checkServiceability(cleanPincode, originPincode);
    if (shiprocketResult) {
      if (!shiprocketResult.serviceable) {
        return res.json({
          success: true,
          pincode: cleanPincode,
          serviceable: false,
          delivery_text: 'Currently unserviceable by courier partners.',
          cod_available: false
        });
      }

      return res.json({
        success: true,
        pincode: cleanPincode,
        serviceable: true,
        estimated_days: shiprocketResult.estimated_days,
        delivery_text: `Delivered in ${shiprocketResult.estimated_days}`,
        courier_name: shiprocketResult.courier_name,
        cod_available: shiprocketResult.cod_available,
        source: 'shiprocket_api'
      });
    }

    // 3. FALLBACK SMART ZONE RULE (Distance-Based Estimate)
    const prefix3 = parseInt(cleanPincode.substring(0, 3), 10);
    let estimatedDays = '3 - 4 Days';
    let badgeText = '📦 Standard Courier Shipping';

    // Rajasthan (300-349) & Delhi NCR (110-122)
    if ((prefix3 >= 300 && prefix3 <= 349) || (prefix3 >= 110 && prefix3 <= 122) || (prefix3 >= 201 && prefix3 <= 203)) {
      estimatedDays = '1 - 2 Days';
      badgeText = '🚀 Fast Regional Delivery';
    }
    // Major Metros (Mumbai 400, Blr 560, Hyd 500, Kolkata 700, Chennai 600)
    else if ([400, 401, 560, 500, 700, 600].includes(prefix3)) {
      estimatedDays = '2 - 3 Days';
      badgeText = '✈️ Express Metro Shipping';
    }

    return res.json({
      success: true,
      pincode: cleanPincode,
      serviceable: true,
      estimated_days: estimatedDays,
      delivery_text: `Delivered in ${estimatedDays}`,
      badge: badgeText,
      cod_available: true,
      source: 'smart_zone_engine'
    });

  } catch (error) {
    console.error('Pincode check error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking pincode serviceability.'
    });
  }
});

module.exports = router;
