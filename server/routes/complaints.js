const router = require('express').Router();
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth');

// Submit a complaint
router.post('/', auth, async (req, res) => {
  try {
    const complaint = new Complaint({
      customer: req.user.id,
      ...req.body
    });
    await complaint.save();
    res.json({ msg: 'Complaint submitted successfully.', complaint });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get complaints for logged-in customer
router.get('/my', auth, async (req, res) => {
  try {
    const complaints = await Complaint.find({ customer: req.user.id })
      .populate('booking', 'serviceType date')
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Admin: get all complaints
router.get('/all', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    const complaints = await Complaint.find()
      .populate('customer', 'name email phone')
      .populate('booking', 'serviceType date provider')
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Admin: update complaint status
router.put('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, adminNote: req.body.adminNote },
      { new: true }
    );
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;