import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formType, setFormType] = useState("login"); // login, reset, register

  // Common fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      alert("Login successful");
      navigate("/providers"); // protected page
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // ================= REGISTER =================
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful. Please login.");
      setFormType("login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // ================= RESET (UI ONLY) =================
  const handleReset = () => {
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    alert("Password reset feature UI added (backend can be added later)");
    setFormType("login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f0f4f8" }}
    >
      <div
        className="card shadow-lg"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}
      >
        {/* Header */}
        <div
          className="card-header text-center text-white fw-bold"
          style={{
            backgroundColor: "#33a1e0",
            fontSize: "1.2rem",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        >
          {formType === "login" && "Login to HomeEase"}
          {formType === "reset" && "Reset Password"}
          {formType === "register" && "Register for HomeEase"}
        </div>

        <div className="card-body p-4">
          {/* ========== LOGIN ========== */}
          {formType === "login" && (
            <>
              <div className="mb-3">
                <label className="form-label fw-bold">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setFormType("reset")}
                >
                  Forgot password?
                </span>
              </div>

              <button
                className="btn"
                style={{ backgroundColor: "#33a1e0", color: "#fff", width: "100%" }}
                onClick={handleLogin}
              >
                Login
              </button>

              <p className="text-center mt-3 mb-0">
                New user?{" "}
                <span
                  className="fw-bold"
                  style={{ color: "#33a1e0", cursor: "pointer" }}
                  onClick={() => setFormType("register")}
                >
                  Register
                </span>
              </p>
            </>
          )}

          {/* ========== RESET PASSWORD (UI) ========== */}
          {formType === "reset" && (
            <>
              <div className="mb-3">
                <label className="form-label fw-bold">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                className="btn"
                style={{ backgroundColor: "#33a1e0", color: "#fff", width: "100%" }}
                onClick={handleReset}
              >
                Reset Password
              </button>

              <p
                className="text-center mt-3 mb-0"
                style={{ cursor: "pointer", color: "#33a1e0" }}
                onClick={() => setFormType("login")}
              >
                Back to Login
              </p>
            </>
          )}

          {/* ========== REGISTER ========== */}
          {formType === "register" && (
            <>
              <div className="mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                className="btn"
                style={{ backgroundColor: "#33a1e0", color: "#fff", width: "100%" }}
                onClick={handleRegister}
              >
                Register
              </button>

              <p
                className="text-center mt-3 mb-0"
                style={{ cursor: "pointer", color: "#33a1e0" }}
                onClick={() => setFormType("login")}
              >
                Back to Login
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
