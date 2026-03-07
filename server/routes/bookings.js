const router = require('express').Router();
const Booking = require('../models/Booking');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const booking = new Booking({ ...req.body, customer: req.user.id });
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get bookings for customer
router.get('/customer', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id }).populate('provider', 'name phone');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get bookings for provider
router.get('/provider', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ provider: req.user.id }).populate('customer', 'name phone');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update booking status (supports workDescription + amount for 'completed')
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status, workDescription, amount } = req.body;
    const update = { status };
    if (workDescription) update.workDescription = workDescription;
    if (amount) update.amount = amount;
    const booking = await Booking.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Payment done
router.put('/:id/payment', auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentDone: true, status: 'paid', paymentMethod: req.body.paymentMethod },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Submit review
router.put('/:id/review', auth, async (req, res) => {
  try {
    const { review, rating } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id, { review, rating }, { new: true }
    );
    const allBookings = await Booking.find({ provider: booking.provider, rating: { $exists: true } });
    const avg = allBookings.reduce((a, b) => a + b.rating, 0) / allBookings.length;
    await User.findByIdAndUpdate(booking.provider, { rating: avg, reviewCount: allBookings.length });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;