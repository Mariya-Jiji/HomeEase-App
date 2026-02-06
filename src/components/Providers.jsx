
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Providers = () => {
  const { serviceType } = useParams();
  const navigate = useNavigate();

  const [providers, setProviders] = useState([]);
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get("http://localhost:5000/api/providers", {
          params: { category: serviceType },
        });

        setProviders(res.data);

        res.data.forEach((p) => fetchReviews(p._id));
      } catch (err) {
        console.error("Error fetching providers:", err);
        setError("Failed to load providers");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [serviceType]);

  const fetchReviews = async (providerId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/reviews/${providerId}`
      );

      setReviews((prev) => ({
        ...prev,
        [providerId]: res.data,
      }));
    } catch (err) {
      console.log("Error fetching reviews:", err);
    }
  };

  // DELETE review
  const deleteReview = async (reviewId, providerId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`);
      fetchReviews(providerId); // refresh after delete
    } catch (err) {
      alert("Failed to delete review");
    }
  };

  if (loading) return <h4 className="text-center mt-5">Loading providers...</h4>;
  if (error) return <h4 className="text-center mt-5 text-danger">{error}</h4>;

  if (providers.length === 0) {
    return (
      <h4 className="text-center mt-5">
        No providers found for {serviceType}
      </h4>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4 text-primary">
        {serviceType} Service Providers
      </h3>

      <div className="row">
        {providers.map((provider) => (
          <div className="col-md-4 mb-4" key={provider._id}>
            <div className="card h-100 shadow border-0">
              <div className="card-body">
                <h5 className="fw-bold">{provider.name}</h5>

                <p className="mb-1">
                  <strong>Service:</strong>{" "}
                  <span className="badge bg-info text-dark">
                    {provider.serviceType}
                  </span>
                </p>

                <p className="mb-1">
                  <strong>Location:</strong> {provider.location}
                </p>

                <p className="mb-2">
                  <strong>Contact:</strong> {provider.phone}
                </p>

                <hr />
                <h6 className="text-secondary">Customer Reviews</h6>

                {reviews[provider._id]?.length === 0 ? (
                  <p className="text-muted">No reviews yet</p>
                ) : (
                  reviews[provider._id]?.map((r) => (
                    <div
                      key={r._id}
                      className="p-2 mb-2 rounded"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <strong>{r.userName}</strong>
                        <span className="text-warning">
                          {"⭐".repeat(r.rating)}
                        </span>
                      </div>

                      <p className="mb-1 small">{r.comment}</p>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          deleteReview(r._id, provider._id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="card-footer bg-white border-0">
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => navigate("/book", { state: provider })}
                >
                  Book Service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Providers;
