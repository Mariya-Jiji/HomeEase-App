
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homeEaseLogo from "../assets/homeease-logo.jpeg";

const Splash = () => {
  const navigate = useNavigate();

  // Redirect after scroll
  useEffect(() => {
    const handleScroll = () => {
      navigate("/home"); // redirect to Home
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigate]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#33a1e0", overflowY: "scroll" }}
    >
      <img
        src={homeEaseLogo}
        alt="HomeEase Logo"
        style={{ width: "1450px", height: "750px", marginBottom: "20px" }}
      />
      
      <p className="text-white mt-3">Scroll down to continue</p>
    </div>
  );
};

export default Splash;
