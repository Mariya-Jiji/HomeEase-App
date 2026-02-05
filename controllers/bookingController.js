
const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    console.log("Booking request body:", req.body); // DEBUG

    const booking = new Booking(req.body);
    await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      message: "Booking failed",
      error: error.message,
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("providerId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
