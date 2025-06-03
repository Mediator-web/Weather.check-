const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const resultDiv = document.getElementById('weatherResult');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  const apiKey = '6daa2564ad76a42d839a44d1cd627529'; // Replace with your actual OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  resultDiv.innerHTML = 'Loading...';

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temp: ${data.main.temp}°C</p>
        <p>☁️ Weather: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
      `;
    } else {
      resultDiv.innerHTML = '<p>City not found. Try again.</p>';
    }
  } catch (error) {
    resultDiv.innerHTML = '<p>Error fetching data.</p>';
  }
}
