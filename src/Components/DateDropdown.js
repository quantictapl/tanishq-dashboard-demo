// import React, { useEffect, useState } from 'react';
// import "./componentcss/DateDropdown.css"

// function DateDropdown({ onDateChange }) {
//   const [dates, setDates] = useState([]);

//   useEffect(() => {
//     fetchDates();
//   }, []);

//   const fetchDates = () => {
//     fetch("http://localhost:5001/data")
//       .then(response => response.json())
//       .then(jsonData => {
//         const fileNames = jsonData.dates;
//         setDates(fileNames);
//       })
//       .catch(error => console.log("Error fetching dates:", error));
//   };

//   const handleSelectChange = (event) => {
//     const selectedDate = event.target.value;
//     onDateChange(selectedDate);
//   };

//   return (
//     <select defaultValue="" className="date-dropdown" onChange={handleSelectChange}>
//       <option value="" disabled>
//         Select Date
//       </option>
//       {dates.map((date, index) => (
//         <option key={index} value={date}>
//           {date}
//         </option>
//       ))}
//     </select>
//   );
// }

// export default DateDropdown;

import React, { useEffect, useState } from 'react';
import { fetchDates } from './FetchDates';
import "./componentcss/DateDropdown.css";

function DateDropdown({ onDateChange }) {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Pad the month and day with leading zeros if necessary
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const fetchedDates = await fetchDates();
    setDates(fetchedDates);
    const todayDate = getTodayDate();
    if (!fetchedDates.includes(todayDate)) {
      const previousDate = getPreviousDate(todayDate);
      if (!fetchedDates.includes(previousDate)) {
        const closestDate = getClosestDate(fetchedDates, todayDate);
        setSelectedDate(closestDate);
        onDateChange(closestDate);
      } else {
        setSelectedDate(previousDate);
        onDateChange(previousDate);
      }
    } else {
      setSelectedDate(todayDate);
      onDateChange(todayDate);
    }
  };

  const getPreviousDate = (date) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    // Pad the month and day with leading zeros if necessary
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const getClosestDate = (dates, targetDate) => {
    const targetTimestamp = new Date(targetDate).getTime();

    const closestDate = dates.reduce((closest, date) => {
      const dateTimestamp = new Date(date).getTime();
      const closestTimestamp = new Date(closest).getTime();

      return Math.abs(dateTimestamp - targetTimestamp) < Math.abs(closestTimestamp - targetTimestamp)
        ? date
        : closest;
    });

    return closestDate;
  };

  const handleSelectChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    onDateChange(selectedDate);
  };

  return (
    <select value={selectedDate} className="date-dropdown" onChange={handleSelectChange}>
      <option value="" disabled>
        Select Date
      </option>
      {dates.map((date, index) => (
        <option key={index} value={date}>
          {date}
        </option>
      ))}
    </select>
  );
}

export default DateDropdown;