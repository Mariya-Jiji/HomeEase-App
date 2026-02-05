
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerEmail: {
      type: String,
      required: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
    
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    problemDescription: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
