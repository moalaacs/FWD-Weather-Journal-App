// Global variables
const server = "http://127.0.0.1:4000";
const openURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=78c3ee6ef4afee66b61c223a417080f1&units=metric";

// Creating a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/'+ d.getDate()+'/'+ d.getFullYear();

// Get data from user input
const getData = () => { 
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

// Get data from API
  const getWeatherData = async (zip) => {
  const response = await fetch(openURL + zip + apiKey);
  const data = await response.json();
  return data;
};

// Get weather data
  getWeatherData(zip).then((weatherData) => {
    if (weatherData) {
      const {main: { temp },name: city,weather: [{ description }]} = weatherData;
      const zipInfo = {newDate,city,temp,description,feelings};
      postWeatherData(server + "/join", zipInfo);
      updateUI();
    }
  });

// Post weather data
const postWeatherData = async (url = "", info = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
    const newData = await response.json();
    return newData;
}};

// Show final data on screen
document.getElementById("generate").addEventListener("click", getData);
const updateUI = async () => {
    const request = await fetch(server + "/full");
    const allData = await request.json();
    document.getElementById("city").innerHTML = allData.city;
    document.getElementById("temp").innerHTML = allData.temp + '&degC';
    document.getElementById("description").innerHTML = allData.description;
    document.getElementById("content").innerHTML = allData.feelings;
    document.getElementById("date").innerHTML = allData.newDate
};
