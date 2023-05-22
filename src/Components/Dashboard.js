import React, { useState } from "react";
import "./componentcss/Dashboard.css";
import "./componentcss/DashboardRight.css";
import Logo from "../Images/QuantLogo.png";
import { ReactComponent as Overview } from "../Icons/OverviewIcon.svg";
import { ReactComponent as Graph } from "../Icons/AnalyticsLogo.svg";
import { ReactComponent as Report } from "../Icons/Documenticon.svg";
import { ReactComponent as Alert } from "../Icons/AlertLogo.svg";
import { ReactComponent as Support } from "../Icons/SupportLogo.svg";
import { ReactComponent as Settings } from "../Icons/SettingIconS.svg";
import { ReactComponent as Logout } from "../Icons/LogoutIcon.svg";
import { RiAccountCircleFill } from "react-icons/ri";
import { CgMenuRight } from "react-icons/cg";
import { HiUser } from "react-icons/hi";
import { RxBell } from "react-icons/rx";
import Analytics from "./Analytics";
import GanttDemo from "./DemoChart";
import DateDropdown from "./DateDropdown";
import { fetchData, getData } from "./FetchCounterData";
import Chart from "./Chart";
import ErrorBoundary from "./ErrorBoundary";
function Dashboard() {
  const [activeButton, setActiveButton] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchData(date)
      .then((jsonData) => {
        // Do something with the fetched data if needed
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <div className="dashboard-left-top">
          <div className="dashboard-title">
            <div className="dashboard-title-left">
              <img src={Logo} alt="LOGO" className="quant-logo" />
              <span className="logo-text">Quant AI</span>
            </div>
            <CgMenuRight className="menu-icon" />
          </div>
          <div className="dashboard-left-main">
            <button
              className={`dashboard-icon-container-btn ${
                activeButton === 0 ? "active" : ""
              }`}
              onClick={() => handleButtonClick(0)}
            >
              <Overview className="icon" />
              <span>Overview</span>
            </button>
            <button
              className={`dashboard-icon-container-btn ${
                activeButton === 1 ? "active" : ""
              }`}
              onClick={() => handleButtonClick(1)}
            >
              <Graph className="icon" />
              <span>Analytics</span>
            </button>
            <button
              className={`dashboard-icon-container-btn ${
                activeButton === 2 ? "active" : ""
              }`}
              onClick={() => handleButtonClick(2)}
            >
              <Report className="icon" />
              <span>Report</span>
            </button>
            <button
              className={`dashboard-icon-container-btn ${
                activeButton === 3 ? "active" : ""
              }`}
              onClick={() => handleButtonClick(3)}
            >
              <Alert className="icon" />
              <span>Alert</span>
            </button>
            <button
              className={`dashboard-icon-container-btn ${
                activeButton === 4 ? "active" : ""
              }`}
              onClick={() => handleButtonClick(4)}
            >
              <Support className="ic" />
              <span>Support</span>
            </button>
            <button
              className={`dashboard-icon-container-btn ${
                activeButton === 5 ? "active" : ""
              }`}
              onClick={() => handleButtonClick(5)}
            >
              <Settings className="ic" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        <button
          className={`dashboard-left-footer-btn ${
            activeButton === 6 ? "active" : ""
          }`}
          onClick={() => handleButtonClick(6)}
        >
          <Logout className="ic" />
          <span>Logout</span>
        </button>
      </div>
      <div className="dashboard-right">
        <div className="dashboard-right-top">
          <div className="dashboard-title-right">
            <span className="dashboard-title-right-span">Welcome!</span>
            <span className="dashboard-right-subtitle">
              We are ready to show your store performance
            </span>
          </div>
          <div className="dashboard-title-end">
            <button className="dashboard-right-icon-btn">
              <RxBell className="icon-right" />
            </button>
            <button className="dashboard-right-icon-btn">
              <HiUser className=" profile icon-right" />
            </button>
          </div>
        </div>
        <div className="dashboard-right-main">
          {/* <DateDropdown onDateChange={handleDateChange} />
        {selectedDate && <Chart data={getData()} />} */}
          <ErrorBoundary>
            <Analytics />
          </ErrorBoundary>
          {/* <GanttDemo/> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
