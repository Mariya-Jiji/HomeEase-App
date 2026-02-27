import { useNavigate } from "react-router-dom";

function ServiceCard({ service }) {
  const navigate = useNavigate();

  const handleBooking = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/booking/${service._id}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        {service.name}
      </h3>

      <p className="text-emerald-600 font-bold mb-6">
        ₹ {service.price}
      </p>

      <button
        onClick={handleBooking}
        className="w-full bg-gray-800 text-white py-2 rounded-xl hover:bg-black transition"
      >
        Book Now
      </button>
    </div>
  );
}

export default ServiceCard;