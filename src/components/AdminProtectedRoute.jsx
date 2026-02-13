import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const adminAuth = localStorage.getItem("adminAuth") === "true";
  return adminAuth ? children : <Navigate to="/admin-login" />;
};

export default AdminProtectedRoute;
