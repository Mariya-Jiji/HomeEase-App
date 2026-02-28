// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");

// console.log("🚨 SERVER.JS IS RUNNING 🚨");

// dotenv.config();

// const app = express();

// // ================= MIDDLEWARE =================
// app.use(cors());
// app.use(express.json());

// // ================= ROUTES =================
// const authRoutes = require("./routes/authRoutes");
// const providerRoutes = require("./routes/providerRoutes");

// app.use("/api/auth", authRoutes);
// app.use("/api/providers", providerRoutes);

// // ================= TEST ROUTE =================
// app.get("/", (req, res) => {
//   res.send("HomeEase Backend is Running 🚀");
// });

// // ================= DATABASE =================
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // ================= SERVER =================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/providers", require("./routes/providerRoutes"));
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);



// Test route
app.get("/", (req, res) => {
  res.send("HomeEase Backend is Running 🚀");
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
