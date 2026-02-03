
import React from "react";
import { Routes, Route } from "react-router-dom";
import Splash from "./components/Splash";
import Providers from "./components/Providers";
import ProtectedRoute from "./components/ProtectedRoute";


import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import About from "./components/About";
import Review from "./components/Review";


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
        <Route
              path="/providers"
              element={
                <ProtectedRoute>
                  <Providers />
                </ProtectedRoute>
              }
/>

        
      </Routes>
    </>
  );
}

export default App;