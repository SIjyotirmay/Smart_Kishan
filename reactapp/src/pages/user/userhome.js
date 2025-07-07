import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Top from "../../inc/Top";
import UserNavbar from "../../inc/UserNavbar";

function UserHome() {
  const navigate = useNavigate();
  const [uname, setUname] = useState(null);
  const [error, setError] = useState(false);
  const [weather, setWeather] = useState(null);
  const [locationError, setLocationError] = useState("");

  // ---------- On mount: check token ----------
  useEffect(() => {
    const user = localStorage.getItem("uname");
    if (user) {
      setUname(user);
    } else {
      setError(true);
    }
  }, []);

  // ---------- Fetch weather ----------
  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      const apiKey = "2292453323d33ed93cc40a527de5ff19"; // 👈 Replace this
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (err) => {
          setLocationError("Location access denied or unavailable.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []);

  // ---------- Logout ----------
  const handleLogout = () => {
    localStorage.removeItem("uname");
    navigate("/login", { replace: true });
  };

  // ---------- Access denied screen ----------
  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-red-100 text-red-800 p-4">
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="mt-2 text-lg">Please login to continue.</p>
        <button
          onClick={() => navigate("/login", { replace: true })}
          className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // ---------- Main dashboard ----------
  return (
    <div>
      <UserNavbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          👋 Hi {uname}, welcome to your home page!
        </h1>

        {/* Weather Section */}
        <div className="bg-blue-100 p-4 rounded shadow-md w-fit">
          <h2 className="text-lg font-semibold mb-2">🌤️ Real-Time Weather</h2>
          {locationError && <p className="text-red-600">{locationError}</p>}
          {weather ? (
            <div>
              <p><strong>📍 Location:</strong> {weather.name}</p>
              <p><strong>🌡️ Temperature:</strong> {weather.main.temp}°C</p>
              <p><strong>☁️ Condition:</strong> {weather.weather[0].description}</p>
              <p><strong>💧 Humidity:</strong> {weather.main.humidity}%</p>
              <p><strong>💨 Wind Speed:</strong> {weather.wind.speed} m/s</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="Weather Icon"
                className="mt-2"
              />
            </div>
          ) : (
            !locationError && <p>Loading weather data...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserHome;
