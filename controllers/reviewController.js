/*const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to add review" });
  }
};

exports.getReviewsByProvider = async (req, res) => {
  try {
    const reviews = await Review.find({ providerId: req.params.providerId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to get reviews" });
  }
};
*/
const Review = require("../models/Review");

// Add a review
exports.addReview = async (req, res) => {
  try {
    const { providerId, userName, rating, comment } = req.body;

    const newReview = new Review({
      providerId,
      userName,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review" });
  }
};

// Get reviews for a provider
exports.getReviewsByProvider = async (req, res) => {
  try {
    const reviews = await Review.find({
      providerId: req.params.providerId,
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review" });
  }
};
