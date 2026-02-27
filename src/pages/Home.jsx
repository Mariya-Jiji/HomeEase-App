import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import logo from "../assets/homeease-logo.jpeg";

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>

      {/* 🔥 Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-center px-6">

        <img
          src={logo}
          alt="HomeEase Logo"
          className="w-40 mb-6 drop-shadow-lg"
        />

        <p className="text-2xl mb-10 italic">
          We are here to serve you
        </p>

        <a
          href="#services"
          className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
        >
          Explore Services ↓
        </a>

      </section>

      {/* 🛠 Services Section */}
      <section
        id="services"
        className="min-h-screen bg-gray-100 py-20 px-10"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Services
        </h2>

        {services.length === 0 ? (
          <p className="text-center text-gray-500">
            No services available
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

export default Home;