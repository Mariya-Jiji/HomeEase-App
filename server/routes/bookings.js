const router = require('express').Router();
const Booking = require('../models/Booking');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const unpaidBooking = await Booking.findOne({
      customer: req.user.id,
      status: 'completed',
      paymentDone: false,
      amount: { $gt: 0 }
    });

    if (unpaidBooking) {
      return res.status(400).json({ msg: 'You have unpaid fines or pending payments. Please clear them before making a new booking.' });
    }

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
    const bookings = await Booking.find({ customer: req.user.id }).populate('provider', 'name phone latitude longitude');
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
    
    const currentBooking = await Booking.findById(req.params.id);
    if (!currentBooking) return res.status(404).json({ msg: 'Booking not found' });

    const update = { status };

    // Enforce penalty if cancelled after provider is already moving or arrived
    if (status === 'cancelled' && ['moving', 'arrived'].includes(currentBooking.status) && req.user.id === currentBooking.customer.toString()) {
      update.status = 'completed';
      update.workDescription = 'Cancelled after provider started moving (Fine applied)';
      update.amount = 100;
    } else {
      if (workDescription) update.workDescription = workDescription;
      if (amount) update.amount = amount;
    }

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
      { paymentDone: true, paymentMethod: req.body.paymentMethod },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Confirm payment (Provider)
router.put('/:id/confirm-payment', auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'paid' },
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