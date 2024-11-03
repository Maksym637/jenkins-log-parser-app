import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import "../styles/home.css";
import * as XLSX from "xlsx";

Chart.register(...registerables);

const Home = ({ setIsAuthenticated }) => {
  const JENKINS_LOG_URL = "http://0.0.0.0:8080/jenkins-logs/me";

  const [url, setUrl] = useState("");
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    window.localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    history.push("/login");
  };

  const handleParse = async (event) => {
    const accessToken = JSON.parse(window.localStorage.getItem("accessToken"));

    event.preventDefault();
    setIsLoading(true);

    axios
      .post(
        JENKINS_LOG_URL,
        { external_url: url },
        { headers: { Authorization: accessToken.access_token } }
      )
      .then((response) => {
        const data = response.data;
        setChartData(data.chart_log_data);
        downloadExcel(data.parsed_log_data);
      })
      .catch((error) => {
        alert(error.response.data.detail);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const downloadExcel = (data) => {
    const now = new Date();
    const formattedDate = now.toISOString().replace(/:/g, "-").split(".")[0];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Parsed Log");
    XLSX.writeFile(workbook, `parsed-log (${formattedDate}).xlsx`);
  };

  const pieChartData = {
    labels: ["Passed", "Failed", "Errored", "Skipped", "Blocked"],
    datasets: [
      {
        label: "Number of tests",
        data: [
          chartData?.passed || 0,
          chartData?.failed || 0,
          chartData?.errored || 0,
          chartData?.skipped || 0,
          chartData?.blocked || 0,
        ],
        backgroundColor: [
          "rgba(76, 175, 80, 0.65)",
          "rgba(244, 67, 54, 0.65)",
          "rgba(255, 152, 0, 0.65)",
          "rgba(33, 150, 243, 0.65)",
          "rgba(158, 158, 158, 0.65)",
        ],
        borderColor: "#163430",
        borderWidth: 1,
      },
    ],
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
      <div className="log-container">
        <div className="log-input-group">
          <input
            type="text"
            className="log-input"
            value={url}
            onChange={(entity) => setUrl(entity.target.value)}
            placeholder="Jenkins log URL"
          />
          <button className="log-button" onClick={handleParse}>
            Parse and Visualize
          </button>
        </div>
        {isLoading && <div className="loading-message">Processing...</div>}
        {chartData && !isLoading && (
          <div className="chart-container">
            <div className="pie-chart-wrapper">
              <Pie
                data={pieChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    tooltip: {
                      bodyFont: {
                        family: "serif",
                      },
                      titleFont: {
                        family: "serif",
                      },
                    },
                    legend: {
                      labels: {
                        font: {
                          family: "serif",
                          size: 15,
                        },
                        color: "#163430",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
