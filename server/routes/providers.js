const router = require('express').Router();
const User = require('../models/User');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// Get providers by service type with optional GPS filter
router.get('/:serviceType', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const query = {
      role: 'provider',
      isApproved: true,
      serviceType: req.params.serviceType
    };

    const busyBookings = await Booking.find({ status: { $in: ['pending', 'accepted', 'moving', 'arrived'] } });
    const busyProviderIds = busyBookings.map(b => b.provider.toString());

    let providers = await User.find(query).select('-password').lean();
    providers = providers.filter(p => !busyProviderIds.includes(p._id.toString()));

    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);

      providers = providers.map(p => {
        if (p.latitude != null && p.longitude != null) {
          const dist = getDistanceKm(userLat, userLng, p.latitude, p.longitude);
          p.distanceKm = parseFloat(dist.toFixed(1));
        }
        return p;
      });

      // Sort primarily by proximity, rating as tiebreaker
      providers.sort((a, b) => {
        const dA = a.distanceKm !== undefined ? a.distanceKm : 99999;
        const dB = b.distanceKm !== undefined ? b.distanceKm : 99999;
        const distDiff = dA - dB;
        if (distDiff !== 0) return distDiff;
        return b.rating - a.rating;
      });
    } else {
      // No location: sort by rating only
      providers.sort((a, b) => b.rating - a.rating);
    }

    res.json(providers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update provider location (for existing providers)
router.put('/update-location', auth, async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
      return res.status(400).json({ msg: 'Latitude and longitude are required.' });
    }
    await User.findByIdAndUpdate(req.user.id, {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    });
    res.json({ msg: 'Location updated successfully.' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

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

function toRad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = router;