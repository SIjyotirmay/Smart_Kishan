import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../../inc/UserNavbar";
import './userhome.css'

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
  // const handleLogout = () => {
  //   localStorage.removeItem("uname");
  //   navigate("/login", { replace: true });
  // };

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
    <div className="userhome-container">
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




// import React from 'react';
// import './userhome.css';
// import {
//   MapPin, Crop, Award, Camera, BookOpen, MessageCircle, TrendingUp, Leaf
// } from 'lucide-react';

// export const UserHome = ({ user, onNavigate }) => {
//   const quickActions = [
//     {
//       id: 'schemes',
//       title: 'Government Schemes',
//       description: 'Explore available agricultural schemes and subsidies',
//       icon: Award,
//       className: 'blue'
//     },
//     {
//       id: 'disease',
//       title: 'Crop Disease Detection',
//       description: 'AI-powered disease detection for your crops',
//       icon: Camera,
//       className: 'red'
//     },
//     {
//       id: 'learning',
//       title: 'Learning Center',
//       description: 'Educational videos and farming techniques',
//       icon: BookOpen,
//       className: 'purple'
//     },
//     {
//       id: 'ai',
//       title: 'Ask AI Assistant',
//       description: 'Get instant answers to your farming questions',
//       icon: MessageCircle,
//       className: 'green'
//     }
//   ];

//   const farmStats = [
//     { label: 'Total Area', value: user.farm.size, icon: MapPin },
//     { label: 'Active Crops', value: user.farm.crops.length.toString(), icon: Crop },
//     { label: 'Yield Score', value: '85%', icon: TrendingUp },
//     { label: 'Sustainability', value: 'A+', icon: Leaf }
//   ];

//   return (
//     <div className="userhome-wrapper">
//       <div className="container">
//         {/* Welcome Card */}
//         <div className="welcome-card">
//           <div className="circle-decor" />
//           <div className="welcome-content">
//             <div className="user-info">
//               <img src={user.avatar} alt={user.name} className="avatar" />
//               <div>
//                 <h1 className="title">Welcome back, {user.name}!</h1>
//                 <p className="subtitle">
//                   <MapPin className="inline-icon" />
//                   {user.farm.name} • {user.farm.location}
//                 </p>
//               </div>
//             </div>
//             <img
//               src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop"
//               alt="Farm"
//               className="farm-image"
//             />
//           </div>
//         </div>

//         {/* Farm Stats */}
//         <div className="stats-grid">
//           {farmStats.map((stat, i) => {
//             const Icon = stat.icon;
//             return (
//               <div key={i} className="stat-card">
//                 <div>
//                   <p className="stat-label">{stat.label}</p>
//                   <p className="stat-value">{stat.value}</p>
//                 </div>
//                 <Icon className="stat-icon" />
//               </div>
//             );
//           })}
//         </div>

//         {/* Weather Widget */}
//         <div className="weather-widget">
//           <p>[ Weather Widget Placeholder ]</p>
//         </div>

//         {/* Quick Actions */}
//         <div className="section">
//           <h2 className="section-title">Quick Actions</h2>
//           <div className="actions-grid">
//             {quickActions.map((action) => {
//               const Icon = action.icon;
//               return (
//                 <button
//                   key={action.id}
//                   onClick={() => onNavigate(action.id)}
//                   className={`action-card ${action.className}`}
//                 >
//                   <Icon className="action-icon" />
//                   <h3>{action.title}</h3>
//                   <p>{action.description}</p>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Active Crops */}
//         <div className="section">
//           <h2 className="section-title">Active Crops</h2>
//           <div className="crops-grid">
//             {user.farm.crops.map((crop, index) => (
//               <div key={index} className="crop-card">
//                 <div className="crop-icon-wrapper">
//                   <Crop className="crop-icon" />
//                 </div>
//                 <div>
//                   <h3>{crop}</h3>
//                   <p>Growing season</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserHome;