import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const role = localStorage.getItem("role");

  // ---------------- STATES ----------------
  const [stats, setStats] = useState({
    customers: 0,
    providers: 0,
    bookingsToday: 0,
    revenueToday: 0,
    services: [],
    payments: { online: 0, cash: 0 }
  });

  const [reviews, setReviews] = useState([]);

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    fetchStats();
    fetchReviews();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/review-stats");
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- GROUP REVIEWS ----------------
  const groupReviews = (data) => {
    const result = {};

    data.forEach(item => {
      const service = item._id.service;
      const rating = item._id.rating;

      if (!result[service]) result[service] = {};
      result[service][rating] = item.count;
    });

    return result;
  };

  const grouped = groupReviews(reviews);

  // ---------------- UI ----------------
  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Administrator Dashboard</h2>
        <span className="badge bg-warning text-dark fs-6">
          {role?.toUpperCase()}
        </span>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row mb-4">
        <Card title="Total Customers" value={stats.customers} />
        <Card title="Total Providers" value={stats.providers} />
        <Card title="Bookings Today" value={stats.bookingsToday} />
        <Card title="Revenue Today" value={`₹ ${stats.revenueToday}`} />
      </div>

      {/* SERVICE USAGE */}
      <div className="card shadow p-4 mb-4">
        <h4 className="mb-3">Service Usage</h4>
        <ul className="list-group">
          {stats.services.map((service, index) => (
            <li key={index} className="list-group-item">
              {service.name} – {service.count} bookings
            </li>
          ))}
        </ul>
      </div>

      {/* PAYMENT SUMMARY */}
      <div className="card shadow p-4 mb-4">
        <h4 className="mb-3">Payment Summary</h4>
        <p>Online Payments: ₹ {stats.payments.online}</p>
        <p>Cash Payments: ₹ {stats.payments.cash}</p>
      </div>

      {/* REVIEW ANALYTICS */}
      <div className="card shadow p-4">
        <h4 className="mb-3">Service Review Analytics</h4>

        {Object.entries(grouped).map(([service, ratings]) => (
          <div key={service} className="mb-4">

            <h6 className="fw-bold">{service}</h6>

            <div className="d-flex flex-wrap gap-2">
              <Badge rating={5} label="Very Good" count={ratings[5]} />
              <Badge rating={4} label="Good" count={ratings[4]} />
              <Badge rating={3} label="Average" count={ratings[3]} />
              <Badge rating={2} label="Bad" count={ratings[2]} />
              <Badge rating={1} label="Very Bad" count={ratings[1]} />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

// ---------------- REUSABLE COMPONENTS ----------------

const Card = ({ title, value }) => (
  <div className="col-md-3">
    <div className="card shadow p-3 text-center">
      <h5>{title}</h5>
      <h3 className="fw-bold">{value}</h3>
    </div>
  </div>
);

const Badge = ({ rating, label, count }) => (
  <span className="badge bg-secondary">
    {rating}⭐ {label} : {count || 0}
  </span>
);

export default AdminDashboard;