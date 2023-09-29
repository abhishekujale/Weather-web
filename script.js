document.addEventListener("DOMContentLoaded", () => {
    const apiKey = 'ee99fe2048a4d0ac85e3fece74271bc3'; // Replace with your actual API key
    const locationInput = document.getElementById("locationInput");
    const getWeatherButton = document.getElementById("getWeatherButton");
    const errorDisplay = document.getElementById("errorDisplay");
    const weatherDisplay = document.getElementById("weatherDisplay");
    const unitToggle = document.getElementById("unitToggle");

    getWeatherButton.addEventListener("click", () => {
        const location = locationInput.value;
        const units = document.querySelector('input[name="units"]:checked').value;
        getWeatherData(location, units);
    });

    function getWeatherData(location, units) {
        // Clear previous error messages and weather data
        errorDisplay.textContent = "";
        weatherDisplay.textContent = "";

        // Make an AJAX request to the weather API
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Location not found or API request failed.");
                }
                return response.json();
            })
            .then((data) => {
                // Display weather data
                const weatherInfo = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: ${data.main.temp} °${units === 'metric' ? 'C' : 'F'}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                    <p>Weather: ${data.weather[0].description}</p>
                `;
                weatherDisplay.innerHTML = weatherInfo;
            })
            .catch((error) => {
                // Display error message
                errorDisplay.textContent = error.message;
            });
    }
});
