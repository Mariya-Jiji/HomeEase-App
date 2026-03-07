const router = require('express').Router();
const User = require('../models/User');

// Get providers by service type (with optional location filter)
router.get('/:serviceType', async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    const query = { role: 'provider', isApproved: true, serviceType: req.params.serviceType };

    let providers = await User.find(query).select('-password').sort({ rating: -1 });

    // If coordinates provided, filter by distance
    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);
      const maxRadius = parseFloat(radius) || 20; // default 20km

      providers = providers.filter(p => {
        if (!p.latitude || !p.longitude) return true; // include providers with no location
        const dist = getDistanceKm(userLat, userLng, p.latitude, p.longitude);
        p._doc.distanceKm = parseFloat(dist.toFixed(1));
        return dist <= maxRadius;
      });

      // Sort by distance if location provided
      providers.sort((a, b) => (a._doc.distanceKm || 999) - (b._doc.distanceKm || 999));
    }

    res.json(providers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Haversine formula to calculate distance between two coordinates
function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg) { return deg * (Math.PI / 180); }

module.exports = router;