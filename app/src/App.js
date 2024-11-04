import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Register from "./components/register";
import Profile from "./components/profile";
import JenkinsHistory from "./components/jenkins-history";
import "./styles/global.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(window.localStorage.getItem("accessToken"))
  );

  useEffect(() => {
    if (isAuthenticated) {
      window.localStorage.setItem("isAuthenticated", "true");
    } else {
      window.localStorage.removeItem("isAuthenticated");
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {isAuthenticated ? (
            <Redirect to="/home" />
          ) : (
            <Login setIsAuthenticated={setIsAuthenticated} />
          )}
        </Route>
        <Route path="/register">
          {isAuthenticated ? (
            <Redirect to="/home" />
          ) : (
            <Register setIsAuthenticated={setIsAuthenticated} />
          )}
        </Route>
        <Route path="/home">
          {isAuthenticated ? (
            <Home setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/profile">
          {isAuthenticated ? (
            <Profile setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/jenkins-histories">
          {isAuthenticated ? (
            <JenkinsHistory setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
