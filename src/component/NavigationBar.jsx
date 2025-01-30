import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
        borderBottom: "4px solid #2ecc71",
        color: "#333",
        padding: "15px 20px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        zIndex: "50",
      }}
    >
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>Library App</div>

      <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "#2c3e50",
            padding: "8px 15px",
            borderRadius: "5px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            marginRight: "15px",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#34495e")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2c3e50")}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "#2c3e50",
            padding: "8px 15px",
            borderRadius: "5px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            marginRight: "25px",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#34495e")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2c3e50")}
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
