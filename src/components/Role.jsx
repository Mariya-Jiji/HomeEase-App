import React from "react";
import { useNavigate } from "react-router-dom";

const Role = () => {
  const navigate = useNavigate();

  const selectRole = (role) => {
    localStorage.setItem("role", role);

    if (role === "customer") navigate("/customer");
    if (role === "provider") navigate("/providers");
    if (role === "admin") navigate("/admin-dashboard");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f5f7fa" }}
    >
      <div className="text-center">
        <h2 className="mb-4 fw-bold">Select Your Role</h2>

        <div className="row g-4">
          <div className="col">
            <div
              className="card shadow p-4"
              style={{ cursor: "pointer", minWidth: "200px" }}
              onClick={() => selectRole("customer")}
            >
              <h4>👤 Customer</h4>
              <p className="text-muted">Book services</p>
            </div>
          </div>

          <div className="col">
            <div
              className="card shadow p-4"
              style={{ cursor: "pointer", minWidth: "200px" }}
              onClick={() => selectRole("provider")}
            >
              <h4>🛠 Provider</h4>
              <p className="text-muted">Offer services</p>
            </div>
          </div>

          <div className="col">
            <div
              className="card shadow p-4"
              style={{ cursor: "pointer", minWidth: "200px" }}
              onClick={() => selectRole("admin")}
            >
              <h4>⚙ Admin</h4>
              <p className="text-muted">Manage system</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;
