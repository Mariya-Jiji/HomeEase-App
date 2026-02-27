const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;