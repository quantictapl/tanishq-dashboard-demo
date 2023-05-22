import React, { useEffect, useState } from "react";
import "./componentcss/Chart.css";
import DemoChart from "./DemoChart";
import { fetchData,getData } from "./FetchCounterData";

function Chart({
  selectedDate,
  selectedFloor,
  showMostVisited,
  showLeastVisited,
  showUnattended,
  showViolations,
  jsonData,
  isLoadingChartData,
  setIsLoadingChartData,
}) {
  
  const [sortedData, setSortedData] = useState([]);
 

  useEffect(() => {
    setIsLoadingChartData(true);

    fetchData(
      selectedDate,
      selectedFloor,
      showMostVisited,
      showLeastVisited,
      showUnattended,
      showViolations
    )
      .then((data) => {
        const filteredData = Object.values(
          showMostVisited
            ? data?.analytics?.most_visited || {}
            : showLeastVisited
            ? data?.analytics?.least_visited || {}
            : showUnattended
            ? data?.analytics?.unattended || {}
            : showViolations
            ? data?.analytics?.violations || {}
            : data?.all_counters || {}
        ).filter(
          (counter) =>
            counter.floor === selectedFloor || selectedFloor === "All Floors"
        );

        const getCounterData = (counter) => {
          return counter.data || [];
        };

        const getCounterNumber = (counter) => {
          if (!counter) {
            return "";
          }

          const allCounters = data.all_counters || {};
          const mostVisited = data.analytics.most_visited || {};
          const leastVisited = data.analytics.least_visited || {};
          const unattended = data.analytics.unattended || {};
          const violations = data.analytics.violations || {};

          const counterNumber =
            Object.keys(allCounters).find(
              (key) => allCounters[key] === counter
            ) ||
            Object.keys(mostVisited).find(
              (key) => mostVisited[key] === counter
            ) ||
            Object.keys(leastVisited).find(
              (key) => leastVisited[key] === counter
            ) ||
            Object.keys(unattended).find((key) => unattended[key] === counter) ||
            Object.keys(violations).find((key) => violations[key] === counter);

          const counterNo = counterNumber ? counterNumber.split("_")[1] : "";
          return counterNo;
        };

        const processedData = filteredData.map((counter) => {
          const counterData = getCounterData(counter);
          const counterNumber = getCounterNumber(counter);
          const sortedCounterData = counterData.sort(
            (a, b) => new Date(a[2]) - new Date(b[2])
          );

          return {
            counter,
            counterData: sortedCounterData,
            counterNumber,
          };
        });

        setSortedData(processedData);
        setIsLoadingChartData(false);
      })
      .catch((error) => {
        console.log("Error fetching/updating chart data:", error);
        setIsLoadingChartData(false);
      });
  }, [
    selectedDate,
    selectedFloor,
    showMostVisited,
    showLeastVisited,
    showUnattended,
    showViolations,
    setIsLoadingChartData,
  ]);
  // console.log(jsonData)
  // console.log(sortedData)
  return (
    <div className="chart-container">
     {sortedData.map(({ counter, counterData, counterNumber }) => (
        <div className="analytics-chart-container" key={counterNumber}>
          <div className="analytics-chart-left">
            <div className="chart-left-col col-one">
              <span>Counter {counter.counter_name}</span>
              <span>Floor {counter.floor}</span>
            </div>
            <div className="chart-left-col col-two">
              <span>{counter.idle_time}h</span>
            </div>
            <div className="chart-left-col col-three">
              <span>{counter.count}</span>
            </div>
          </div>
          <div className="analytics-chart-right">
            <DemoChart
              counterData={counterData}
              counterNumber={counterNumber}
              sortedData={sortedData}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chart;

// import React, { useContext, useEffect, useState } from "react";
// import "./componentcss/Chart.css";
// import DemoChart from "./DemoChart";
// import { fetchData } from "./FetchCounterData";
// import { getData } from "./FetchCounterData";
// import { DateContext } from "./DateContext";

// function Chart({ selectedDate, selectedFloor }) {
//   const [jsonData, setJsonData] = useState(null);
//   useEffect(() => {
//     fetchData(selectedDate)
//       .then((data) => {
//         setJsonData(data);
//       })
//       .catch((error) => console.log("Error fetching JSON data:", error));
//   }, [selectedDate]);

//   if (!jsonData) {
//     return <div>Loading...</div>;
//   }

//   // Filter the JSON data based on the selected floor
//   const filteredData = Object.values(jsonData).filter(
//     (counter) => counter.floor === selectedFloor || selectedFloor === "All Floors"
//   );

//   // Fetch the specific counter data based on its identifier
//   const getCounterData = (counter) => {
//     return counter.data || [];
//   };

//   // Fetch the specific counter number based on its identifier
//   const getCounterNumber = (counter) => {
//     const counterNumber = Object.keys(jsonData).find(
//       (key) => jsonData[key] === counter
//     );
//     return counterNumber ? counterNumber.split("_")[1] : "";
//   };

//   return (
//     <div>
//       {filteredData.map((counter) => (
//         <div className="analytics-chart-container" key={counter}>
//           <div className="analytics-chart-left">
//             <div className="chart-left-col col-one">
//               <span>{counter.counter_name}</span>
//               <span>{counter.floor}</span>
//             </div>
//             <div className="chart-left-col col-two">
//               <span>{counter.idle_time}</span>
//             </div>
//             <div className="chart-left-col col-three">
//               <span>{counter.count}</span>
//             </div>
//           </div>
//           <div className="analytics-chart-right">
//             {/* Pass the specific counter data and counter number to DemoChart */}
//             <DemoChart
//               counterData={getCounterData(counter)}
//               counterNumber={getCounterNumber(counter)}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Chart;

// import React, { useContext, useEffect, useState } from "react";
// import "./componentcss/Chart.css";
// import DemoChart from "./DemoChart";
// import { fetchData } from "./FetchCounterData";
// import { getData } from "./FetchCounterData";
// import { DateContext } from "./DateContext";

// function Chart({ selectedDate }) {
//   const [jsonData, setJsonData] = useState(null);
//   useEffect(() => {
//     fetchData(selectedDate)
//       .then((data) => {
//         setJsonData(data);

//       })
//       .catch((error) => console.log("Error fetching JSON data:", error));
//   }, [selectedDate]);

//   if (!jsonData) {
//     return <div>Loading...</div>;
//   }

//   // Fetch the specific counter data based on its identifier
//   const getCounterData = (counter) => {
//     return jsonData[counter]?.data || [];
//   };

//   // Fetch the specific counter number based on its identifier
//   const getCounterNumber = (counter) => {
//     const counterNumber = counter.split("_")[1]; // Assuming the counter identifier format is "Counter_number"
//     return counterNumber || "";
//   };

//   return (
//     <div>
//       {Object.keys(jsonData).map((counter) => (
//         <div className="analytics-chart-container" key={counter}>
//           <div className="analytics-chart-left">
//             <div className="chart-left-col col-one">
//               <span>{jsonData[counter]?.counter_name}</span>
//               <span>{jsonData[counter]?.floor}</span>
//             </div>
//             <div className="chart-left-col col-two">
//               <span>{jsonData[counter]?.idle_time}</span>
//             </div>
//             <div className="chart-left-col col-three">
//               <span>{jsonData[counter]?.count}</span>
//             </div>
//           </div>
//           <div className="analytics-chart-right">
//             {/* Pass the specific counter data and counter number to DemoChart */}
//             <DemoChart
//               counterData={getCounterData(counter)}
//               counterNumber={getCounterNumber(counter)}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Chart;

// import React, { useContext, useEffect, useState } from "react";
// import "./componentcss/Chart.css";
// import DemoChart from "./DemoChart";
// import { fetchData } from "./FetchCounterData";
// import { getData } from "./FetchCounterData";
// import { DateContext } from "./DateContext";

// function Chart() {
//   const [jsonData, setJsonData] = useState(null);
//   const selectedDate = useContext(DateContext);
//   const [selectedFloor, setSelectedFloor] = useState("");

//   useEffect(() => {
//     fetchData(selectedDate)
//       .then((data) => {
//         setJsonData(data);
//         console.log(selectedDate);
//       })
//       .catch((error) => console.log("Error fetching JSON data:", error));
//   }, [selectedDate]);

//   if (!jsonData) {
//     return <div>Loading...</div>;
//   }

//   const handleFloorChange = (event) => {
//     setSelectedFloor(event.target.value);
//   };

//   const filteredData = selectedFloor
//   ? Object.values(jsonData).filter((counter) => counter.floor === selectedFloor)
//   : Object.values(jsonData);

//   // Fetch the specific counter data based on its identifier
//   const getCounterData = (counter) => {
//     return counter.data || [];
//   };

//   // Fetch the specific counter number based on its identifier
//   const getCounterNumber = (counter) => {
//     if (typeof counter === 'string') {
//       const counterNumber = counter.split("_")[1]; // Assuming the counter identifier format is "Counter_number"
//       return counterNumber || "";
//     }
//     return "";
//   };

//   return (
//     <div>
//       <div>
//         <label htmlFor="floor">Select Floor: </label>
//         <select id="floor" value={selectedFloor} onChange={handleFloorChange}>
//           <option value="">All Floors</option>
//           <option value="1">Floor 1</option>
//           <option value="2">Floor 2</option>
//           {/* Add more options for each floor */}
//         </select>
//       </div>
//       {filteredData.map((counter) => (
//         <div className="analytics-chart-container" key={counter.id}>
//           <div className="analytics-chart-left">
//             <div className="chart-left-col col-one">
//               <span>{counter.counter_name}</span>
//               <span>{counter.floor}</span>
//             </div>
//             <div className="chart-left-col col-two">
//               <span>{counter.idle_time}</span>
//             </div>
//             <div className="chart-left-col col-three">
//               <span>{counter.count}</span>
//             </div>
//           </div>
//           <div className="analytics-chart-right">
//             {/* Pass the specific counter data and counter number to DemoChart */}
//             <DemoChart
//               counterData={getCounterData(counter)}
//               counterNumber={getCounterNumber(counter)}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Chart;
