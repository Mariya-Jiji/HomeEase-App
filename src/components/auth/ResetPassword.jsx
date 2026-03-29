
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const phone = localStorage.getItem("resetPhone");

  const handleReset = async () => {
    await axios.post("http://localhost:5000/api/auth/reset-password", {
      phone,
      otp,
      newPassword
    });

    alert("Password reset successful");
    navigate("/");
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <input
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />

      <input
        placeholder="New Password"
        type="password"
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
}

export default ResetPassword;