import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BookService = () => {
  const { state: provider } = useLocation();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  
  const [customerEmail, setCustomerEmail] = useState("");
const [problemDescription, setProblemDescription] = useState("");





  const handleBook = async (providerId) => {
  console.log("EMAIL:", customerEmail);
  console.log("PROBLEM:", problemDescription);
  console.log("PROVIDER:", providerId);

  try {
    await axios.post("http://localhost:5000/api/bookings", {
      providerId,
      customerEmail,
      problemDescription,
      date,
      time,
    });

    alert("Booking successful");
  } catch (err) {
    console.log("BOOKING ERROR:", err.response?.data);
    alert("Booking failed");
  }
};



  return (
    <div className="container mt-5">
      <h4>Book Service with {provider.name}</h4>

      <input
        type="date"
        className="form-control mt-3"
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="time"
        className="form-control mt-3"
        onChange={(e) => setTime(e.target.value)}
      />
      <div className="mb-2">
  <label>Describe your problem</label>
  <textarea
    className="form-control"
    rows="3"
    value={problemDescription}
    onChange={(e) => setProblemDescription(e.target.value)}
    placeholder="Explain the issue..."
  />
</div>

  <div className="mb-2">
  <label>Email</label>
  <input
    type="email"
    className="form-control"
    value={customerEmail}
    onChange={(e) => setCustomerEmail(e.target.value)}
    placeholder="Enter your email"
  />
</div>


      <button
  className="btn btn-success mt-3"
  onClick={() => handleBook(provider._id)}
>
  Confirm Booking
</button>

     
    </div>
  );
};

export default BookService;
