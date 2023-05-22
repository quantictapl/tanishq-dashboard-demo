import React, { useEffect, useState } from "react";
import "./componentcss/Analytics.css";

import { ReactComponent as Question } from "../Icons/QuestionIcon.svg";
import Filter from "./Filter";
import { fetchDates } from "./FetchDates";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { DateContext, DateProvider } from "./DateContext";
import { BsArrowUp } from "react-icons/bs";
import Chart from "./Chart";
import DateDropdown from "./DateDropdown";
import { fetchData } from "./FetchCounterData";

function Analytics() {
  const [jsonData, setJsonData] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [showMostVisited, setShowMostVisited] = useState(false);
  const [showLeastVisited, setShowLeastVisited] = useState(false);
  const [mostVisitedCounters, setMostVisitedCounters] = useState([]);
  const [leastVisitedCounters, setLeastVisitedCounters] = useState([]);
  const [showUnattended, setShowUnattended] = useState(false);
  const [showViolations, setShowViolations] = useState(false);
  const [unattendedCounters, setUnattendedCounters] = useState([]);
  const [violationNumber, setViolationNumber] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingChartData, setIsLoadingChartData] = useState(true);

  useEffect(() => {
    fetchDates()
      .then((dates) => {
        const currentDate = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayDate = yesterday.toISOString().slice(0, 10); // Get yesterday's date in YYYY-MM-DD format

        let initialDate = currentDate;

        if (!dates.includes(currentDate) && dates.includes(yesterdayDate)) {
          initialDate = yesterdayDate; // Use yesterday's date as the initial date if today's date is not available
        } else if (
          !dates.includes(currentDate) &&
          !dates.includes(yesterdayDate)
        ) {
          const closestDate = dates.reduce((a, b) => {
            const aDiff = Math.abs(new Date(a) - new Date(currentDate));
            const bDiff = Math.abs(new Date(b) - new Date(currentDate));
            return aDiff < bDiff ? a : b; // Find the closest date to today's date from the available dates
          });
          initialDate = closestDate;
        }

        setSelectedDate(initialDate);
      })
      .catch((error) => console.log("Error fetching dates:", error));
  }, []);

  useEffect(() => {
    fetchData(selectedDate)
      .then((data) => {
        setJsonData(data);
        setIsLoading(false); // Set loading state to false after data is fetched
      })
      .catch((error) => console.log("Error fetching JSON data:", error));
  }, [selectedDate]);

  useEffect(() => {
    try {
      if (showMostVisited && jsonData) {
        const mostVisitedCounters = Object.keys(
          jsonData.analytics.most_visited || {}
        ).map((key) => key.split("_")[1]);
        console.log("Most Visited Counters:", mostVisitedCounters);
        setMostVisitedCounters(mostVisitedCounters);
      }
    } catch (error) {}
  }, [showMostVisited, jsonData]);
  useEffect(() => {
    if (jsonData && jsonData.dates && jsonData.dates.length > 0) {
      // Set the initial selected date to the first index of the array
      setSelectedDate(jsonData.dates[0]);
    }
  }, [jsonData]);

  useEffect(() => {
    if (showLeastVisited && jsonData) {
      const leastVisitedCounters = Object.keys(
        jsonData.analytics.least_visited || {}
      ).map((key) => key.split("_")[1]);
      console.log("Least Visited Counters:", leastVisitedCounters);
      setLeastVisitedCounters(leastVisitedCounters);
    }
  }, [showLeastVisited, jsonData]);
  useEffect(() => {
    if (showUnattended && jsonData) {
      const unattendedCount = Object.keys(
        jsonData.analytics.unattended || {}
      ).length; // Count the number of unattended counters
      console.log(unattendedCount);
      setUnattendedCounters(unattendedCount);
    }
  }, [showUnattended, jsonData]);

  useEffect(() => {
    if (showViolations && jsonData) {
      const violationCount = Object.keys(
        jsonData.analytics.violations || {}
      ).length; // Count the number of violations
      console.log(violationCount);
      setViolationNumber(violationCount);
    }
  }, [showViolations, jsonData]);

  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const [selectedFloor, setSelectedFloor] = useState("All Floors");

  const handleFloorChange = (event) => {
    const floor = event.target.value;
    setSelectedFloor(floor);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleMostVisitedClick = () => {
    setShowMostVisited(!showMostVisited);
    setShowLeastVisited(false);
    setShowViolations(false);
    setShowUnattended(false);
  };

  const handleLeastVisitedClick = () => {
    setShowLeastVisited(!showLeastVisited);
    setShowMostVisited(false);
    setShowViolations(false);
    setShowUnattended(false);
  };

  const handleUnattendedClick = () => {
    setShowUnattended(!showUnattended);
    setShowLeastVisited(false);
    setShowMostVisited(false);
    setShowViolations(false);
  };

  const handleViolationsClick = () => {
    setShowViolations(!showViolations);
    setShowUnattended(false);
    setShowLeastVisited(false);
    setShowMostVisited(false);
  };

  return (
    <div className="analytics-container">
      <div className="analytics-title">
        <div>
          <button
            className={`analytics-button button-one ${
              activeButton === 0 ? "active" : ""
            }`}
            onClick={() => handleButtonClick(0)}
          >
            Counter Activity
          </button>
          <button
            className={`analytics-button  ${
              activeButton === 1 ? "active" : ""
            }`}
            onClick={() => handleButtonClick(1)}
          >
            Heat Map
          </button>
        </div>
        <DateDropdown
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>
      <div className="tetra-buttons-container">
        <button
          className={`tetra-button button-one ${
            showMostVisited ? "active" : ""
          }`}
          onClick={handleMostVisitedClick}
        >
          <span className="tetra-button-title">Most Visited Counter</span>
          <div>
            {mostVisitedCounters.length > 0 ? (
              mostVisitedCounters.map((counter, index) => (
                <span
                  className={`counters${
                    index === 0 ? " counter-one counter-odd" : ""
                  }`}
                  key={index}
                >
                  C{counter}
                </span>
              ))
            ) : (
              <span></span> // Add a loading state or any placeholder while data is being fetched
            )}
          </div>
        </button>
        <button
          className={`tetra-button button-two ${
            showLeastVisited ? "active" : ""
          }`}
          onClick={handleLeastVisitedClick}
        >
          <span className="tetra-button-title">Least Visited Counter</span>
          <div>
            {leastVisitedCounters.length > 0 ? (
              leastVisitedCounters.map((counter, index) => (
                <span
                  className={`counters${
                    index === 0 ? " counter-one counter-odd" : ""
                  }`}
                  key={index}
                >
                  C{counter}
                </span>
              ))
            ) : (
              <span></span> // Add a loading state or any placeholder while data is being fetched
            )}
          </div>
        </button>
        <button
          className={`tetra-button button-three ${
            showUnattended ? "active" : ""
          }`}
          onClick={handleUnattendedClick}
        >
          <span className="tetra-button-title">Unattended Customers</span>
          <span className="counters counter-one">
            {unattendedCounters}
          </span>{" "}
          {/* Display the value of unattendedCounters */}
        </button>
        <button
          className={`tetra-button button-four ${
            showViolations ? "active" : ""
          }`}
          onClick={handleViolationsClick}
        >
          <span className="tetra-button-title">Violations</span>
          <span className="counters counter-one">{violationNumber} </span>
        </button>
      </div>
      <div className="analytics-content">
        <div className="analytics-content-top">
          <div className="legend-container">
            <button className="legend">
              <div className="legend-color color-one"></div>
              <span>Violations</span>
              <Question className="question-icon" height="16px" width="16px" />
            </button>
            <button className="legend">
              <div className="legend-color color-two"></div>
              <span>Customer Wait Time</span>
              <Question className="question-icon" height="16px" width="16px" />
            </button>
            <button className="legend">
              <div className="legend-color color-three"></div>
              <span>Engagement Time </span>
              <Question className="question-icon" height="16px" width="16px" />
            </button>
            <button className="legend">
              <div className="legend-color color-four"></div>
              <span>Employee Idle Time </span>
              <Question className="question-icon" height="16px" width="16px" />
            </button>
            <button className="legend">
              <div className="legend-color color-five"></div>
              <span>Counter Idle Time</span>
              <Question className="question-icon" height="16px" width="16px" />
            </button>
          </div>
          <Filter
            selectedFloor={selectedFloor}
            onFloorChange={handleFloorChange}
          />
        </div>
        <div className="analytics-content-middle">
          <div className="analytics-chart-header">
            <div className=" chart-left-col ">
              <div className=" analytics-col">
                <BsArrowUp />
                <span>Counter Name</span>
              </div>
            </div>
            <div className="chart-left-col col-two">
              <span>Idle Time</span>
            </div>
            <div className="chart-left-col col-three">
              <span>Count</span>
            </div>
          </div>
          <div className="chart-empty">
            <MdOutlineKeyboardArrowLeft/>
          </div>
          <div className="analytics-chart-coordinates">
            <div className="analytics-timeline">
              <span>10:00</span>
              <span>11:00</span>
              <span>12:00</span>
              <span>01:00</span>
              <span>02:00</span>
              <span>03:00</span>
              <span>04:00</span>
              <span>05:00</span>
              <span>06:00</span>
              <span>07:00</span>
              <span>08:00</span>
              <span>09:00</span>
              <span>10:00</span>
            </div>
          </div>
          <div className="chart-empty-2"></div>
        </div>
        <div className="analytics-content-main">
          {jsonData && selectedDate ? (
            <Chart
              selectedDate={selectedDate}
              selectedFloor={selectedFloor}
              showMostVisited={showMostVisited}
              showLeastVisited={showLeastVisited}
              showUnattended={showUnattended}
              showViolations={showViolations}
              jsonData={jsonData}
              isLoadingChartData={isLoadingChartData}
              setIsLoadingChartData={setIsLoadingChartData}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
