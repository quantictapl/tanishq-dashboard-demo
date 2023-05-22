const calculateMostVisitedCounters = (jsonData) => {
    const mostVisitedCounters = Object.keys(jsonData.analytics.most_visited || {}).map((key) => key.split("_")[1]);
    console.log("Most Visited Counters:", mostVisitedCounters);
    return mostVisitedCounters;
  };
  
  // Function to calculate least visited counters
  const calculateLeastVisitedCounters = (jsonData) => {
    const leastVisitedCounters = Object.keys(jsonData.analytics.least_visited || {}).map((key) => key.split("_")[1]);
    console.log("Least Visited Counters:", leastVisitedCounters);
    return leastVisitedCounters;
  };