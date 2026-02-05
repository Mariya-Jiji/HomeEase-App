import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formType, setFormType] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // LOGIN
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful");

      navigate("/role"); // 👈 GO TO ROLE PAGE

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // REGISTER
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

  // RESET PASSWORD
  const handleReset = async () => {
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        newPassword: password,
      });

      alert("Password updated successfully");
      setFormType("login");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f0f4f8" }}>
      <div className="card shadow-lg" style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}>
        
        <div className="card-header text-center text-white fw-bold" style={{ backgroundColor: "#33a1e0" }}>
          {formType === "login" && "Login to HomeEase"}
          {formType === "register" && "Register for HomeEase"}
          {formType === "reset" && "Reset Password"}
        </div>

        <div className="card-body p-4">

          {formType === "login" && (
            <>
              <input className="form-control mb-3" type="email" placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)} />

              <input className="form-control mb-3" type="password" placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)} />

              <p className="text-primary text-end" style={{ cursor: "pointer" }}
                onClick={() => setFormType("reset")}>
                Forgot password?
              </p>

              <button className="btn w-100" style={{ backgroundColor: "#33a1e0", color: "#fff" }}
                onClick={handleLogin}>
                Login
              </button>

              <p className="text-center mt-3">
                New user?{" "}
                <span style={{ color: "#33a1e0", cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => setFormType("register")}>
                  Register
                </span>
              </p>
            </>
          )}

          {formType === "register" && (
            <>
              <input className="form-control mb-2" placeholder="Full Name"
                value={name} onChange={(e) => setName(e.target.value)} />

              <input className="form-control mb-2" placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)} />

              <input className="form-control mb-2" type="password" placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)} />

              <input className="form-control mb-3" type="password" placeholder="Confirm Password"
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

              <button className="btn w-100" style={{ backgroundColor: "#33a1e0", color: "#fff" }}
                onClick={handleRegister}>
                Register
              </button>

              <p className="text-center mt-3" style={{ cursor: "pointer", color: "#33a1e0" }}
                onClick={() => setFormType("login")}>
                Back to Login
              </p>
            </>
          )}

          {formType === "reset" && (
            <>
              <input className="form-control mb-2" placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)} />

              <input className="form-control mb-2" type="password" placeholder="New Password"
                value={password} onChange={(e) => setPassword(e.target.value)} />

              <input className="form-control mb-3" type="password" placeholder="Confirm Password"
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

              <button className="btn w-100" style={{ backgroundColor: "#33a1e0", color: "#fff" }}
                onClick={handleReset}>
                Reset Password
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;
