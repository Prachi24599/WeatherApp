//Initial Variables
let currentTab = userTab;
const API_KEY = "03fe1538c61eb075c2b0eaa4404056ad";
currentTab.classList.add("current-tab");

function switchTab(clickedTab) {
  if (clickedTab != currentTab) {
    currentTab.classList.remove("current-tab");
    currentTab = clickedTab;
    currentTab.classList.add("current-tab");
  } else {
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
