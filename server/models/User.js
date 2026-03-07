const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'customer' },
  phone: String,
  location: String,
  latitude: Number,
  longitude: Number,
  serviceType: String,
  idProof: String,
  isApproved: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);