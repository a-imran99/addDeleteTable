// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// file where data is stored
const DATA_FILE = "./tableData.json";

// helper to read data
const getData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const raw = fs.readFileSync(DATA_FILE);
  return JSON.parse(raw);
};

// helper to save data
const saveData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// API to get table data
app.get("/api/table", (req, res) => {
  res.json(getData());
});

// API to update table data (admin)
app.post("/api/table", (req, res) => {
  const newData = req.body; // expects array of objects
  saveData(newData);
  res.json({ message: "Table updated successfully", data: newData });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
