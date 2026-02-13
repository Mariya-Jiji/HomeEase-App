const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// TEST route
router.get("/test", (req, res) => {
  res.send("Admin routes working ✅");
});

// ================= OVERALL ADMIN STATS =================
router.get("/stats", async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();

    const services = await Booking.aggregate([
      {
        $group: {
          _id: "$serviceType",
          count: { $sum: 1 }
        }
      }
    ]);

    const paymentsAgg = await Booking.aggregate([
      {
        $group: {
          _id: "$paymentMode",
          total: { $sum: "$amount" }
        }
      }
    ]);

    let online = 0;
    let cash = 0;

    paymentsAgg.forEach(p => {
      if (p._id === "online") online = p.total;
      if (p._id === "cash") cash = p.total;
    });

    res.json({
      customers: 0,
      providers: 0,
      bookingsToday: totalBookings,
      revenueToday: online + cash,
      services: services.map(s => ({
        name: s._id,
        count: s.count
      })),
      payments: { online, cash }
    });

  } catch (err) {
    console.error("ADMIN STATS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= SERVICE-WISE STATS =================
router.get("/service-wise-stats", async (req, res) => {
  try {
    const data = await Booking.aggregate([
      {
        $group: {
          _id: "$serviceType",
          totalBookings: { $sum: 1 },
          revenue: { $sum: "$amount" },
          onlinePayments: {
            $sum: {
              $cond: [{ $eq: ["$paymentMode", "online"] }, "$amount", 0]
            }
          },
          cashPayments: {
            $sum: {
              $cond: [{ $eq: ["$paymentMode", "cash"] }, "$amount", 0]
            }
          },
          customers: { $addToSet: "$customerId" }
        }
      },
      {
        $project: {
          service: "$_id",
          totalBookings: 1,
          revenue: 1,
          onlinePayments: 1,
          cashPayments: 1,
          totalCustomers: { $size: "$customers" }
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    console.error("SERVICE-WISE STATS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
