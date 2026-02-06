import React from "react";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Customer Dashboard</h2>
      <p>Welcome, Customer 👤</p>

      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate("/booking")}
      >
        Book Service
      </button>
    </div>
  );
};

export default Customer;
