"use strict";
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(
  ".grant-location-container"
);
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const errorContainer = document.querySelector(".error-container");

//Initial Variables
let currentTab = userTab;
const API_KEY = "03fe1538c61eb075c2b0eaa4404056ad";
currentTab.classList.add("current-tab");
//while loading the screen first time, we need to if we coordinates are present or not?
getFromSessionStorage();

function switchTab(clickedTab) {
  if (clickedTab != currentTab) {
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");

    if (!searchForm.classList.contains("active")) {
      //If searchForm container is invisible then make it visible
      //clear the search field first
      searchInput.value = "";
      userInfoContainer.classList.remove("active");
      grantAccessContainer.remove("active");
      searchForm.classList.add("active");
    } else {
      //In Else means, SearchForm was already active and now we are making yourWeatherTab active
      searchForm.classList.remove("active");
      userInfoContainer.classList.remove("active");
      //As now we are in yourWeatherTab, then we also need to display the weather so lets
      //check local storage first for coordinates, If we have saved them there?
      getFromSessionStorage();
    }
  } else {
  }
}

//check if coordinates are already present in session storage or not?
function getFromSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if (!localCoordinates) {
    //If local coordinates are not present (means we have not given access)
    //we need to show grant access screen
    grantAccessContainer.classList.add("active");
  } else {
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
  }
}

async function fetchUserWeatherInfo(coordinates) {
  const { lat, lon } = coordinates;
  //make grant container invisible
  grantAccessContainer.classList.remove("active");
  //make loader visible
  loadingScreen.classList.add("active");

  // API CALL
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    //As we have got the data from API call, so now we need to hide loading scrren and need to display data
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    errorContainer.classList.remove("active");
    renderWeatherInfo(data);
  } catch (e) {
    handleError();
  }
}

//Render the Response in UI
function renderWeatherInfo(weatherInfo) {
  //Fetch the elements first from UI
  const cityName = document.querySelector("[data-cityName]");
  const countryIcon = document.querySelector("[data-countryIcon]");
  const desc = document.querySelector("[data-weatherDesc]");
  const weatherIcon = document.querySelector("[data-weatherIcon]");
  const temp = document.querySelector("[data-temp]");
  const windSpeed = document.querySelector("[data-windspeed]");
  const humidity = document.querySelector("[data-humidity]");
  const cloud = document.querySelector("[data-clouds]");

  //fetch values from userInfo objects and put in UI elements
  cityName.innerText = weatherInfo?.name;
  countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
  desc.innerText = weatherInfo?.weather?.[0]?.description;
  weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
  temp.innerText = `${weatherInfo?.main?.temp} °C`;
  windSpeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
  humidity.innerText = `${weatherInfo?.main?.humidity} %`;
  cloud.innerText = `${weatherInfo?.clouds?.all} %`;
}

userTab.addEventListener("click", () => {
  // pass clicked tab as input parameter
  switchTab(userTab);
});

searchTab.addEventListener("click", () => {
  // pass clicked tab as input parameter
  switchTab(searchTab);
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by browser");
    //Show an alert for no geolocation support available
  }
}

function showPosition(position) {
  const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };
  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
  fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

//Search
let searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // use of constant and always trim the input remove white spaces.
  const cityName = searchInput.value.trim();

  if (cityName === "") return;
  else fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(cityName) {
  loadingScreen.classList.add("active");
  userInfoContainer.classList.remove("active");
  grantAccessContainer.classList.remove("active");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    if (data?.cod === "404") {
      throw Error;
    } else {
      loadingScreen.classList.remove("active");
      userInfoContainer.classList.add("active");
      errorContainer.classList.remove("active");
      renderWeatherInfo(data);
    }
  } catch (err) {
    handleError();
  }
}

function handleError() {
  userInfoContainer.classList.remove("active");
  loadingScreen.classList.remove("active");
  errorContainer.classList.add("active");
}
