
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





// Update the current weather section
function updateCurrentWeather(data) {
    document.getElementById("current_weather").classList.remove("hidden");
    document.getElementById("location").textContent = `${
      data.name
    }(${new Date().toLocaleDateString()})`;
    document.getElementById("temperature").textContent =
      data.main.temp.toFixed(2);
    document.getElementById("wind").textContent = data.wind.speed;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("description").textContent =
      data.weather[0].description;
    document.getElementById(
      "weather_image"
    ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById("weather_image").classList.remove("hidden");
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
    dropdown.classList.add("hidden");
    getCurrentLocation();
  });


  document
  .getElementById("dropdown_recent_searches")
  .addEventListener("click", () => {
    const dropdown = document.getElementById("recent_searches");
    dropdown.classList.toggle("hidden");
  });

window.onload = () => {
    updateRecentCitiesDropdown();
    getCurrentLocation();
  };