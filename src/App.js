import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "53b2bd3136b74b4e99b91136262702";

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      setWeather(data.current);
    } catch {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p>Loading data...</p>}

      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weather.temp_c}°C</p>
          </div>

          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weather.humidity}%</p>
          </div>

          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weather.condition.text}</p>
          </div>

          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weather.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;