// const express = require("express");
// const app = express();
// const port = 5001;
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");

// app.use(cors());

// app.get("/data/:date", (req, res) => {
//   const { date } = req.params;

//   // Replace the folderPath with the actual path to your folder
//   const folderPath = "C:/VsCode/tanishq/Dates/";

//   // Set the file path by concatenating the folder path and the file name
//   const filePath = path.join(folderPath, `${date}.json`);

//   // Set CORS headers
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//   // Check if the file exists
//   if (fs.existsSync(filePath)) {
//     // Serve the JSON file
//     res.sendFile(filePath);
//   } else {
//     res.status(404).json({ error: "File not found" });
//   }
// });

// app.get("/data", (req, res) => {
//   // Replace the folderPath with the actual path to your folder
//   const folderPath = "C:/VsCode/tanishq/Dates/";

//   fs.readdir(folderPath, (err, files) => {
//     if (err) {
//       console.log("Error reading directory:", err);
//       res.status(500).json({ error: "Internal Server Error" });
//     } else {
//       const jsonFiles = files.filter(file => file.endsWith(".json"));
//       const dates = jsonFiles.map(file => file.replace(".json", ""));
//       res.json({ dates });
//     }
//   });
// });

// app.listen(port, () => {
//   console.log("Server is running on port 5001");
// });

const express = require('express');
const app = express();
const port = 7000;
const cors = require('cors');
const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: 'AKIA24ADS5JH6NXSW3IR',
  secretAccessKey: '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',
  region: 'ap-south-1'
});

const s3 = new AWS.S3();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/data/:date', (req, res) => {
  const { date } = req.params;
  const bucketName = 'tansihq-demo';
  const fileKey = `${date}.json`;
  console.log(fileKey);

  const params = {
    Bucket: bucketName,
    Key: fileKey,
    ContentType: "application/json",
  };

  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  s3.getObject(params, (err, data) => {
    if (err) {
      console.log('Error fetching file:', err);
      res.status(404).json({ error: 'File not found' });
    } else {
      const jsonData = JSON.parse(data.Body.toString());
      res.json(jsonData);
    }
  });
});

app.get('/data', (req, res) => {
  const bucketName = 'tansihq-demo';
  const prefix = ''; // Updated prefix

  const params = {
    Bucket: bucketName,
    Prefix: prefix,
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.log('Error listing objects:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const jsonFiles = data.Contents.map((object) =>
        object.Key.replace('.json', '') // Removed prefix and file extension
      );
      console.log(jsonFiles); // Log the retrieved file names
      res.json({ dates: jsonFiles });
    }
  });
});

app.listen(port, () => {
  console.log('Server is running on aws');
});
// ACCESS_KEY = 'AKIA24ADS5JH6NXSW3IR'
// SECRET_KEY = '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'