const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error("GET Services Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// CREATE new service
router.post("/", async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const newService = new Service({
      name,
      price,
      description
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error("POST Service Error:", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;