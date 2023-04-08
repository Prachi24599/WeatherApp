"use strict";
console.log("pp");
const API_KEY = "03fe1538c61eb075c2b0eaa4404056ad";

function renderWeatherInfo(data) {
  let newPara = document.createElement("p");
  newPara.textContent = `${data?.main?.temp.toFixed(2)}`;
  document.body.appendChild(newPara);
}

async function fetchWeatherDetails() {
  try {
    const city = "goa";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const data = await response.json();
    //console.log("Weather Data =>" + data);
    console.log("Weather Data =>", data);

    renderWeatherInfo(data);
  } catch (e) {
    //handle error
    console.log(e);
  }
}

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

async function getCustomWeatherDetails() {
  try {
    let lon = 17.6333;
    let lat = 18.3333;

    let result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    let data = await result.json();
    console.log(data);
    renderWeatherInfo(data);
  } catch (e) {
    console.log("Error Found", err);
  }
}
