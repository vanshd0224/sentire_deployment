let tokenCache = {
  token: null,
  expiresAt: 0
};

/**
 * Get Shiprocket API Bearer Token (Cached for 9 days)
 */
async function getShiprocketToken() {
  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;

  if (!email || !password) {
    return null;
  }

  // Return cached token if valid
  if (tokenCache.token && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  try {
    const res = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data && data.token) {
      tokenCache.token = data.token;
      // Cache for 9 days (token valid for 10 days)
      tokenCache.expiresAt = Date.now() + 9 * 24 * 60 * 60 * 1000;
      return tokenCache.token;
    }
  } catch (err) {
    console.error('Shiprocket Login Error:', err.message);
  }

  return null;
}

/**
 * Check courier serviceability via Shiprocket API
 */
async function checkServiceability(deliveryPincode, pickupPincode = process.env.SHIPROCKET_PICKUP_PINCODE || '302016', weightKg = 0.5, cod = 1) {
  const token = await getShiprocketToken();

  if (!token) {
    return null; // Fallback to Smart Zone rule
  }

  try {
    const query = new URLSearchParams({
      pickup_postcode: pickupPincode,
      delivery_postcode: deliveryPincode,
      weight: weightKg.toString(),
      cod: cod.toString()
    });

    const res = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/serviceability/?${query}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (data && data.data && data.data.available_courier_companies) {
      const couriers = data.data.available_courier_companies;

      if (couriers.length === 0) {
        return { serviceable: false };
      }

      // Find courier with fastest ETD or minimum estimated days
      let fastestCourier = couriers[0];
      for (const courier of couriers) {
        if (courier.etd && (!fastestCourier.etd || new Date(courier.etd) < new Date(fastestCourier.etd))) {
          fastestCourier = courier;
        }
      }

      return {
        serviceable: true,
        estimated_days: fastestCourier.etd ? `${fastestCourier.estimated_delivery_days || '2-3'} Days` : '2-3 Days',
        etd: fastestCourier.etd,
        courier_name: fastestCourier.courier_name,
        cod_available: fastestCourier.cod === 1
      };
    }
  } catch (err) {
    console.error('Shiprocket Serviceability API Error:', err.message);
  }

  return null;
}

module.exports = {
  getShiprocketToken,
  checkServiceability
};
