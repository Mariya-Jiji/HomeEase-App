
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// Add a review
router.post("/", reviewController.addReview);
router.delete("/:id", reviewController.deleteReview);

// Get reviews for a provider
router.get("/:providerId", reviewController.getReviewsByProvider);

module.exports = router;