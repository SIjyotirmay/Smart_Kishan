import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  const apiKey = "2292453323d33ed93cc40a527de5ff19";

  useEffect(() => {
    const fetchWeatherData = async (lat, lon) => {
      try {
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        const [currentRes, forecastRes] = await Promise.all([
          fetch(currentUrl),
          fetch(forecastUrl)
        ]);

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        const dailyForecast = forecastData.list
          .filter((_, index) => index % 8 === 0)
          .slice(0, 5)
          .map((item, idx) => ({
            date: idx === 0 ? 'Today' : new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
            high: Math.round(item.main.temp_max),
            low: Math.round(item.main.temp_min),
            condition: item.weather[0].main,
            icon: item.weather[0].main.toLowerCase(),
            precipitation: Math.round(item.pop * 100)
          }));

        setWeather({
          temperature: Math.round(currentData.main.temp),
          condition: currentData.weather[0].main,
          humidity: currentData.main.humidity,
          windSpeed: currentData.wind.speed,
          visibility: currentData.visibility / 1000,
          icon: currentData.weather[0].main.toLowerCase(),
          location: currentData.name
        });

        setForecast(dailyForecast);
      } catch (error) {
        console.error("Weather fetch error:", error);
        setLocationError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (err) => {
          console.error("Location error:", err);
          setLocationError("Location access denied or unavailable.");
          fetchWeatherData(28.6139, 77.2090); // Fallback to Delhi
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []);

  const getWeatherIcon = (type) => {
    const icons = {
      clear: '☀️',
      clouds: '☁️',
      rain: '🌧️',
      drizzle: '🌦️',
      thunderstorm: '⛈️',
      snow: '❄️',
      mist: '🌫️'
    };
    return icons[type] || '☀️';
  };

  if (loading) {
    return (
      <div className="weather-widget loading">
        <div className="weather-header">
          <div className="loading-bar"></div>
          <div className="loading-bar short"></div>
        </div>
        <div className="weather-current">
          <div className="loading-circle"></div>
          <div className="loading-bars">
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
          </div>
        </div>
        <div className="weather-details">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="loading-detail">
              <div className="loading-bar short"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (locationError) {
    return <div className="weather-widget error">{locationError}</div>;
  }

  if (!weather) return null;

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <h2 className="weather-title">Weather Forecast</h2>
      </div>

      <div className="weather-current">
        <div className="current-main">
          <div className="current-temp-section">
            <span className="current-icon">{getWeatherIcon(weather.icon)}</span>
            <div className="current-temp-info">
              <p className="current-temp">{weather.temperature}°C</p>
              <p className="current-condition">{weather.condition}</p>
            </div>
          </div>
          <div className="current-location">
            <p className="location-text">{weather.location}</p>
            <p className="update-time">Last updated: Just now</p>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-card humidity">
            <div className="detail-header">
              <span className="detail-icon">💧</span>
              <span className="detail-label">Humidity</span>
            </div>
            <p className="detail-value">{weather.humidity}%</p>
          </div>
          <div className="detail-card wind">
            <div className="detail-header">
              <span className="detail-icon">💨</span>
              <span className="detail-label">Wind Speed</span>
            </div>
            <p className="detail-value">{weather.windSpeed} km/h</p>
          </div>
          <div className="detail-card visibility">
            <div className="detail-header">
              <span className="detail-icon">👁️</span>
              <span className="detail-label">Visibility</span>
            </div>
            <p className="detail-value">{weather.visibility} km</p>
          </div>
          <div className="detail-card feels-like">
            <div className="detail-header">
              <span className="detail-icon">🌡️</span>
              <span className="detail-label">Feels Like</span>
            </div>
            <p className="detail-value">{weather.temperature}°C</p>
          </div>
        </div>
      </div>

      <div className="weather-forecast">
        <h3 className="forecast-title">5-Day Forecast</h3>
        <div className="forecast-grid">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-day">
              <p className="forecast-date">{day.date}</p>
              <div className="forecast-icon">{getWeatherIcon(day.icon)}</div>
              <div className="forecast-temps">
                <p className="forecast-high">{day.high}°</p>
                <p className="forecast-low">{day.low}°</p>
                <p className="forecast-rain">{day.precipitation}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;



// import React, { useState, useEffect } from 'react';
// import './WeatherWidget.css';

// const WeatherWidget = () => {
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [locationError, setLocationError] = useState(null);

//   const apiKey = "2292453323d33ed93cc40a527de5ff19";

//   useEffect(() => {
//     const fetchWeatherData = async (lat, lon) => {
//       try {
//         const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
//         const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

//         const [currentRes, forecastRes] = await Promise.all([
//           fetch(currentUrl),
//           fetch(forecastUrl)
//         ]);

//         const currentData = await currentRes.json();
//         const forecastData = await forecastRes.json();

//         const dailyForecast = forecastData.list
//           .filter((_, index) => index % 8 === 0)
//           .slice(0, 5)
//           .map((item, idx) => ({
//             date: idx === 0 ? 'Today' : new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
//             high: Math.round(item.main.temp_max),
//             low: Math.round(item.main.temp_min),
//             condition: item.weather[0].main,
//             icon: item.weather[0].main.toLowerCase(),
//             precipitation: Math.round(item.pop * 100)
//           }));

//         setWeather({
//           temperature: Math.round(currentData.main.temp),
//           condition: currentData.weather[0].main,
//           humidity: currentData.main.humidity,
//           windSpeed: currentData.wind.speed,
//           visibility: currentData.visibility / 1000,
//           icon: currentData.weather[0].main.toLowerCase(),
//           location: currentData.name
//         });

//         setForecast(dailyForecast);
//       } catch (error) {
//         console.error("Weather fetch error:", error);
//         setLocationError("Failed to fetch weather data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           fetchWeatherData(latitude, longitude);
//         },
//         (err) => {
//           console.error("Location error:", err);
//           setLocationError("Location access denied or unavailable.");
//           fetchWeatherData(28.6139, 77.2090); // Delhi fallback
//         }
//       );
//     } else {
//       setLocationError("Geolocation is not supported by your browser.");
//     }
//   }, []);

//   const getWeatherIcon = (type) => {
//     const icons = {
//       clear: '☀️',
//       clouds: '☁️',
//       rain: '🌧️',
//       drizzle: '🌦️',
//       thunderstorm: '⛈️',
//       snow: '❄️',
//       mist: '🌫️'
//     };
//     return icons[type] || '☀️';
//   };

//   if (loading) return <div className="weather-widget">Loading weather...</div>;
//   if (locationError) return <div className="weather-widget error">{locationError}</div>;
//   if (!weather) return null;

//   return (
//     <div className="weather-widget">
//       <div className="weather-header">
//         <h2>Weather Forecast</h2>
//         <p className="location-text">{weather.location}</p>
//       </div>

//       <div className="weather-current">
//         <div className="current-temp-section">
//           <span className="current-icon">{getWeatherIcon(weather.icon)}</span>
//           <div className="current-temp-info">
//             <p className="current-temp">{weather.temperature}°C</p>
//             <p className="current-condition">{weather.condition}</p>
//           </div>
//         </div>
//         <div className="weather-details">
//           <div><strong>Humidity:</strong> {weather.humidity}%</div>
//           <div><strong>Wind:</strong> {weather.windSpeed} km/h</div>
//           <div><strong>Visibility:</strong> {weather.visibility} km</div>
//         </div>
//       </div>

//       <div className="weather-forecast">
//         <h3>5-Day Forecast</h3>
//         <div className="forecast-grid">
//           {forecast.map((day, i) => (
//             <div key={i} className="forecast-day">
//               <p>{day.date}</p>
//               <p>{getWeatherIcon(day.icon)}</p>
//               <p>H: {day.high}°C</p>
//               <p>L: {day.low}°C</p>
//               <p>{day.precipitation}% rain</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeatherWidget;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './WeatherWidget.css';

// const WeatherWidget = () => {
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           lat: position.coords.latitude,
//           lon: position.coords.longitude
//         });
//       },
//       (error) => {
//         console.warn("Location permission denied or unavailable. Using default location.");
//         // Fallback to Delhi if user blocks location
//         setLocation({ lat: 28.6139, lon: 77.2090 });
//       }
//     );
//   }, []);

//   useEffect(() => {
//     const fetchWeather = async () => {
//       if (!location) return;

//       try {
//         const API_KEY = "66e3e48dfafe355c0833e6c52c63f811"
//         const API = "2292453323d33ed93cc40a527de5ff19";

//         const [currentRes, forecastRes] = await Promise.all([
//           axios.get(`api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`),
//           axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API}`),
           
//         ]);

//         const current = currentRes.data;
//         const forecastList = forecastRes.data.list;

//         const forecast = forecastList
//           .filter((_, index) => index % 8 === 0)
//           .slice(0, 10)
//           .map((item, idx) => ({
//             date: idx === 0 ? 'Today' : new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
//             high: Math.round(item.main.temp_max),
//             low: Math.round(item.main.temp_min),
//             condition: item.weather[0].main,
//             icon: item.weather[0].main.toLowerCase(),
//             precipitation: Math.round(item.pop * 100)
//           }));

//         const weatherData = {
//           current: {
//             temperature: Math.round(current.main.temp),
//             condition: current.weather[0].main,
//             humidity: current.main.humidity,
//             windSpeed: current.wind.speed,
//             visibility: current.visibility / 1000,
//             icon: current.weather[0].main.toLowerCase(),
//             location: current.name
//           },
//           forecast
//         };

//         setWeather(weatherData);
//       } catch (error) {
//         console.error('Error fetching weather:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeather();
//   }, [location]);

//   const getWeatherIcon = (iconType) => {
//     const icons = {
//       'clear': '☀️',
//       'clouds': '☁️',
//       'partly-cloudy': '⛅',
//       'rain': '🌧️',
//       'drizzle': '🌦️',
//       'thunderstorm': '⛈️',
//       'snow': '❄️',
//       'mist': '🌫️'
//     };
//     return icons[iconType] || '☀️';
//   };

//   if (loading) {
//     return (
//       <div className="weather-widget loading">
//         <div className="weather-header">
//           <div className="loading-bar"></div>
//           <div className="loading-bar short"></div>
//         </div>
//         <div className="weather-current">
//           <div className="loading-circle"></div>
//           <div className="loading-bars">
//             <div className="loading-bar"></div>
//             <div className="loading-bar"></div>
//           </div>
//         </div>
//         <div className="weather-details">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="loading-detail">
//               <div className="loading-bar short"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (!weather) return null;

//   return (
//     <div className="weather-widget">
//       <div className="weather-header">
//         <h2 className="weather-title">Weather Forecast</h2>
//       </div>

//       {/* Current Weather */}
//       <div className="weather-current">
//         <div className="current-main">
//           <div className="current-temp-section">
//             <span className="current-icon">
//               {getWeatherIcon(weather.current.icon)}
//             </span>
//             <div className="current-temp-info">
//               <p className="current-temp">{weather.current.temperature}°C</p>
//               <p className="current-condition">{weather.current.condition}</p>
//             </div>
//           </div>
//           <div className="current-location">
//             <p className="location-text">{weather.current.location}</p>
//             <p className="update-time">Last updated: Just now</p>
//           </div>
//         </div>

//         {/* Weather Details */}
//         <div className="weather-details">
//           <div className="detail-card humidity">
//             <div className="detail-header">
//               <span className="detail-icon">💧</span>
//               <span className="detail-label">Humidity</span>
//             </div>
//             <p className="detail-value">{weather.current.humidity}%</p>
//           </div>
//           <div className="detail-card wind">
//             <div className="detail-header">
//               <span className="detail-icon">💨</span>
//               <span className="detail-label">Wind Speed</span>
//             </div>
//             <p className="detail-value">{weather.current.windSpeed} km/h</p>
//           </div>
//           <div className="detail-card visibility">
//             <div className="detail-header">
//               <span className="detail-icon">👁️</span>
//               <span className="detail-label">Visibility</span>
//             </div>
//             <p className="detail-value">{weather.current.visibility} km</p>
//           </div>
//           <div className="detail-card feels-like">
//             <div className="detail-header">
//               <span className="detail-icon">🌡️</span>
//               <span className="detail-label">Feels Like</span>
//             </div>
//             <p className="detail-value">{weather.current.temperature + 2}°C</p>
//           </div>
//         </div>
//       </div>

//       {/* 10-Day Forecast */}
//       <div className="weather-forecast">
//         <h3 className="forecast-title">10-Day Forecast</h3>
//         <div className="forecast-grid">
//           {weather.forecast.map((day, index) => (
//             <div key={index} className="forecast-day">
//               <p className="forecast-date">{day.date}</p>
//               <div className="forecast-icon">
//                 {getWeatherIcon(day.icon)}
//               </div>
//               <div className="forecast-temps">
//                 <p className="forecast-high">{day.high}°</p>
//                 <p className="forecast-low">{day.low}°</p>
//                 <p className="forecast-rain">{day.precipitation}%</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeatherWidget;
