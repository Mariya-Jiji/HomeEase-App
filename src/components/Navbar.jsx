
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
  className="navbar navbar-expand-lg navbar-dark"
  style={{ backgroundColor: "#33a1e0" }}
>
      <div className="container">

        <Link className="navbar-brand fw-bold text-black" to="/">
          HomeEase
        </Link>

        <div className="ms-auto d-flex gap-3">
            <Link className="nav-link text-black" to="/">
            </Link>

          <Link className="nav-link text-black" to="/home">
            Home
          </Link>
          <Link className="nav-link text-black" to="/login">
            Login
          </Link>
          <Link className="nav-link text-black" to="/about">
            About
          </Link>
          <Link className="nav-link text-black" to="/review">
            Reviews
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
