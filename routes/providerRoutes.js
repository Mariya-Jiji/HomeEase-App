
const express = require("express");
const router = express.Router();
const {
  addProvider,
  getProviders,
} = require("../controllers/providerController");

// ADD provider
router.post("/", addProvider);

// GET providers (with optional filter)
router.get("/", getProviders);

module.exports = router;
