
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const phone = localStorage.getItem("tempPhone");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          phone,
          otp
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "customer") {
        navigate("/customer-dashboard");
      } else if (res.data.role === "provider") {
        navigate("/provider-dashboard");
      } else if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={handleVerify}>
        Verify
      </button>
    </div>
  );
}

export default VerifyOtp;



