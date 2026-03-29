import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    phone: "",
    password: "",
    role: "customer"
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("/auth/register", data);
    alert("Registered Successfully");
    navigate("/");
  } catch (error) {
    console.log("FULL ERROR:", error.response);
    alert(error.response?.data?.message || "Registration Failed");
  }
};
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" onChange={(e)=>setData({...data,name:e.target.value})} required />
          <input placeholder="Phone" onChange={(e)=>setData({...data,phone:e.target.value})} required />
          <input type="password" placeholder="Password" onChange={(e)=>setData({...data,password:e.target.value})} required />

         <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "280px" }}>
  
  <label>Select Role</label>

  <select
    style={{
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "15px"
    }}
    onChange={(e) => setData({ ...data, role: e.target.value })}
  >
    <option value="customer">Customer</option>
    <option value="provider">Provider</option>
  </select>

  <button
    style={{
      padding: "12px",
      borderRadius: "8px",
      backgroundColor: "blue",
      color: "white",
      border: "none",
      cursor: "pointer"
    }}
  >
    Register
  </button>

</div>
        </form>
      </div>
    </div>
  );
};

export default Register;