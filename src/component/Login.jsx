import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Correct import

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Hook to navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("token", data.token);
      data.role === "admin" ? navigate("/admin") : navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.response ? err.response.data.error : err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
