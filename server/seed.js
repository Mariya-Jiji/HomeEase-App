const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const existing = await User.findOne({ email: 'admin@homeease.com' });
  if (!existing) {
    const hashed = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin', email: 'admin@homeease.com',
      password: hashed, role: 'admin', isApproved: true
    });
    console.log('Admin created: admin@homeease.com / admin123');
  } else {
    console.log('Admin already exists');
  }
  mongoose.disconnect();
});