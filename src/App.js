import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Splash from "./components/Splash";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import Review from "./components/Review";
import Role from "./components/Role";
import Providers from "./components/Providers";
import Customer from "./components/Customer";
import Admin from "./components/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import Booking from "./components/Booking";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/review" element={<Review />} />

        {/* Role page – ONLY after login */}
        <Route
          path="/role"
          element={
            <ProtectedRoute>
              <Role />
            </ProtectedRoute>
          }
        />

        <Route
          path="/providers"
          element={
            <ProtectedRoute>
              <Providers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer"
          element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/customer"
  element={
    <ProtectedRoute>
      <Customer />
    </ProtectedRoute>
  }
/>

<Route
  path="/booking"
  element={
    <ProtectedRoute>
      <Booking />
    </ProtectedRoute>
  }
/>


      </Routes>
    </>
  



  );
}

export default App;

