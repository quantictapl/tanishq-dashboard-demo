// import React, { useEffect, useRef, useState } from "react";
// import Chart from "react-apexcharts";
// import "./componentcss/DemoChart.css";
// function CustomTooltip({ filteredCounterData }) {
//   const customTooltip = ({ series, seriesIndex, dataPointIndex, w }) => {
//     const currentData = filteredCounterData;
//     console.log(filteredCounterData)
//     const item = currentData[dataPointIndex];
//     console.log(filteredCounterData);
//     if (item && item.y && item.y.length >= 2) {
//       const startTime = new Date(item.y[0]);
//       const endTime = new Date(item.y[1]);

//       if (!isNaN(startTime) && !isNaN(endTime)) {
//         const formattedStartTime = startTime.toLocaleTimeString("en-US", {
//           hour: "numeric",
//           minute: "numeric",
//           hour12: true,
//         });
//         const formattedEndTime = endTime.toLocaleTimeString("en-US", {
//           hour: "numeric",
//           minute: "numeric",
//           hour12: true,
//         });

//         return (
//           `<div class="custom-tooltip">` +
//           `<span>Start Time: ${formattedStartTime}</span><br/>` +
//           `<span>End Time: ${formattedEndTime}</span>` +
//           `</div>`
//         );
//       }
//     }

//     // Return your default tooltip content if the condition is not met
//     return null;
//   };

//   return customTooltip;
// }

// function DemoChart({ counterData, activeLegend }) {
//   // Ensure counterData exists before rendering the chart
//   const [filteredCounterData, setFilteredCounterData] = useState([]);
//   const chartRef = useRef(null);

//   useEffect(() => {
//     // Update the filteredCounterData when activeLegend or counterData changes
//     const filteredData = counterData.filter((item) => item.name === activeLegend);
//     setFilteredCounterData(filteredData);
//   }, [counterData, activeLegend]);

//   useEffect(() => {
//     if (!counterData || counterData.length === 0 || !Array.isArray(counterData)) {
//       return;
//     }

//     const chartContainer = chartRef.current?.chart?.container;
//     if (chartContainer) {
//       const tooltipContainer = document.createElement("div");
//       tooltipContainer.className = "custom-tooltip";
//       chartContainer.appendChild(tooltipContainer);
//     }

//     return () => {
//       const tooltipContainer = document.querySelector(
//         ".chart-main .custom-tooltip"
//       );
//       if (tooltipContainer && tooltipContainer.parentNode) {
//         tooltipContainer.parentNode.removeChild(tooltipContainer);
//       }
//     };
//   }, [counterData]);

//   useEffect(() => {
//     const apexChart = chartRef.current?.chart;
//     if (apexChart) {
//       apexChart.addEventListener("updated", handleChartUpdate);
//     }

//     return () => {
//       if (apexChart) {
//         apexChart.removeEventListener("updated", handleChartUpdate);
//       }
//     };
//   }, [counterData, activeLegend]);

//   const handleChartUpdate = () => {
//     const tooltipContainer = document.querySelector(
//       ".chart-main .custom-tooltip"
//     );
//     if (tooltipContainer && tooltipContainer.parentNode) {
//       tooltipContainer.parentNode.removeChild(tooltipContainer);
//     }

//     const chartContainer = chartRef.current?.chart?.container;
//     if (chartContainer) {
//       const newTooltipContainer = document.createElement("div");
//       newTooltipContainer.className = "custom-tooltip";
//       chartContainer.appendChild(newTooltipContainer);
//     }
//   };

//   if (!counterData || counterData.length === 0 || !Array.isArray(counterData)) {
//     return null;
//   }

//   let customTooltip;
//   if (activeLegend) {
//     customTooltip = CustomTooltip({ filteredCounterData });
//     console.log(activeLegend ,"present")
//     console.log(filteredCounterData)
//   } else {
//     customTooltip = CustomTooltip({ filteredCounterData: counterData });
//   }

//   const options = {
//     chart: {
//       height: 90,
//       type: "rangeBar",
//       toolbar: {
//         show: false, // Hide the toolbar
//       },
//       zoom: false,
//     },
//     tooltip: {
//       x: { show: true },
//       enabled: true,
//       enabledOnSeries: undefined,
//       shared: false,
//       followCursor: false,
//       intersect: true,
//       inverseOrder: false,

