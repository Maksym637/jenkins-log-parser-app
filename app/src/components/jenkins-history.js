import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/jenkins-history.css";
import logHistoryImage from "../images/log-history.png";

const JenkinsHistory = () => {
  const JENKINS_HISTORY_URL = "http://0.0.0.0:8080/jenkins-histories/me";

  const [histories, setHistories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchHistories = async () => {
      const accessToken = JSON.parse(
        window.localStorage.getItem("accessToken")
      );

      axios
        .get(JENKINS_HISTORY_URL, {
          headers: { Authorization: accessToken.access_token },
        })
        .then((response) => {
          setHistories(response.data);
        })
        .catch((error) => {
          alert(error.response.data.detail);
        });
    };
    fetchHistories();
  }, []);

  return (
    <div>
      <h2 className="jenkins-history-h2">Jenkins Histories</h2>
      <div className="home-link" onClick={() => history.push("/home")}>
        <h2>Home</h2>
      </div>
      <div className="jenkins-history-line" />
      <div className="jenkins-history-container">
        <div className="jenkins-history-cards">
          {histories.map((history) => (
            <div className="jenkins-history-card" key={history.id}>
              <div className="jenkins-history-text">
                <p>
                  <strong>History id:</strong> {history.id}
                </p>
                <p>
                  <strong>Time executed:</strong> {history.time_executed}
                </p>
                <p>
                  <strong>Time spent:</strong> {history.time_spent} seconds
                </p>
              </div>
              <img
                src={logHistoryImage}
                alt="Log History"
                className="jenkins-history-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JenkinsHistory;
