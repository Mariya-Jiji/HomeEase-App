const mongoose = require('mongoose');
const ComplaintSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'open' }, // open, in_progress, resolved
  adminNote: String
}, { timestamps: true });
module.exports = mongoose.model('Complaint', ComplaintSchema);