
const express = require("express");
const router = express.Router();


const { register, login, resetPassword } = require("../controllers/authController");

// TEST route (important)
router.get("/test", (req, res) => {
  res.send("Auth route working");
});

router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", resetPassword);


module.exports = router;
