const Provider = require("../models/Provider");

// Add Provider
exports.addProvider = async (req, res) => {
  try {
    const { name, serviceType, phone, location } = req.body;

    if (!name || !serviceType || !phone || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const provider = await Provider.create({
      name,
      serviceType,
      phone,
      location,
    });

    res.status(201).json({
      message: "Provider added successfully",
      provider,
    });
  } catch (error) {
    console.error("Add Provider Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get Providers
exports.getProviders = async (req, res) => {
  try {
    const { serviceType } = req.query;

    let filter = {};
    if (serviceType) {
      filter.serviceType = serviceType;
    }

    const providers = await Provider.find(filter);

    res.status(200).json(providers);
  } catch (error) {
    console.error("Get Providers Error:", error);
    res.status(500).json({ message: error.message });
  }
};
