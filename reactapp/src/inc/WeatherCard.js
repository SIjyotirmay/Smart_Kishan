import React from 'react';
import './WeatherCard.css';

function WeatherCard({ weather, locationError }) {
  if (locationError) {
    return <div className="weather-error">{locationError}</div>;
  }

  if (!weather) return null;

  const { name, main, weather: weatherArr, wind } = weather;
  const { temp, humidity } = main;
  const { description, icon } = weatherArr[0];

  return (
    <div className="weather-card">
      <h3>Weather in {name}</h3>
      <div className="weather-info">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
        />
        <div>
          <p><strong>Temperature:</strong> {temp}°C</p>
          <p><strong>Humidity:</strong> {humidity}%</p>
          <p><strong>Wind:</strong> {wind.speed} m/s</p>
          <p><strong>Description:</strong> {description}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
