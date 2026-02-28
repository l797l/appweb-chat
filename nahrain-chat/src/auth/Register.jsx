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

    if (!firstName || !lastName || !UserName || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setErrorMessage("Password must contain at least one uppercase letter, one lowercase letter, and one digit.");
      return;
    }

    try {
      setErrorMessage("");
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
      const serverError = error.response?.data;
      setErrorMessage(
         serverError ||
          "An error occurred during registration. Please try again.",
      );
    }
  }

  return (
    <div className="Body-Register">
       <div className="box-input-body">
          <p className={firstName ? "" : "isEmpty"}>First Name</p>
          <input
          type="FirstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
         />
      </div>
      <div className="box-input-body">
        <p className={lastName ? "" : "isEmpty"}>Last Name</p>
      <input
        type="LastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      </div>
      <div className="box-input-body">
        <p className={UserName ? "" : "isEmpty"}>User Name</p>
      <input
        type="UserName"
        value={UserName}
        onChange={(e) => setUserName(e.target.value)}
      />
      </div>
      <div className="box-input-body">
        <p className={email ? "" : "isEmpty"}>Email</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>
      <div className="box-input-body">
        <p className={password ? "" : "isEmpty"}>Password</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      <p className="message-error">{errorMessage}</p>
      <button className="register-button" onClick={handleRegister}>
        Register
      </button>
      <Link className="login-link" to="/Login">
        Login
      </Link>
    </div>
  );
}
