
import React, { useEffect, useState } from "react";
import axios from "axios";

const Review = () => {
  const [providers, setProviders] = useState([]);
  const [providerId, setProviderId] = useState("");
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/providers")
      .then((res) => setProviders(res.data))
      .catch((err) => console.log(err));
  }, []);

  const submitReview = async (e) => {
    e.preventDefault();

    if (!providerId || !userName || !rating || !comment) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reviews", {
        providerId,
        userName,
        rating,
        comment,
      });

      alert("Review added successfully");

      setProviderId("");
      setUserName("");
      setRating("");
      setComment("");
    } catch (err) {
      alert("Failed to add review");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center">Add Review</h3>

      <form onSubmit={submitReview} className="card p-3 shadow mt-3">

        <label>Select Provider</label>
        <select
          className="form-control mb-2"
          value={providerId}
          onChange={(e) => setProviderId(e.target.value)}
        >
          <option value="">-- Select Provider --</option>
          {providers.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} ({p.serviceType})
            </option>
          ))}
        </select>

        <label>Your Name</label>
        <input
          type="text"
          className="form-control mb-2"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label>Rating</label>
        <select
          className="form-control mb-2"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Select rating</option>
          <option value="1">1 ⭐</option>
          <option value="2">2 ⭐⭐</option>
          <option value="3">3 ⭐⭐⭐</option>
          <option value="4">4 ⭐⭐⭐⭐</option>
          <option value="5">5 ⭐⭐⭐⭐⭐</option>
        </select>

        <label>Comment</label>
        <textarea
          className="form-control mb-3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="btn btn-success">Submit Review</button>
      </form>
    </div>
  );
};

export default Review;

