import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./style/Register.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const response = await api.post("User/Register", {
        firstName,
        lastName,
        UserName,
        email,
        password,
      });
      if (response.status < 300) {
        navigate("/Login");
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred during registration. Please try again.",
      );
    }
  }

  return (
    <div className="Body-Register">
      <input
        type="FirstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Enter first Name"
      />
      <input
        type="LastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Enter last Name"
      />
      <input
        type="UserName"
        value={UserName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter user Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <p className="errorMessage">{errorMessage}</p>
      <button className="register-button" onClick={handleRegister}>
        Register
      </button>
      <Link className="login-link" to="/Login">
        Login
      </Link>
    </div>
  );
}
