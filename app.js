const WeatherApiKey = "cc4ef85a979bae9dd10466981756d463";
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

  const currentWeatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WeatherApiKey}&units=metric`;
  const forecastLink = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WeatherApiKey}&units=metric`;

  fetch(currentWeatherLink)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        updateCurrentWeather(data);
        return fetch(forecastLink);
      } else {
        alert(data.message);
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "200") {
        updateForecastData(data);
      }
    })
    .catch((error) => console.error("Error:", error));
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

// Update the forecast section
function updateForecastData(data) {
  const forecastDetails = document.getElementById("weather_forcast");
  forecastDetails.innerHTML = "";
  console.log(data);
  const forecasts = data.list.filter((f) => f.dt_txt.includes("00:00:00"));

  forecasts.forEach((forecast) => {
    const card = document.createElement("div");
    card.className =
      " h-94 bg-gradient-to-b from-blue-600 to-teal-400 glass gradient-bg text-white text-center p-4 rounded-lg shadow-lg "; // Updated class names
    card.innerHTML = `
            <h2 class="font-semibold">${new Date(
              forecast.dt * 1000
            ).toLocaleDateString()}</h2>
            <div class="my-2">
                <img src="https://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }.png" alt="Weather Icon" class="w-16 mx-auto">
            </div>
            <p>Temp: <span class="font-bold">${forecast.main.temp.toFixed(
              2
            )}</span>&deg;C.</p>
            <p>Wind: <span class="font-bold">${
              forecast.wind.speed
            }</span> M/S</p>
            <p>Humidity: <span class="font-bold">${
              forecast.main.humidity
            }</span>%</p>
        `;
    forecastDetails.appendChild(card);
  });
}

// Update the recent cities in dropdown menu
function updateRecentCitiesDropdown() {
  const dropdown = document.getElementById("recent_searches");
  dropdown.innerHTML = "";

  recentSearchCities.forEach((city) => {
    const listItem = document.createElement("li");
    listItem.textContent = city;
    listItem.className = "py-2 px-4 hover:bg-gray-300 cursor-pointer";

    listItem.addEventListener("click", () => {
      getWeatherData(city);
      dropdown.classList.add("hidden");
    });

    dropdown.appendChild(listItem);
  });
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
