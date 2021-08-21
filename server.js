// Global Variables
const port = 4000;
const hostname = "127.0.0.1";
const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

// Configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup server
myData = [];
app.get("/full", (request, response) => response.send(myData));
app.post("/join", (request, response) => {
  myData = request.body;
});

// Listen to port
app.listen(port);