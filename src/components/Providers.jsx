
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Providers = () => {
  const { serviceType } = useParams();
  const navigate = useNavigate();

  console.log("ServiceType from URL:", serviceType); // ✅ DEBUG HERE

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          "http://localhost:5000/api/providers",
          {
            params: { category: serviceType },
          }
        );

        console.log("Providers API response:", res.data); // ✅ VERY IMPORTANT

        setProviders(res.data);
      } catch (err) {
        console.error("Error fetching providers:", err);
        setError("Failed to load providers");
      } finally {
        setLoading(false); // ✅ THIS WAS LIKELY MISSING
      }
    };

    fetchProviders();
  }, [serviceType]); // ✅ MUST depend on serviceType

  // ===== UI STATES =====
  if (loading) {
    return <h4 className="text-center mt-5">Loading providers...</h4>;
  }

  if (error) {
    return <h4 className="text-center mt-5 text-danger">{error}</h4>;
  }

  if (providers.length === 0) {
    return (
      <h4 className="text-center mt-5">
        No providers found for {serviceType}
      </h4>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">
        {serviceType} Service Providers
      </h3>

      <div className="row">
        {providers.map((provider) => (
          <div className="col-md-4 mb-3" key={provider._id}>
            <div className="card shadow-sm p-3">
              <h5>{provider.name}</h5>
              <p>📞 {provider.phone}</p>
              <p>🔧 {provider.serviceType}</p>
              <p>📍 {provider.location}</p>
              <button
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => navigate("/book", { state: provider })}
                >
                  Book Service
                </button>

              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Providers;
