const router = require('express').Router();
const User = require('../models/User');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// Middleware: admin only
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
  next();
};

// Get all providers
router.get('/providers', auth, adminOnly, async (req, res) => {
  try {
    const providers = await User.find({ role: 'provider' });
    res.json(providers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Approve or revoke provider
router.put('/providers/:id/approve', auth, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: req.body.isApproved },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Reject (Delete) provider
router.delete('/providers/:id', auth, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Provider rejected and deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all bookings
router.get('/bookings', auth, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('customer', 'name email phone')
      .populate('provider', 'name email phone');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get provider revenue summary
router.get('/provider-revenue', auth, adminOnly, async (req, res) => {
  try {
    const paidBookings = await Booking.find({ status: 'paid' })
      .populate('provider', 'name email phone');

    const revenueMap = {};
    paidBookings.forEach(b => {
      if (!b.provider) return;
      const id = b.provider._id.toString();
      if (!revenueMap[id]) {
        revenueMap[id] = {
          provider: b.provider,
          totalAmount: 0,
          bookingCount: 0,
          bookings: []
        };
      }
      revenueMap[id].totalAmount += b.amount || 0;
      revenueMap[id].bookingCount += 1;
      revenueMap[id].bookings.push({
        date: b.date,
        serviceType: b.serviceType,
        amount: b.amount,
        workDescription: b.workDescription,
        paymentMethod: b.paymentMethod
      });
    });

    res.json(Object.values(revenueMap));
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;