
import React from "react";
import { Routes, Route } from "react-router-dom";
import Splash from "./components/Splash";
import Providers from "./components/Providers";
import ProtectedRoute from "./components/ProtectedRoute";
import ProviderRegister from "./components/ProviderRegister";



import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import Review from "./components/Review";
import Role from "./components/Role";
import BookService from "./components/BookService";
import AdminDashboard from "./components/AdminDashboard";
import Admin from "./components/Admin";



function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role" element={<Role />} />
        

        <Route path="/about" element={<About />} />
        <Route path="/review" element={<Review />} />
        {/* <Route
              path="/providers"
              element={
                <ProtectedRoute>
                  <Providers />
                </ProtectedRoute>
              }
/> */}
{/* <Route path="/provider-register" element={<ProviderRegister />} />



<Route path="/providers/:serviceType" element={<Providers />} /> */}




<Route
  path="/providers/:serviceType"
  element={
    <ProtectedRoute>
      <Providers />
    </ProtectedRoute>
  }
/>

<Route
  path="/provider-register"
  element={
    <ProtectedRoute>
      <ProviderRegister />
    </ProtectedRoute>
  }
/>
 <Route path="/book" element={<BookService />} />
 
 
 <Route path="/admin-dashboard" element={<AdminDashboard />} />







        
      </Routes>
    </>
  );
}

export default App;