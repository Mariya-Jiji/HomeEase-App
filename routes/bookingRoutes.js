
const express = require("express");
const router = express.Router();
// console.log(req.body);
const {
    
  createBooking,
  getBookings,
} = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/", getBookings);



module.exports = router;