//       custom: ({ series, seriesIndex, dataPointIndex, w }) => {
//         customTooltip({ series, seriesIndex, dataPointIndex, w })
//         console.log(activeLegend ,"present")
//     console.log(filteredCounterData)
//       },
//       fillSeriesColor: false,
//       theme: false,
//       style: {
//         fontSize: "12px",
//         fontFamily: undefined,
//       },
//       onDatasetHover: {
//         highlightDataSeries: false,
//       },
//       x: {
//         show: true,
//         format: "dd MMM",
//         formatter: undefined,
//       },
//       y: {
//         formatter: undefined,
//         title: {
//           formatter: (seriesName) => seriesName,
//         },
//       },
//       z: {
//         formatter: undefined,
//         title: "Size: ",
//       },
//       marker: {
//         show: true,
//       },
//       items: {
//         display: "flex",
//       },
//       fixed: {
//         enabled: false,
//         position: "topRight",
//         offsetX: 0,
//         offsetY: 0,
//       },
//     },
//     plotOptions: {
//       bar: {
//         horizontal: true,
//         distributed: true,
//         rangeBarGroupRows: true,
//       },
//     },
//     xaxis: {
//       type: "datetime",
//       min: new Date(counterData[0].y[0]).setHours(10, 0, 0, 0),
//       max: new Date(counterData[0].y[0]).setHours(22, 0, 0, 0),
//       labels: {
//         format: "HH:mm",
//       },
//       grid: {
//         showLines: true,
//         borderColor: "#e0e0e0",
//         strokeDashArray: 4,
//         position: "back",
//       },
//     },
//     fill: {
//       type: "solid",
//     },

//     colors: counterData.map((item) => item.fillColor),

//     margin: {
//       top: 20,
//       right: 20,
//       bottom: 20,
//       left: 20,
//     },
//   };

//   options.tooltip.custom = ({ series, seriesIndex, dataPointIndex, w }) =>
//   customTooltip({ series, seriesIndex, dataPointIndex, w });
//   let seriesData;

//   if (activeLegend) {
//     seriesData = filteredCounterData
//       .map((item, index) => {
//         if (item.y && item.y.length >= 2) {
//           const startTime = new Date(item.y[0]);
//           const endTime = new Date(item.y[1]);

//           if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
//             console.log("Invalid date:", item.y);
//             return null;
//           }

//           return {
//             x: item.x,
//             y: [startTime.getTime(), endTime.getTime()],
//             fillColor: item.fillColor,
//           };
//         } else {
//           console.log("Invalid item:", item);
//           return null;
//         }
//       })
//       .filter((item) => item !== null);
//   } else {
//     seriesData = counterData
//       .map((item, index) => {
//         if (item.y && item.y.length >= 2) {
//           const startTime = new Date(item.y[0]);
//           const endTime = new Date(item.y[1]);

//           if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
//             console.log("Invalid date:", item.y);
//             return null;
//           }

//           return {
//             x: item.x,
//             y: [startTime.getTime(), endTime.getTime()],
//             fillColor: item.fillColor,
//           };
//         } else {
//           console.log("Invalid item:", item);
//           return null;
//         }
//       })
//       .filter((item) => item !== null);
//   }

//   const series = [
//     {
//       name: "Timeline",
//       data: seriesData,
//     },
//   ];
//   // console.log(counterData)

//   return (
//     <div className="demo-chart-container">
//       <div className="demo-chart">
//         <Chart
//           className="chart-main"
//           options={options}
//           series={series}
//           type="rangeBar"
//           height={90}
//         />
//         <CustomTooltip filteredCounterData={filteredCounterData}/>
//       </div>
//     </div>
//   );
// }

// export default DemoChart;

import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import "./componentcss/DemoChart.css";

