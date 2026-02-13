import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // frontend-only login
    if (email === "admin@homeease.com" && password === "irmaneni123") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin-dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin} style={{ maxWidth: 400 }}>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Admin Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-dark w-100">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
