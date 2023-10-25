export async function fetchDates() {
    try {
      const fetchLink = process.env.REACT_APP_FETCH_LINK;
       //const response = await fetch("http://localhost:7000/data");
      const response = await fetch(fetchLink);
      // const response = await fetch("http://15.207.16.236:7000/data");      
      const jsonData = await response.json();
      return jsonData.dates;
    } catch (error) {
      console.log("Error fetching dates:", error);
      return [];
    }
  }