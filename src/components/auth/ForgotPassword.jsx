
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/api/auth/forgot-password", {
      phone
    });

    localStorage.setItem("resetPhone", phone);
    navigate("/reset-password");
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        placeholder="Enter phone"
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSubmit}>Send OTP</button>
    </div>
  );
}

export default ForgotPassword;