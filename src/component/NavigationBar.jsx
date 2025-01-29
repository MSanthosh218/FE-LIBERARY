import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand">
          Liberary App {/* Link to Home or Dashboard */}
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-button">
            Login
          </Link>
          <Link to="/register" className="nav-button">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
