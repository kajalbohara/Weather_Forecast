# Weather Forecasting Application 🌤️

Welcome to the **Weather Forecasting Application**! This project allows users to search for current weather conditions and a 5-day forecast by city or using their current location. Built with **HTML**, **Tailwind CSS**, and **JavaScript**, this app fetches data from the **OpenWeatherMap API** and dynamically displays it on the user interface.

## Features 🌟

- **Current Weather**: Displays the current temperature, wind speed, humidity, and a brief description of weather conditions based on the selected city or current location.
- **5-Day Forecast**: Provides weather predictions for the next five days, including temperature, wind speed, humidity, and weather description.
- **Recent Searches**: Keeps a history of recently searched cities, allowing users to quickly revisit them.
- **Current Location Search**: Automatically fetches weather data for the user's current location using geolocation.

## Screenshots 📸

### Home Page
![Home Page](assets\img-1.jpeg)
*Showcases the initial landing page where users can input a city or select "Use Current Location."*

![Recent Search](assets\img-2.jpeg)
*Displays the interface after the user searches for a city's weather.*


## How to Use 🛠️

1. **Search by City**: Enter the name of the city in the input box and click the "Search" button to view the current weather and 5-day forecast.
2. **Use Current Location**: Click the "Use Current Location" button to automatically fetch the weather data for your current location.
3. **View Recent Searches**: Click the "Recently Searched Cities" button to view and select from the list of cities you've previously searched.



## Installation and Setup ⚙️

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/kajalbohara/Weather_Forecast.git
    ```

2. Navigate into the project directory:

    ```bash
    cd weather-app
    ```

3. Open the `index.html` file in your browser to start using the app.


## Technologies Used 🛠️

- **HTML**: Structuring the content of the application.
- **Tailwind CSS**: For styling the application, including responsiveness and design elements.
- **JavaScript**: Handling data fetching from the OpenWeatherMap API and updating the UI.
- **OpenWeatherMap API**: To retrieve weather data.

## Code Structure 📂

- `index.html`: The main HTML file that includes the layout and structure of the app.
- `app.js`: The main JavaScript file that handles fetching data from the API and updating the DOM.
- `tailwind.css`: Tailwind CSS is loaded via CDN for rapid UI design and customization.

## API Integration 🌍

This application uses the **OpenWeatherMap API** to fetch the current weather and forecast data. You will need an API key to run the project. Replace the placeholder in `app.js` with your own API key:

```javascript
const WeatherApiKey = "your_api_key_here";







