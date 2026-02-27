import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav style={{ padding: "15px", background: "#222", color: "white" }}>
      <Link to="/" style={{ color: "white", marginRight: "20px" }}>
        HomeEase
      </Link>

      {token ? (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </button>
      ) : (
        <Link to="/login" style={{ color: "white" }}>
          Login
        </Link>
      )}
    </nav>
  );
}

export default Navbar;