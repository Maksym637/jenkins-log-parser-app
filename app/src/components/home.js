import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/home.css";

const Home = ({ setIsAuthenticated }) => {
  const history = useHistory();

  const handleLogout = () => {
    window.localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    history.push("/login");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-left">
          <a href="/jenkins-histories" className="nav-link">
            Jenkins Histories
          </a>
        </div>
        <div className="nav-right">
          <a href="/" className="nav-link button" onClick={handleLogout}>
            Log Out
          </a>
          <div className="vertical-bar" />
          <a href="/profile" className="nav-link">
            Profile
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Home;
