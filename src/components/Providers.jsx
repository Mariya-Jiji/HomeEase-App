import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const serviceType = queryParams.get("serviceType");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        let url = "http://localhost:5000/api/providers";
        if (serviceType) {
          url += `?serviceType=${serviceType}`;
        }

        const res = await axios.get(url);
        setProviders(res.data);
      } catch (err) {
        alert("Failed to load providers");
      }
    };

    fetchProviders();
  }, [serviceType]);

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">
        {serviceType ? `${serviceType} Service Providers` : "All Providers"}
      </h4>

      {providers.length === 0 && (
        <p className="text-center text-muted">No providers found.</p>
      )}

      {providers.map((p) => (
        <div key={p._id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{p.name}</h5>
            <p className="mb-1"><strong>Service:</strong> {p.serviceType}</p>
            <p className="mb-1"><strong>Phone:</strong> {p.phone}</p>
            <p className="mb-1"><strong>Location:</strong> {p.location}</p>
            <button className="btn btn-sm btn-outline-primary mt-2">
              Contact Provider
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Providers;
