import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

const Login = ({ setIsAuthenticated }) => {
  const LOGIN_URL = "http://0.0.0.0:8080/login/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async (entity) => {
    entity.preventDefault();
    axios
      .post(LOGIN_URL, { username, password })
      .then((response) => {
        const accessToken = {
          access_token: `Basic ${response.data.access_token}`,
        };
        window.localStorage.setItem("accessToken", JSON.stringify(accessToken));

        setUserLog(accessToken);
        setIsAuthenticated(true);

        history.push("/home");
      })
      .catch((error) => {
        alert(error.response.data.detail);
      });
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <h2>Sign In to the system</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(entity) => setUsername(entity.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(entity) => setPassword(entity.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
