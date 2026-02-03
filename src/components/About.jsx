const About = () => {
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
