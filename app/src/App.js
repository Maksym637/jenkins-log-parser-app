import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import "./styles/global.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

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
        <Route path="/home">
          {isAuthenticated ? (
            <Home setIsAuthenticated={setIsAuthenticated} />
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
