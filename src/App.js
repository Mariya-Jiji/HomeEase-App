
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CustomerDashboard from "./components/dashboard/CustomerDashboard";
import ProviderDashboard from "./components/dashboard/ProviderDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import ProtectedRoute from "./components/layout/ProtectedRoute";

import ForgotPassword from "./components/auth/ForgotPassword";
import VerifyOtp from "./components/auth/VerifyOtp";
import ResetPassword from "./components/auth/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/customer"
        element={
          <ProtectedRoute allowedRole="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/provider"
        element={
          <ProtectedRoute allowedRole="provider">
            <ProviderDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-otp" element={<VerifyOtp />} />
<Route path="/customer-dashboard" element={<CustomerDashboard />} />
<Route path="/provider-dashboard" element={<ProviderDashboard />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />
<Route path ="/forgot-password" element={<ForgotPassword />} />

<Route path ="/reset-password" element={<ResetPassword/>} />
    </Routes>
  );
}

export default App;