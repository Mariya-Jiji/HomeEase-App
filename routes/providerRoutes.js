
const express = require("express");
console.log("✅ providerRoutes loaded");

const router = express.Router();
const {
  addProvider,
  getProviders
} = require("../controllers/providerController");

// POST - Add new provider
router.post("/", addProvider);

// GET - Get all providers
router.get("/", getProviders);

module.exports = router;
router.get("/test", (req, res) => {
  res.send("Provider route working");
});



