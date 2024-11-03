import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";

const Register = ({ setIsAuthenticated }) => {
  const REGISTER_URL = "http://0.0.0.0:8080/users";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userLog, setUserLog] = useState(
    JSON.parse(window.localStorage.getItem("accessToken")) || ""
  );
  const history = useHistory();

  useEffect(() => {
    if (userLog) {
      setIsAuthenticated(true);
      history.push("/home");
    }
  }, [userLog, setIsAuthenticated, history]);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post(REGISTER_URL, { username, email, password, is_active: true })
      .then((response) => {
        const accessToken = {
          access_token: `Basic ${response.data.hashed_credentials}`,
        };
        window.localStorage.setItem("accessToken", JSON.stringify(accessToken));
        window.localStorage.setItem("isAuthenticated", "true");
  
        setUserLog(accessToken);
        setIsAuthenticated(true);

        alert("You are successfully registered to the system");

        history.push("/home");
      })
      .catch((error) => {
        const responseData = error.response.data.detail;
        if (Array.isArray(responseData)) {
          alert(responseData[0].msg);
        } else {
          alert(responseData);
        }
      });
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <h2>Register to the system</h2>
        <div className="register-line"></div>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            className="register-input"
            value={username}
            onChange={(entity) => setUsername(entity.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="email"
            className="register-input"
            value={email}
            onChange={(entity) => setEmail(entity.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="register-input"
            value={password}
            onChange={(entity) => setPassword(entity.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="password"
            className="register-input"
            value={confirmPassword}
            onChange={(entity) => setConfirmPassword(entity.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button type="submit" className="register-button">
            Register
          </button>
          <div className="login-redirection">
            <a href="/login">Sign in here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
