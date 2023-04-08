"use strict";
console.log("pp");
const API_KEY = "03fe1538c61eb075c2b0eaa4404056ad";
async function showWeather() {
  const city = "goa";

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  );
  const data = await response.json();
  //console.log("Weather Data =>" + data);
  console.log("Weather Data =>", data);

  let newPara = document.createElement("p");
  newPara.textContent = `${data?.main?.temp.toFixed(2)}`;
  document.body.appendChild(newPara);
}

showWeather();