function DemoChart({ counterData, activeLegend }) {
  // Ensure counterData exists before rendering the chart
  const [filteredCounterData, setFilteredCounterData] = useState([]);
  const chartRef = useRef(null);
  useEffect(() => {
    // Update the filteredCounterData when activeLegend or counterData changes
    const filteredData = counterData.filter(
      (item) => item.name === activeLegend
    );
    setFilteredCounterData(filteredData);
  }, [counterData, activeLegend]);

  useEffect(() => {
    if (
      !counterData ||
      counterData.length === 0 ||
      !Array.isArray(counterData)
    ) {
      return;
    }

    const chartContainer = chartRef.current?.chart?.container;
    if (chartContainer) {
      const tooltipContainer = document.createElement("div");
      tooltipContainer.className = "custom-tooltip";
      chartContainer.appendChild(tooltipContainer);
    }

    return () => {
      const tooltipContainer = document.querySelector(
        ".chart-main .custom-tooltip"
      );
      if (tooltipContainer && tooltipContainer.parentNode) {
        tooltipContainer.parentNode.removeChild(tooltipContainer);
      }
    };
  }, [counterData]);

  useEffect(() => {
    const apexChart = chartRef.current?.chart;
    if (apexChart) {
      apexChart.addEventListener("updated", handleChartUpdate);
    }

    return () => {
      if (apexChart) {
        apexChart.removeEventListener("updated", handleChartUpdate);
      }
    };
  }, [counterData, activeLegend]);

  const handleChartUpdate = () => {
    const tooltipContainer = document.querySelector(
      ".chart-main .custom-tooltip"
    );
    if (tooltipContainer && tooltipContainer.parentNode) {
      tooltipContainer.parentNode.removeChild(tooltipContainer);
    }

    const chartContainer = chartRef.current?.chart?.container;
    if (chartContainer) {
      const newTooltipContainer = document.createElement("div");
      newTooltipContainer.className = "custom-tooltip";
      chartContainer.appendChild(newTooltipContainer);
    }
  };

  if (!counterData || counterData.length === 0 || !Array.isArray(counterData)) {
    return null;
  }

  // console.log(activeLegend);

  const options = {
    chart: {
      height: 90,
      type: "rangeBar",
      toolbar: {
        show: false, // Hide the toolbar
      },
      zoom: false,
    },
    yaxis: {
      show: false, // Hide the y-axis and its labels
    },
    grid: {
      show: false, // Hide the gridlines
    },
    tooltip: {
      x: { show: true },

      enabled: true,
      enabledOnSeries: undefined,
      shared: false,
      followCursor: false,
      intersect: true,
      inverseOrder: false,

      custom: (
        { series, seriesIndex, dataPointIndex, w },
        filteredCounterData
      ) => {
        const colorToNameMap = {
          "#87ccf7": "Employee Idle",
          "#2a1800": "Counter Idle",
          "#84e798": "Engagement Time",
          "#e5c191": "Wait",
          "#f74438": "Violation",
          "#bae0f8": "Employee Idle",
          "#badec1": "Engagement Time",
          "#ffe7c7": "Wait",
          "#f56056": "Violation",
          // Add more color-name mappings as needed
        };

        // const currentData = activeLegend ? counterData.filter((item) => item.name === activeLegend) : counterData;
        const currentData = w.globals.initialSeries[seriesIndex].data;
        // const currentData = activeLegend ? filteredCounterData : counterData;
        const item = currentData[dataPointIndex];
        const color = item.fillColor;
        const name = colorToNameMap[color];
        // console.log(item.name)
        // console.log(w.globals.initialSeries);

        // console.log(w.globals.initialSeries[seriesIndex]);
        // const item = currentData[dataPointIndex];
        // const item = series;
        // console.log(item)
        // console.log(filteredCounterData)
        if (item && item.y && item.y.length >= 2) {
          const startTime = new Date(item.y[0]);
          const endTime = new Date(item.y[1]);


          if (!isNaN(startTime) && !isNaN(endTime)) {
            const formattedStartTime = startTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
            const formattedEndTime = endTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });
            // const durationInSeconds = Math.floor((endTime - startTime) / 1000);
            // const durationHours = Math.floor(durationInSeconds / 3600);
            // const durationMinutes = Math.floor((durationInSeconds % 3600) / 60);
            // const durationSeconds = durationInSeconds % 60;

            // const formattedDuration = `${durationHours
            //   .toString()
            //   .padStart(2, "0")}:${durationMinutes
            //   .toString()
            //   .padStart(2, "0")}:${durationSeconds
            //   .toString()
            //   .padStart(2, "0")}`;

            return (
              '<div className="custom-tooltip apexcharts-tooltip">' +
              "<span><b> " +
              name +
              "</b></span><br/>" +
              "<span><hr/><b>Start Time:</b>" +
              formattedStartTime +
              "</span><br/>" +
              "<span><b>End Time:</b> " +
              formattedEndTime +
              "</span><br/><br/>" +
              // "<span><b>Duration:</b> " +
              // formattedDuration +
              // "</span>" +
              "</div>"
            );
          }
        }

        // Return your default tooltip content if the condition is not met
        // const startTime=new Date(series[seriesIndex][0]);
        // const endTime=new Date(series[seriesIndex][1]);
        // console.log("starttime:",startTime,"endtime:",endTime)
      },
      fillSeriesColor: false,
      theme: false,
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      x: {
        show: true,
        format: "dd MMM",
        formatter: undefined,
      },
      y: {
        formatter: undefined,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
      z: {
        formatter: undefined,
        title: "Size: ",
      },
      marker: {
        show: true,
      },
      items: {
        display: "flex",
      },
      fixed: {
        enabled: false,
        position: "topRight",
        offsetX: 0,
        offsetY: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        rangeBarGroupRows: true,
      },
    },
    xaxis: {
      type: "datetime",
      min: new Date(counterData[0].y[0]).setHours(10, 0, 0, 0),
      max: new Date(counterData[0].y[0]).setHours(22, 0, 0, 0),
      labels: {
        format: "HH:mm",
      },
      grid: {
        showLines: true,
        borderColor: "#e0e0e0",
        strokeDashArray: 4,
        position: "back",
      },
    },
    fill: {
      type: "solid",
    },

    colors: counterData.map((item) => item.fillColor),

    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
  };

  let seriesData;

  if (activeLegend) {
    seriesData = filteredCounterData
      .map((item, index) => {
        if (item.y && item.y.length >= 2) {
          const startTime = new Date(item.y[0]);
          const endTime = new Date(item.y[1]);

          if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
            console.log("Invalid date:", item.y);
            return null;
          }

          return {
            x: item.x,
            y: [startTime.getTime(), endTime.getTime()],
            fillColor: item.fillColor,
          };
        } else {
          console.log("Invalid item:", item);
          return null;
        }
      })
      .filter((item) => item !== null);
  } else {
    seriesData = counterData
      .map((item, index) => {
        if (item.y && item.y.length >= 2) {
          const startTime = new Date(item.y[0]);
          const endTime = new Date(item.y[1]);

          if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
            console.log("Invalid date:", item.y);
            return null;
          }

          return {
            x: item.x,
            y: [startTime.getTime(), endTime.getTime()],
            fillColor: item.fillColor,
          };
        } else {
          console.log("Invalid item:", item);
          return null;
        }
      })
      .filter((item) => item !== null);
  }

  const series = [
    {
      name: "Timeline",
      data: seriesData,
    },
  ];
  // console.log(counterData)

  return (
    <div className="demo-chart-container">
      <div className="demo-chart">
        <Chart
          className="chart-main"
          options={options}
          series={series}
          type="rangeBar"
          height={90}
        />
      </div>
    </div>
  );
}

