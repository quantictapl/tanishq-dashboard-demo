export async function fetchDates() {
    try {
      const response = await fetch("http://localhost:7000/data");
      // const response = await fetch("http://65.1.136.24/:7000/data");      
      const jsonData = await response.json();
      return jsonData.dates;
    } catch (error) {
      console.log("Error fetching dates:", error);
      return [];
    }
  }