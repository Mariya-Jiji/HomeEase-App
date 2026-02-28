const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================================
   HELPER: Generate 4-digit OTP
========================================= */
const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

/* =========================================
   REGISTER (DO NOT CHANGE - WORKING)
========================================= */
const register = async (req, res) => {
  try {
    const { name, phone, password, role } = req.body;

    if (!name || !phone || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "Phone already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    await User.create({
      name,
      phone,
      password: hashedPassword,
      role,
      otp,
      isVerified: false
    });

    res.status(201).json({
      message: "Registered successfully. Verify OTP.",
      otp // Remove in production
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================================
   VERIFY OTP
========================================= */
const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.otp) {
      return res.status(400).json({ message: "No OTP found" });
    }

    if (String(user.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    // Generate token after verification
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Account verified successfully",
      token,
      role: user.role
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================================
   LOGIN
========================================= */
const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 🔥 ALWAYS generate OTP during login
    const otp = generateOtp();

    user.otp = otp;
    await user.save();

    console.log("LOGIN OTP:", otp);

    return res.json({
      message: "OTP sent. Please verify."
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


//FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = generateOtp();

    user.otp = otp;
    await user.save();

    console.log("FORGOT PASSWORD OTP:", otp);

    return res.json({
      message: "OTP sent for password reset"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};












/* =========================================
   RESET PASSWORD
========================================= */
const resetPassword = async (req, res) => {
  try {
    const { phone, otp, newPassword } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.otp || String(user.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = null;

    await user.save();

    return res.json({
      message: "Password reset successful"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================================
   EXPORTS
========================================= */
module.exports = {
  register,
  verifyOtp,
  login,
  forgotPassword,
  resetPassword
};