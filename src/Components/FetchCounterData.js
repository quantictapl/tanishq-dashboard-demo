// let data = null;

// export const fetchData = (date) => {
//   return fetch(`http://localhost:5001/data/${date}`)
//     .then((response) => response.json())
//     .then((jsonData) => {
//       data = jsonData;
//       return jsonData;
//     })
//     .catch((error) => {
//       console.log("Error fetching JSON data:", error);
//       return null;
//     });
// };

// export const getData = () => {
//   return data;
// };
let data = null;

export const fetchData = (date) => {
  return fetch(`https://tansihq-demo.s3.ap-south-1.amazonaws.com/${date}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((jsonData) => {
      data = jsonData; // Store the fetched data in the data variable
      return jsonData;
    })
    .catch((error) => {
      console.log("Error fetching JSON data:", error);
      return null;
    });
};

export const getData = () => {
  return data;
};