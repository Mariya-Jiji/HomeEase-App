
// import React, { useState } from "react";
// import axios from "axios";

// const ProviderRegister = () => {

//   const [name, setName] = useState("");
//   const [service, setService] = useState("");
//   const [phone, setPhone] = useState("");
//   const [location, setLocation] = useState("");

//   const handleSubmit = async () => {

//     if (!name || !service || !phone || !location) {
//       return alert("Please fill all fields");
//     }

//     try {
//       await axios.post("http://localhost:5000/api/providers", {
//         name,
//         service,
//         phone,
//         location
//       });

//       alert("Provider Registered Successfully");

//       // Clear form
//       setName("");
//       setService("");
//       setPhone("");
//       setLocation("");

//     } catch (error) {
//       alert("Error registering provider");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h3 className="text-center">Register as Service Provider</h3>

//       {/* Name */}
//       <input
//         className="form-control mt-3"
//         placeholder="Provider Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       {/* ⭐ DROPDOWN SERVICE TYPE */}
//       <select
//         className="form-control mt-3"
//         value={service}
//         onChange={(e) => setService(e.target.value)}
//       >
//         <option value="">Select Service Type</option>
//         <option value="Mechanical">Mechanical</option>
//         <option value="Electrical">Electrical</option>
//         <option value="Plumbing">Plumbing</option>
//         <option value="AC Mechanics">AC Mechanics</option>
//       </select>

//       {/* Phone */}
//       <input
//         className="form-control mt-3"
//         placeholder="Phone Number"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />

//       {/* Location */}
//       <input
//         className="form-control mt-3"
//         placeholder="Location"
//         value={location}
//         onChange={(e) => setLocation(e.target.value)}
//       />

//       <button
//         className="btn btn-primary mt-3 w-100"
//         onClick={handleSubmit}
//       >
//         Register Provider
//       </button>
//     </div>
//   );
// };

// export default ProviderRegister;




import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProviderRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    serviceType: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/providers", formData);

      alert("Provider registered successfully ✅");
      navigate("/providers"); // or navigate("/provider-dashboard") later
    } catch (err) {
      alert("Failed to register provider ❌");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-4 fw-bold">Provider Registration</h3>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              required
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label fw-bold">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              required
              onChange={handleChange}
            />
          </div>

          {/* Location */}
          <div className="mb-3">
            <label className="form-label fw-bold">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              required
              onChange={handleChange}
            />
          </div>

          {/* Service Type DROPDOWN */}
          <div className="mb-3">
            <label className="form-label fw-bold">Service Type</label>
            <select
              className="form-select"
              name="serviceType"
              required
              onChange={handleChange}
            >
              <option value="">Select Service</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Mechanical">Mechanical</option>
              <option value="AC">AC</option>
            </select>
          </div>

          {/* Experience */}
          <div className="mb-3">
            <label className="form-label fw-bold">Experience (Years)</label>
            <input
              type="number"
              className="form-control"
              name="experience"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register as Provider
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProviderRegister;

