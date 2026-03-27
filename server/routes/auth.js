const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/register', upload.single('idProof'), async (req, res) => {
  try {
    const { name, email, password, role, serviceType, phone, location, latitude, longitude } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      name, email, password: hashed, role,
      serviceType: role === 'provider' ? serviceType : undefined,
      phone, location,
      latitude: latitude ? parseFloat(latitude) : undefined,
      longitude: longitude ? parseFloat(longitude) : undefined,
      idProof: req.file ? req.file.filename : null,
      isApproved: role === 'customer'
    });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role, isApproved: user.isApproved } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid email or password' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Invalid email or password' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role, isApproved: user.isApproved } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Email not found' });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ msg: 'Password updated' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/upload-id', authMiddleware, upload.single('idProof'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { idProof: req.file?.filename, isApproved: false },
      { new: true }
    );
    res.json({ msg: 'ID proof uploaded' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;