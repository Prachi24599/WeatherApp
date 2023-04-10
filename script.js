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

//Initial Variables
let currentTab = userTab;
const API_KEY = "03fe1538c61eb075c2b0eaa4404056ad";
currentTab.classList.add("current-tab");

function switchTab(clickedTab) {
  if (clickedTab != currentTab) {
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");

    if (!searchForm.classList.contains("active")) {
      //If searchForm container is invisible then make it visible
      userContainer.classList.remove("active");
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

userTab.addEventListener("click", () => {
  // pass clicked tab as input parameter
  switchTab(userTab);
});

searchTab.addEventListener("click", () => {
  // pass clicked tab as input parameter
  switchTab(searchTab);
});
