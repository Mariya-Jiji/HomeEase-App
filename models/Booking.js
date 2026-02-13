const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  serviceType: {
    type: String,
    required: true
  },

  complaint: {
    type: String,
    required: true
  },

  serviceDate: {
    type: Date,
    required: true
  },

  serviceTime: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  paymentMode: {
    type: String,
    enum: ["online", "cash"],
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
