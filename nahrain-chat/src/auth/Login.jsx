import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./style/Login.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("User/Login", { email, password });

      if (response.status < 300) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("fullName", response.data.fullName);

        navigate("/Chat");
      } else {
        setErrorMessage(response.data);
      }
    } catch (error) {
      setErrorMessage(
        error.response.data
      );
    }
  };

  return (
    <div className="Body-Login">
      <input
        type="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter the email"
      />
      <input
        type="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter the password"
      />
      <p>{errorMessage}</p>
      <button onClick={handleLogin}>Login</button>
      <Link className="register-link" to="/Register">
        Register
      </Link>
    </div>
  );
}
