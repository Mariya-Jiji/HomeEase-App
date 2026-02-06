
/*const About = () => {
  return (
    <div
      style={{
        backgroundColor: "#f0f4f8",   // soft light background
        minHeight: "100vh",
        paddingTop: "30px",
        paddingBottom: "30px"
      }}
    >
      <div className="container">
        <h2 className="text-center fw-bold">About HomeEase</h2>

        <p className="text-center mt-3 text-muted">
          <strong>HomeEase</strong> is a home service management application that
          helps users easily find reliable service professionals.
        </p>

        <h5 className="mt-4">What We Do</h5>
        <p>
          HomeEase connects users with skilled plumbers, electricians,
          mechanics, and other home service professionals through a single
          digital platform.
        </p>

        <h5 className="mt-4">Why HomeEase?</h5>
        <ul>
          <li>Easy and fast service booking</li>
          <li>Verified service providers</li>
          <li>Location-based service matching</li>
          <li>Secure and user-friendly interface</li>
        </ul>

        <h5 className="mt-4">Our Mission</h5>
        <p>
          To simplify household services while creating digital employment
          opportunities and promoting smart living.
        </p>

        <p className="text-center fst-italic mt-4 text-secondary">
          HomeEase – Making Home Services Easy
        </p>
      </div>
    </div>
  );
};

export default About;

const About = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg p-4 border-0">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">About HomeEase</h2>
          <p className="text-muted">
            Making household services simple, fast, and reliable
          </p>
        </div>

        <p className="text-center fs-5">
          <strong className="text-success">HomeEase</strong> is a smart home
          service management application that helps users easily find reliable
          and trusted service professionals.
        </p>

        <hr />

        <h5 className="mt-4 text-info">What We Do</h5>
        <p>
          HomeEase connects users with skilled plumbers, electricians, mechanics,
          and delivery service providers through a single digital platform,
          ensuring quick access to essential services.
        </p>

        <h5 className="mt-4 text-warning">Why HomeEase?</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">✔ Easy and fast service booking</li>
          <li className="list-group-item">✔ Verified service providers</li>
          <li className="list-group-item">✔ Location-based service matching</li>
          <li className="list-group-item">✔ Secure and transparent payments</li>
        </ul>

        <h5 className="mt-4 text-danger">Our Mission</h5>
        <p>
          To simplify household services while creating digital employment
          opportunities and promoting smart and sustainable living.
        </p>

        <div className="text-center mt-4">
          <span className="badge bg-primary fs-6 p-2">
            HomeEase – Making Home Services Easy
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
*/const About = () => {
  return (
    <div className="container-fluid p-0">

      {/* Header Section */}
      <div
        className="text-white text-center py-5"
        style={{
          background: "linear-gradient(135deg, #0d6efd, #6f42c1)",
        }}
      >
        <h1 className="fw-bold">HomeEase</h1>
        <p className="fs-5">Your Trusted Home Service Platform</p>
      </div>

      {/* Content Section */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-10">

            {/* About Card */}
            <div className="card shadow border-0 p-4 mb-4">
              <h3 className="text-center text-primary mb-3">About Us</h3>
              <p className="text-center fs-5">
                <strong>HomeEase</strong> is a smart home service management
                application designed to help users easily connect with trusted
                and skilled service professionals through a single digital
                platform.
              </p>
            </div>

            {/* Features */}
            <div className="row text-center mb-4">
              <div className="col-md-3 mb-3">
                <div className="card h-100 shadow-sm border-0 p-3">
                  <h6 className="fw-bold text-primary">Multiple Services</h6>
                  <p className="text-muted small">
                    Access plumbing, electrical, mechanical and delivery services
                    from one unified platform.
                  </p>
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className="card h-100 shadow-sm border-0 p-3">
                  <h6 className="fw-bold text-success">Verified Providers</h6>
                  <p className="text-muted small">
                    All service providers are verified to ensure quality and
                    reliability.
                  </p>
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className="card h-100 shadow-sm border-0 p-3">
                  <h6 className="fw-bold text-warning">Location Based</h6>
                  <p className="text-muted small">
                    Users can find nearby service professionals based on their
                    location.
                  </p>
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className="card h-100 shadow-sm border-0 p-3">
                  <h6 className="fw-bold text-danger">Secure Payments</h6>
                  <p className="text-muted small">
                    Digital payments ensure transparency and safety for both
                    users and providers.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Section */}
            <div className="card shadow border-0 p-4 mb-4">
              <h4 className="text-center text-secondary mb-3">Our Mission</h4>
              <p className="text-center fs-5">
                To simplify household service management using modern technology
                while creating employment opportunities and promoting smart and
                sustainable living.
              </p>
            </div>

            {/* Tagline */}
            <div className="text-center mt-4">
              <span className="badge bg-primary fs-6 px-4 py-2 shadow">
                HomeEase – Making Home Services Easy
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