export default DemoChart;

// import React, { useEffect, useRef } from "react";
// import Chart from "react-apexcharts";
// import "./componentcss/DemoChart.css";

// function DemoChart({ counterData }) {
//   // Ensure counterData exists before rendering the chart
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (!counterData || counterData.length === 0 || !Array.isArray(counterData)) {
//       return;
//     }

//     const chartContainer = chartRef.current?.chart?.container;
//     if (chartContainer) {
//       const tooltipContainer = document.createElement("div");
//       tooltipContainer.className = "custom-tooltip";
//       chartContainer.appendChild(tooltipContainer);
//     }

//     return () => {
//       const tooltipContainer = document.querySelector(".chart-main .custom-tooltip");
//       if (tooltipContainer && tooltipContainer.parentNode) {
//         tooltipContainer.parentNode.removeChild(tooltipContainer);
//       }
//     };
//   }, [counterData]);

//   useEffect(() => {
//     const apexChart = chartRef.current?.chart;
//     if (apexChart) {
//       apexChart.addEventListener("updated", handleChartUpdate);
//     }

//     return () => {
//       if (apexChart) {
//         apexChart.removeEventListener("updated", handleChartUpdate);
//       }
//     };
//   }, [counterData]);

//   const handleChartUpdate = () => {
//     const tooltipContainer = document.querySelector(".chart-main .custom-tooltip");
//     if (tooltipContainer && tooltipContainer.parentNode) {
//       tooltipContainer.parentNode.removeChild(tooltipContainer);
//     }

//     const chartContainer = chartRef.current?.chart?.container;
//     if (chartContainer) {
//       const newTooltipContainer = document.createElement("div");
//       newTooltipContainer.className = "custom-tooltip";
//       chartContainer.appendChild(newTooltipContainer);
//     }
//   };

//   if (!counterData || counterData.length === 0 || !Array.isArray(counterData)) {
//     return null;
//   }

//   const options = {
//     chart: {
//       height: 90,
//       type: "rangeBar",
//       toolbar: {
//         show: false, // Hide the toolbar
//       },
//       zoom: false,
//     },
//     tooltip: {
//       enabled: true,
//       enabledOnSeries: undefined,
//       shared: true,
//       followCursor: false,
//       intersect: false,
//       inverseOrder: false,
//       custom: ({ series, seriesIndex, dataPointIndex,w }) => {
//         console.log("series",series)
//         console.log('seriesIndex', seriesIndex);
//         console.log('dataPointIndex', dataPointIndex);
//         const item = counterData[dataPointIndex];
//       if (item && item.y && item.y.length >= 2) {
//         const startTime = new Date(item.y[0]);
//         const endTime = new Date(item.y[1]);
//         const formattedStartTime = startTime.toLocaleString(); // Adjust the format as per your requirements
//         const formattedEndTime = endTime.toLocaleString(); // Adjust the format as per your requirements

//         return (
//           '<div className="custom-tooltip">' +
//           '<span>Start Time: ' + startTime+ '</span><br/>' +
//           '<span>End Time: ' + endTime + '</span>' +
//           '</div>'
//         );
//       }

//         // const formattedStartTime = startTime.toLocaleString(); // Adjust the format as per your requirements
//         // const formattedEndTime = endTime.toLocaleString(); // Adjust the format as per your requirements

//         // console.log("formattedStartTime",formattedStartTime
//         console.log("series",series)
//         console.log('seriesIndex', seriesIndex);
//         console.log('dataPointIndex', dataPointIndex);
//         // console.log("series[seriesIndex]",series[seriesIndex])
//         // console.log("series[seriesIndex][dataPointIndex]",series[seriesIndex][dataPointIndex])
//         // console.log("series[seriesIndex][dataPointIndex][start]",series[seriesIndex][dataPointIndex][0])
//         // console.log("series[seriesIndex][dataPointIndex][end]",series[seriesIndex][dataPointIndex][1])
//         // try{
//         //   console.log(w)
//         //   // console.log(series[seriesIndex][dataPointIndex].y[0])
//         // }catch(error){
//         //    console.log(error)
//         // }

//         // console.log(new Date(series[seriesIndex][0]),new Date(series[seriesIndex][dataPointIndex]))
//         // return (
//         //   '<div className="custom-tooltip">' +
//         //   '<span>Start Time: ' + startTime + '</span><br/>' +
//         //   '<span>End Time: ' + endTime + '</span>' +
//         //   '</div>'
//         // );
//       },
//       fillSeriesColor: false,
//       theme: false,
//       style: {
//         fontSize: '12px',
//         fontFamily: undefined
//       },
//       onDatasetHover: {
//         highlightDataSeries: false,
//       },
//       x: {
//         show: true,
//         format: 'dd MMM',
//         formatter: undefined,
//       },
//       y: {
//         formatter: undefined,
//         title: {
//           formatter: (seriesName) => seriesName,
//         },
//       },
//       z: {
//         formatter: undefined,
//         title: 'Size: '
//       },
//       marker: {
//         show: true,
//       },
//       items: {
//         display: "flex",
//       },
//       fixed: {
//         enabled: false,
//         position: 'topRight',
//         offsetX: 0,
//         offsetY: 0,
//       },
//     },
//     plotOptions: {
//       bar: {
//         horizontal: true,
//         distributed: true,
//         rangeBarGroupRows: true,
//       },
//     },
//     xaxis: {
//       type: "datetime",
//       min: new Date(counterData[0].y[0]).setHours(10,0,0,0),
//       max: new Date(counterData[0].y[0]).setHours(22, 0, 0, 0),
//       labels: {
//         format: "HH:mm",
//       },
//       grid: {
//         showLines: true,
//         borderColor: "#e0e0e0",
//         strokeDashArray: 4,
//         position: "back",
//       },
//     },
//     fill: {
//       type: "solid",
//     },

//     colors: counterData.map((item) => item.fillColor),

//     margin: {
//       top: 20,
//       right: 20,
//       bottom: 20,
//       left: 20,
//     },
//   };

//   const series = [
//     {
//       name: "Timeline",
//       data: counterData
//         .map((item, index) => {
//           if (item.y && item.y.length >= 2) {
//             const startTime = new Date(item.y[0]);
//             const endTime = new Date(item.y[1]);

//             if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
//               console.log("Invalid date:", item.y);
//               return null;
//             }

//             return {
//               x: item.x,
//               y: [startTime.getTime(), endTime.getTime()],
//               fillColor: item.fillColor,
//             };
//           } else {
//             console.log("Invalid item:", item);
//             return null;
//           }
//         })
//         .filter((item) => item !== null),
//     },
//   ];
//   // console.log(counterData)

//   return (
//     <div className="demo-chart-container">
//       <div className="demo-chart">
//       <Chart
//   className="chart-main"
//   options={options}
//   series={series}
//   type="rangeBar"
//   height={90}
// />
//       </div>
//     </div>
//   );
// }

// export default DemoChart;

// import React from "react";
// import { Chart } from "react-google-charts";
// import "./componentcss/DemoChart.css";

// function DemoChart({ counterData, counterNumber }) {
//   // Ensure counterData exists before rendering the chart
//   if (!counterData || counterData.length === 0) {
//     return null;
//   }
//   // console.log(counterData)
//   const componentColors = {
//     Invisible: "#ff0000", // Red
//     Employee_Idle: "#00ff00", // Green
//     Engagement_Time: "#0000ff", // Blue
//     Violation: "#ffff00", // Yellow
//     Wait: "#ff00ff", // Magenta
//     Counter_Idle: "#00ffff", // Cyan

//   };
//   // const modifiedData = counterData.map((item) => {
//   //   const startTime = new Date(item[2]);
//   //   const endTime = new Date(item[3]);
//   //   return [item[0], item[1], startTime, endTime, item[4]];
//   // });
//   // console.log(modifiedData)

//   // Convert start time and end time in data array from string to time
//   // counterData.forEach((item) => {
//   //   const startTime = new Date(item[2]);
//   //   const endTime = new Date(item[3]);
//   //   item[2] = startTime;
//   //   item[3] = endTime;
//   // });
//   const modifiedData = counterData.map((item) => {
//     const startTime = new Date(item[2]);
//     const endTime = new Date(item[3]);
//     const color = componentColors[item[1]]; // Get the color based on the Component-Type
//     return [item[0], item[1], startTime, endTime, color];
//   });
//   console.log(modifiedData)

//   return (
//     <div className="demo-chart-container">
//       <div className="demo-chart">
//         {/* Display the counter number */}
//         {/* <div className="empty-grid">
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>
//           <div class="grid-cell"></div>

//         </div> */}
//         <Chart
//           chartType="Timeline"
//           data={[["", "Component_Type", "Start_Time", "End_Time", { role: "style" }], ...modifiedData]}
//           width="100%"
//           height="400px"
//           options={{
//             timeline: {
//               showBarLabels: false,
//               showRowLabels: false,
//             },
//             fontSize: 1,
//             hAxis: {
//               scaleType: "linear",
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default DemoChart;

// const dateString = "2000-01-01T12:00:00.000Z";
// const date = new Date(dateString);
// const data = [
//   [
//     "",
//     "Invisible",
//     new Date(2000, 0, 1, 10, 0, 0),
//     new Date(2000, 0, 1, 10, 0, 0),
//   ],
//   [
//     "",
//     "Employee_Idle",
//     new Date(2000, 0, 1, 10, 0, 0),
//     new Date(2000, 0, 1, 12, 0, 0),
//   ],
//   [
//     "",
//     "Engagement_Time",
//     new Date(2000, 0, 1, 12, 0, 0),
//     new Date(2000, 0, 1, 15, 0, 0),
//   ],
//   [
//     "",
//     "Violation",
//     new Date(2000, 0, 1, 16, 0, 0),
//     new Date(2000, 0, 1, 16, 30, 0),
//   ],
//   [
//     "",
//     "Wait",
//     new Date(2000, 0, 1, 16, 30, 0),
//     new Date(2000, 0, 1, 16, 45, 0),
//   ],
//   [
//     "",
//     "Counter_Idle",
//     new Date(2000, 0, 1, 16, 45, 0),
//     new Date(2000, 0, 1, 16, 55, 0),
//   ],
//   [
//     "",
//     "Engagement_Time",
//     new Date(2000, 0, 1, 17, 0, 0),
//     new Date(2000, 0, 1, 17, 30, 0),
//   ],
//   [
//     "",
//     "Violation",
//     new Date(2000, 0, 1, 18, 0, 0),
//     new Date(2000, 0, 1, 19, 0, 0),
//   ],
//   [
//     "",
//     "Employee_Idle",
//     new Date(2000, 0, 1, 19, 0, 0),
//     new Date(2000, 0, 1, 22, 0, 0),
//   ],
// ];
// const dateNew=[
//   ['', 'Invisible', "Sat Jan 01 2000 10:00:00 GMT+0530 (India Standard Time)", "Sat Jan 01 2000 10:00:00 GMT+0530 (India Standard Time)"],
//   ['', 'Employee_Idle', "Sat Jan 01 2000 10:00:00 GMT+0530 (India Standard Time)"," Sat Jan 01 2000 12:00:00 GMT+0530 (India Standard Time)"],
//   ['', 'Engagement_Time', "Sat Jan 01 2000 12:00:00 GMT+0530 (India Standard Time)", "Sat Jan 01 2000 15:00:00 GMT+0530 (India Standard Time)"],
//   ['', 'Violation'," Sat Jan 01 2000 16:00:00 GMT+0530 (India Standard Time)", "Sat Jan 01 2000 16:30:00 GMT+0530 (India Standard Time)"],
//   ['', 'Wait'," Sat Jan 01 2000 16:30:00 GMT+0530 (India Standard Time)"," Sat Jan 01 2000 16:45:00 GMT+0530 (India Standard Time)"],
//   ['', 'Counter_Idle', "Sat Jan 01 2000 16:45:00 GMT+0530 (India Standard Time)", "Sat Jan 01 2000 16:55:00 GMT+0530 (India Standard Time)"],
//   ['', 'Engagement_Time'," Sat Jan 01 2000 17:00:00 GMT+0530 (India Standard Time)"," Sat Jan 01 2000 17:30:00 GMT+0530 (India Standard Time)"],
//   ['', 'Violation', "Sat Jan 01 2000 18:00:00 GMT+0530 (India Standard Time)"," Sat Jan 01 2000 19:00:00 GMT+0530 (India Standard Time)"],
//   ['', 'Employee_Idle'," Sat Jan 01 2000 19:00:00 GMT+0530 (India Standard Time)", "Sat Jan 01 2000 22:00:00 GMT+0530 (India Standard Time)"],
// ]

// const newData = data.map(([label, start, end]) => [new Date(...start), new Date(...end)]);
// console.log(newData)

// const formattedData = data.map((item) =>
//   item.map((value) => (value instanceof Date ? value.toISOString() : value))
// );
// const jsonData = JSON.stringify(data);
