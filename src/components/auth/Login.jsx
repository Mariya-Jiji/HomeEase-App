import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ phone: "", password: "" });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("/auth/login", data);

    console.log("LOGIN RESPONSE:", res.data);

    // 🔥 Always navigate if login successful
    navigate("/verify-otp");

    // Save phone temporarily
    localStorage.setItem("tempPhone", data.phone);

  } catch (err) {
    alert(err.response?.data?.message);
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Phone"
            onChange={(e)=>setData({...data,phone:e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e)=>setData({...data,password:e.target.value})}
            required
          />
          <button>Login</button>
        </form>
        <p className="link" onClick={()=>navigate("/forgot-password")}>
          Forgot Password?
        </p>
        <p className="link" onClick={()=>navigate("/register")}>
          Register
        </p>
      </div>
    </div>
  );
};

export default Login;