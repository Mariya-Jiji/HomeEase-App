
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Review = () => {
  const [reviews, setReviews] = useState([
    {
      name: "Ramesh Kumar",
      rating: 5,
      comment: "Excellent plumbing service. Quick response!"
    },
    {
      name: "Anjali S",
      rating: 4,
      comment: "Electrician arrived on time and fixed the issue."
    }
  ]);

  const [name, setName] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      name,
      rating,
      comment
    };

    setReviews([newReview, ...reviews]);

    // Clear form
    setName("");
    setRating("5");
    setComment("");
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
        paddingTop: "30px",
        paddingBottom: "30px"
      }}
    >
      <div className="container">

        <h3 className="text-center fw-bold mb-4">User Reviews</h3>

        {/* Add Review Form */}
        <div className="card shadow-sm mb-4">
          <div
            className="card-header text-white fw-bold"
            style={{ backgroundColor: "#33a1e0" }}
          >
            Add Your Review
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Rating</label>
                <select
                  className="form-select"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="5">⭐⭐⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="1">⭐</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Your Review</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn text-white"
                style={{ backgroundColor: "#33a1e0" }}
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Display Reviews */}
        {reviews.map((review, index) => (
          <div key={index} className="card shadow-sm mb-3">
            <div className="card-body">
              <h6 className="fw-bold">{review.name}</h6>
              <p className="mb-1">{review.comment}</p>
              <small className="text-muted">
                {"⭐".repeat(review.rating)}
              </small>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Review;
