import React from "react";
import { useHistory, Link } from "react-router-dom";
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
          <Link to="/jenkins-histories" className="nav-link">
            Jenkins Histories
          </Link>
        </div>
        <div className="nav-right">
          <a href="/" className="nav-link button" onClick={handleLogout}>
            Log Out
          </a>
          <div className="vertical-bar" />
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Home;
