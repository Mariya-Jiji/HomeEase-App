
import React from "react";
import { useNavigate } from "react-router-dom";
import electricalImg from "../assets/services/electrical.jpeg";
import plumbingImg from "../assets/services/plumbing.jpeg";
import acImg from "../assets/services/ac.jpeg";
import mechanicalImg from "../assets/services/mechanical.jpeg";

const services = [
  { name: "Electrical", img: electricalImg, color: "#FFD700" },
  { name: "Plumbing", img: plumbingImg, color: "#00BFFF" },
  { name: "AC", img: acImg, color: "#FF8C00" },
  { name: "Mechanical", img: mechanicalImg, color: "#32CD32" },
];

const Home = () => {
  const navigate = useNavigate();

  const handleViewProviders = () => {
    navigate("/login"); // redirect to login page
  };
  const goToProviders = (serviceType) => {
  navigate(`/providers/${serviceType}`);
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
                              
                 <button
                className="btn btn-dark btn-sm mt-2"
                // onClick={() =>
                //   navigate(`/providers/${service.key}`)
                // }
                // onClick={() => goToProviders(service.name.split(" ")[0])}
                 onClick={() => navigate(`/providers/${service.name}`)}
                 


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

