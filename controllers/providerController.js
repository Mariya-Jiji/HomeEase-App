const Provider = require("../models/Provider");

// ADD PROVIDER
exports.addProvider = async (req, res) => {
  try {
    const provider = new Provider(req.body);
    await provider.save();
    res.status(201).json({ message: "Provider added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add provider" });
  }
};

// GET PROVIDERS (FILTERED)
exports.getProviders = async (req, res) => {
  try {
    const { category } = req.query;

let filter = {};
if (category) {
  filter.serviceType = category;
}




    const providers = await Provider.find(filter);
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch providers" });
  }
};

