document.addEventListener('DOMContentLoaded', function() {
    // DOM 
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const cityName = document.getElementById('city-name');
    const currentDate = document.getElementById('current-date');
    const weatherIcon = document.getElementById('weather-icon');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const weatherDescription = document.getElementById('weather-description');
    const forecastContainer = document.getElementById('forecast-container');

    // API Key! from WeatherApifree 
    const API_KEY = "dba86846cf66437c82f130854252304";
    
    // default city
    fetchWeather('London');
    

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });
    
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeather(city);
            }
        }
    });
    
    // Update the date
    updateDate();
    
    // Functionssssss
    function updateDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDate.textContent = now.toLocaleDateString('en-US', options);
    }
    
    function fetchWeather(city) {
        // Weather now using WeatherAPI bimbimibim so easy with APIIIII!!!!
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=dba86846cf66437c82f130854252304&q=${city}&days=5`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                displayCurrentWeather(data);
                displayForecast(data.forecast.forecastday);
            })
            .catch(error => {
                alert(error.message);
                console.error('Error:', error);
            });
    }
    
    function displayCurrentWeather(data) {
        cityName.textContent = `${data.location.name}, ${data.location.country}`;
        temperature.textContent = `${Math.round(data.current.temp_c)}°C`;
        humidity.textContent = `${data.current.humidity}%`;
        windSpeed.textContent = `${Math.round(data.current.wind_kph)} km/h`;
        weatherDescription.textContent = data.current.condition.text;
        
        // Update weather icon
        weatherIcon.innerHTML = `<img src="${data.current.condition.icon}" alt="${data.current.condition.text}">`;
    }
    
    function displayForecast(forecastDays) {
        // Clear forecast
        forecastContainer.innerHTML = '';
        
        // want future days
        forecastDays.forEach(day => {
            const date = new Date(day.date);
            const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <div class="forecast-day">${weekday}</div>
                <div class="forecast-icon"><img src="${day.day.condition.icon}" alt="${day.day.condition.text}"></div>
                <div class="forecast-temp">${Math.round(day.day.avgtemp_c)}°C</div>
            `;
            
            forecastContainer.appendChild(forecastItem);
        });
    }
});


