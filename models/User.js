const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["customer", "provider", "admin"],
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
otp: {
  type: String,
},
otpExpires: {
  type: Date,
  default:null
}
    
   

});
module.exports = mongoose.model("User", userSchema);

