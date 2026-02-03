/*import React from "react";
import electricalImg from "../assets/services/electrical.jpeg";
import plumbingImg from "../assets/services/plumbing.jpeg";
import acImg from "../assets/services/ac.jpeg";
import mechanicalImg from "../assets/services/mechanical.jpeg";

const services = [
  { name: "Electrical Service", img: electricalImg, color: "#FFD700" },
  { name: "Plumbing Service", img: plumbingImg, color: "#00BFFF" },
  { name: "AC Repair", img: acImg, color: "#FF8C00" },
  { name: "Mechanical Service", img: mechanicalImg, color: "#32CD32" },
];

const Home = () => {
  return (
    <div
      className="container mt-4 pb-4"
      style={{ backgroundColor: "#f0f4f8", minHeight: "100vh" }} // subtle light background
    >
      <h3 className="text-center fw-bold mb-2">Welcome to HomeEase</h3>
      <h6 className="text-center text-muted mb-4 ">
        Find trusted home service professionals near you
      </h6>

      <div className="row mt-2">
        {services.map((service, index) => (
          <div key={index} className="col-6 mb-3">
            <div
              className="card text-center shadow-sm"
              style={{
                backgroundColor: service.color,
                borderRadius: "12px",
                padding: "15px",
              }}
            >
              <div className="card-body d-flex flex-column align-items-center">
                <img
                  src={service.img}
                  alt={service.name}
                  style={{
                    width: "150px", // slightly bigger
                    height: "150px",
                    objectFit: "cover",
                    marginBottom: "12px",
                    borderRadius: "8px", // rounded corners
                  }}
                />
                <h6 className="card-title fw-bold">{service.name}</h6>
                <button className="btn btn-dark btn-sm mt-2">
                  View Providers
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;*/
import React from "react";
import { useNavigate } from "react-router-dom";
import electricalImg from "../assets/services/electrical.jpeg";
import plumbingImg from "../assets/services/plumbing.jpeg";
import acImg from "../assets/services/ac.jpeg";
import mechanicalImg from "../assets/services/mechanical.jpeg";

const services = [
  { name: "Electrical Service", img: electricalImg, color: "#FFD700" },
  { name: "Plumbing Service", img: plumbingImg, color: "#00BFFF" },
  { name: "AC Repair", img: acImg, color: "#FF8C00" },
  { name: "Mechanical Service", img: mechanicalImg, color: "#32CD32" },
];

const Home = () => {
  const navigate = useNavigate();

  const handleViewProviders = () => {
    navigate("/login"); // redirect to login page
  };

  return (
    <div
      className="container mt-4 pb-4"
      style={{ backgroundColor: "#f0f4f8", minHeight: "100vh" }}
    >
      <h3 className="text-center fw-bold mb-2">Welcome to HomeEase</h3>
      <p className="text-center text-muted mb-4">
        Find trusted home service professionals near you
      </p>

      <div className="row mt-2">
        {services.map((service, index) => (
          <div key={index} className="col-6 mb-3">
            <div
              className="card text-center shadow-sm"
              style={{
                backgroundColor: service.color,
                borderRadius: "12px",
                padding: "15px",
              }}
            >
              <div className="card-body d-flex flex-column align-items-center">
                <img
                  src={service.img}
                  alt={service.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginBottom: "12px",
                    borderRadius: "8px",
                  }}
                />
                <h6 className="card-title fw-bold">{service.name}</h6>
                
                {/* <button
                 className="btn btn-dark btn-sm mt-2"
                   onClick={() => navigate("/login")}
                  >
                  View Providers </button>*/}
                 
                 
                      

                      <button
                        className="btn btn-dark btn-sm mt-2"
                        onClick={() => navigate("/providers?serviceType=" + service.name.split(" ")[0])}
                      >
                        View Providers
                      </button>


              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

