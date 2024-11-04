import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/profile.css";

const Profile = ({ setIsAuthenticated }) => {
  const PROFILE_URL = "http://0.0.0.0:8080/users/me";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(PROFILE_URL, {
        headers: {
          Authorization: JSON.parse(window.localStorage.getItem("accessToken"))
            .access_token,
        },
      })
      .then((response) => {
        setCurrentUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
      });
  }, [refresh]);

  const handleUpdate = async (event) => {
    const accessToken = JSON.parse(window.localStorage.getItem("accessToken"));

    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .put(
        PROFILE_URL,
        { username, email, password, is_active: true },
        { headers: { Authorization: accessToken.access_token } }
      )
      .then((response) => {
        const newAccessToken = {
          access_token: `Basic ${response.data.hashed_credentials}`,
        };

        if (accessToken.access_token !== newAccessToken.access_token) {
          window.localStorage.removeItem("accessToken");
          setIsAuthenticated(false);

          alert("Profile updated. Please sign in again");

          history.push("/login");
        } else {
          alert("Profile updated");
          setRefresh((prev) => !prev);
        }
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
    <div>
      <h2 className="profile-h2">Personal Infomation</h2>
      <div className="home-link" onClick={() => history.push("/home")}>
        <h2>Home</h2>
      </div>
      <div className="profile-info">
        <span>({currentUser.username}, </span>
        <span />
        <span>{currentUser.email})</span>
      </div>
      <div className="profile-line" />
      <div className="profile-container">
        <form className="profile-form" onSubmit={handleUpdate}>
          <div className="profile-form-column">
            <input
              type="text"
              onChange={(entity) => setUsername(entity.target.value)}
              placeholder="Username"
              required
              className="profile-input"
            />
            <input
              type="email"
              onChange={(entity) => setEmail(entity.target.value)}
              placeholder="Email"
              required
              className="profile-input"
            />
          </div>
          <div className="profile-form-column">
            <input
              type="password"
              onChange={(entity) => setPassword(entity.target.value)}
              placeholder="Password"
              className="profile-input"
            />
            <input
              type="password"
              onChange={(entity) => setConfirmPassword(entity.target.value)}
              placeholder="Confirm Password"
              className="profile-input"
            />
          </div>
          <div className="button-container">
            <button className="profile-button" type="submit">
              Update personal data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
