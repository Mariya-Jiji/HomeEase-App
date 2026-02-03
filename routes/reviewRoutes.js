const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Review route working" });
});

module.exports = router;
