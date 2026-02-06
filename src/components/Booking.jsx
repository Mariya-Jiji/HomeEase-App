import React, { useState } from "react";
import axios from "axios";

const Booking = () => {
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("online");
  const [complaint, setComplaint] = useState("");
const [serviceDate, setServiceDate] = useState("");
const [serviceTime, setServiceTime] = useState("");



  // userId must already be saved during login
  const userId = localStorage.getItem("userId");

  const handleBooking = async () => {
    if (!service || !complaint || !serviceDate || !serviceTime || !amount) 
 {
      alert("Please fill all fields");
      return;
    }

    try {
     await axios.post("http://localhost:5000/api/bookings", {
  customerId: userId,
  serviceType: service,
  complaint,
  serviceDate,
  serviceTime,
  amount,
  paymentMode
});


      alert("Booking created successfully");

      // reset form
      setService("");
      setAmount("");
      setPaymentMode("online");

    } catch (error) {
      console.error(error);
      alert("Booking failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Create Booking</h3>

      <div className="mb-3">
        <label>Service</label>
        <input
          type="text"
          className="form-control"
          placeholder="AC Repair / Plumbing"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Amount</label>
        <input
          type="number"
          className="form-control"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

    <div className="mb-3">
  <label>Complaint</label>
  <textarea
    className="form-control"
    placeholder="Describe the issue"
    value={complaint}
    onChange={(e) => setComplaint(e.target.value)}
  />
</div>

<div className="mb-3">
  <label>Service Date</label>
  <input
    type="date"
    className="form-control"
    value={serviceDate}
    onChange={(e) => setServiceDate(e.target.value)}
  />
</div>

<div className="mb-3">
  <label>Service Time</label>
  <input
    type="time"
    className="form-control"
    value={serviceTime}
    onChange={(e) => setServiceTime(e.target.value)}
  />
</div>



      <div className="mb-3">
        <label>Payment Mode</label>
        <select
          className="form-control"
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
        >
          <option value="online">Online</option>
          <option value="cash">Cash</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleBooking}>
        Book Service
      </button>
    </div>
  );
};

export default Booking;
