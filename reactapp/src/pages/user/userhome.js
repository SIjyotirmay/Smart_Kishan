
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UserNavbar from "../../inc/UserNavbar";
// import './userhome.css';
// import WeatherWidget from "./WeatherWidget"

// function UserHome() {
//   const navigate = useNavigate();
//   const [uname, setUname] = useState(null);
//   const [error, setError] = useState(false);
//   const [weather, setWeather] = useState(null);
//   const [locationError, setLocationError] = useState("");
//   const quickActions = [
//     {
//       id: 'schemes',
//       title: 'Government Schemes',
//       description: 'Explore available agricultural schemes and subsidies',
//       icon: '🏆',
//       color: 'blue'
//     },
//     {
//       id: 'disease',
//       title: 'Crop Disease Detection',
//       description: 'AI-powered disease detection for your crops',
//       icon: '📷',
//       color: 'red'
//     },
//     {
//       id: 'learning',
//       title: 'Learning Center',
//       description: 'Educational videos and farming techniques',
//       icon: '📚',
//       color: 'purple'
//     },
//     {
//       id: 'ai',
//       title: 'Ask AI Assistant',
//       description: 'Get instant answers to your farming questions',
//       icon: '💬',
//       color: 'green'
//     }]

//   useEffect(() => {
//     const user = localStorage.getItem("uname");
//     if (user) {
//       setUname(user);
//     } else {
//       setError(true);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchWeather = async (lat, lon) => {
//       const apiKey = "2292453323d33ed93cc40a527de5ff19";
//       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

//       try {
//         const res = await fetch(url);
//         const data = await res.json();
//         setWeather(data);
//       } catch (err) {
//         console.error("Weather fetch error:", err);
//       }
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           fetchWeather(latitude, longitude);
//         },
//         (err) => {
//           setLocationError("Location access denied or unavailable.");
//         }
//       );
//     } else {
//       setLocationError("Geolocation is not supported by your browser.");
//     }
//   }, []);

//   if (error) {
//     return (
//       <div className="min-h-screen flex flex-col justify-center items-center bg-red-100 text-red-800 p-4">
//         <h1 className="text-3xl font-bold">Access Denied</h1>
//         <p className="mt-2 text-lg">Please login to continue.</p>
//         <button
//           onClick={() => navigate("/login", { replace: true })}
//           className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full"
//         >
//           Go to Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="userhome-container">
//       <UserNavbar />

//       <div className="welcome-card">
//         <div className="welcome-left">
//           <img
//             src="/assets/user.jpg"
//             alt="User Avatar"
//             className="user-avatar"
//           />
//           <div className="welcome-text">
//             <h2>Welcome back, {uname}!</h2>
//           </div>
//         </div>
//         <img
//           src="https://images.unsplash.com/photo-1605648933650-12be0b4b6d63"
//           alt="Farm"
//           className="welcome-image"
//         />
//       </div>
 
//       <WeatherWidget />
// {/*
        
//         <div className="quick-actions">
//           <h2 className="section-title">Quick Actions</h2>
//           <div className="actions-grid">
//             {quickActions.map((action) => (
//               <button
//                 key={action.id}
//                 onClick={() => onNavigate(action.id)}
//                 className={`action-card ${action.color}`}
//               >
//                 <span className="action-icon">{action.icon}</span>
//                 <h3 className="action-title">{action.title}</h3>
//                 <p className="action-description">{action.description}</p>
//               </button>
//             ))}
//           </div>
//         </div> */}
//         {/* Active Crops */}
//       {/* <div className="active-crops">
//           <h2 className="section-title">Active Crops</h2>
//           <div className="crops-grid">
//             {user.farm.crops.map((crop, index) => (
//               <div key={index} className="crop-card">
//                 <div className="crop-content">
//                   <div className="crop-icon-container">
//                     <span className="crop-icon">🌾</span>
//                   </div>
//                   <div className="crop-info">
//                     <h3 className="crop-name">{crop}</h3>
//                     <p className="crop-status">Growing season</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div> */}
//      </div>

          
// );
// }

// export default UserHome;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../../inc/UserNavbar";
import './userhome.css';
import WeatherWidget from "./WeatherWidget";

function UserHome() {
  const navigate = useNavigate();
  const [uname, setUname] = useState(null);
  const [error, setError] = useState(false);
  const [weather, setWeather] = useState(null);
  const [locationError, setLocationError] = useState("");

  const quickActions = [
    {
      id: 'govtschemes',
      title: 'Government Schemes',
      description: 'Explore available agricultural schemes and subsidies',
      icon: '🏆',
      color: 'blue'
    },
    {
      id: 'cropdisease',
      title: 'Crop Disease Detection',
      description: 'AI-powered disease detection for your crops',
      icon: '📷',
      color: 'red'
    },
    {
      id: 'learning',
      title: 'Learning Center',
      description: 'Educational videos and farming techniques',
      icon: '📚',
      color: 'purple'
    },
    {
      id: 'ai',
      title: 'Ask AI Assistant',
      description: 'Get instant answers to your farming questions',
      icon: '💬',
      color: 'green'
    }
  ];

  const onNavigate = (id) => {
    navigate(`/${id}`);
  };

  useEffect(() => {
    const user = localStorage.getItem("uname");
    if (user) {
      setUname(user);
    } else {
      setError(true);
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      const apiKey = "2292453323d33ed93cc40a527de5ff19";
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

  return (
    <div className="userhome-container">
      <UserNavbar />

      <div className="welcome-card">
        <div className="welcome-left">
          <img
            src="/assets/user.jpg"
            alt="User Avatar"
            className="user-avatar"
          />
          <div className="welcome-text">
            <h2>Welcome back, {uname}!</h2>
          </div>
        </div>
        <img
          src="https://www.hashmicro.com/blog/wp-content/uploads/2022/09/4f4a1a9d7c51499e0f4d28ec5e128022-scaled.jpg"
          alt="Farm"
          className="welcome-image"
        />
      </div>

      <WeatherWidget />

      <div className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className={`action-card ${action.color}`}
            >
              <span className="action-icon">{action.icon}</span>
              <h3 className="action-title">{action.title}</h3>
              <p className="action-description">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserHome;
