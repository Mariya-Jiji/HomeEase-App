const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: String,
  phone: String,
  location: String,
  date: String,
  time: String,
  serviceType: String,
  status: { type: String, default: 'pending' },
  workDescription: String,
  amount: Number,
  paymentDone: { type: Boolean, default: false },
  paymentMethod: String,
  review: String,
  rating: Number
}, { timestamps: true });
module.exports = mongoose.model('Booking', BookingSchema);