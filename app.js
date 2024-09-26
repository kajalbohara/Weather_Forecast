
let recentSearchCities =
  JSON.parse(localStorage.getItem("recentSearchCities")) || [];

// Fetching weather data by city name
function getWeatherData(city) {
  if (!recentSearchCities.includes(city)) {
    recentSearchCities.push(city);
    localStorage.setItem(
      "recentSearchCities",
      JSON.stringify(recentSearchCities)
    );
    updateRecentCitiesDropdown();
  }
}


  // To get current location and it will automatic taken when page load
function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WeatherApiKey}&units=metric`;
  
          fetch(locationUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data.cod === 200) {
                updateCurrentWeather(data);
                return fetch(
                  `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WeatherApiKey}&units=metric`
                );
              }
            })
            .then((response) => response.json())
            .then((data) => {
              if (data.cod === "200") {
                updateForecastData(data);
              }
            })
            .catch((error) => console.error("Error:", error));
        },
        () => {
          alert("Access denied. Please enter a city name.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  document.getElementById("Search_place").addEventListener("click", () => {
    const city = document.getElementById("location_input").value;
    getWeatherData(city);
  });
  
  document.getElementById("current_location").addEventListener("click", () => {
    const dropdown = document.getElementById("recent_searches");
    
    getCurrentLocation();
  });




























window.onload = () => {
    updateRecentCitiesDropdown();
    getCurrentLocation();
  };