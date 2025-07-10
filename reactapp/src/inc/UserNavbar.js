import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./UserNavbar.css";
import { FaHome, FaShoppingCart, FaNewspaper } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";

function UserNavbar() {
  const navigate = useNavigate();
  const [name, setName] = useState("User");
  const [image, setImage] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("uid");

    if (!id) {
      console.warn("UID not found in localStorage");
      return;
    }

    const fetchUser = async () => {
      const fd = new FormData();
      fd.append("id", id);

      try {
        const res = await fetch("http://localhost:2000/user/getuser", {
          method: "POST",
          body: fd,
        });

        const data = await res.json();
        console.log("Fetched user from navbar:", data); // Debug log

        if (data.name) setName(data.name);
        if (data.image) setImage(data.image);
      } catch (err) {
        console.error("Failed to fetch user in navbar:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("uname");
    navigate("/login");
  };

  // Optional: Prevent rendering if not logged in
  if (!localStorage.getItem("uid")) return null;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="https://tse1.mm.bing.net/th/id/OIP.kQi2-h8ZaSmgd79vM2kxCgHaHa?pid=ImgDet&w=202&h=202&c=7&dpr=1.3&o=7&rm=3"
          alt="Logo"
          className="logo-icon"
        />
        <span className="brand-name">Smart Kishan</span>
      </div>

      <div className="navbar-center">
        <NavLink to="/userhome" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <FaHome className="nav-icon" /> Home
        </NavLink>
        <NavLink to="/market" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <FaShoppingCart className="nav-icon" /> Market
        </NavLink>
        <NavLink to="/govtschemes" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <FontAwesomeIcon icon={faLandmark} className="nav-icon" /> Schemes
        </NavLink>
        <NavLink to="/news" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <FaNewspaper className="nav-icon" /> News
        </NavLink>
      </div>

      <div className="navbar-right">
        <img
          src={image ? `http://localhost:2000/uploads/${image}` : "./149071.png"}
          alt="User"
          className="user-avatar"
        />
        <span className="username">{name}</span>
        <button className="navbar__logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default UserNavbar;




// import { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./UserNavbar.css";
// import { FaHome, FaShoppingCart, FaNewspaper } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLandmark } from "@fortawesome/free-solid-svg-icons";

// function UserNavbar() {
//   const navigate = useNavigate();
//   const [name, setName] = useState("User");
//   const [image, setImage] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       const id = localStorage.getItem("uid"); // ✅ Fixed: changed from "userId" to "uid"
//       if (!id) return;

//       const fd = new FormData();
//       fd.append("id", id);

//       try {
//         const res = await fetch("http://localhost:2000/user/getuser", {
//           method: "POST",
//           body: fd,
//         });

//         const data = await res.json();

//         if (data.name) setName(data.name);
//         if (data.image) setImage(data.image);
//       } catch (error) {
//         console.error("Failed to fetch user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("uid");
//     localStorage.removeItem("uname");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <img
//           src="https://tse1.mm.bing.net/th/id/OIP.kQi2-h8ZaSmgd79vM2kxCgHaHa?pid=ImgDet&w=202&h=202&c=7&dpr=1.3&o=7&rm=3"
//           alt="Logo"
//           className="logo-icon"
//         />
//         <span className="brand-name">Smart Kishan</span>
//       </div>

//       <div className="navbar-center">
//         <NavLink to="/userhome" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//           <FaHome className="nav-icon" /> Home
//         </NavLink>
//         <NavLink to="/market" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//           <FaShoppingCart className="nav-icon" /> Market
//         </NavLink>
//         <NavLink to="/govtschemes" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//           <FontAwesomeIcon icon={faLandmark} className="nav-icon" /> Schemes
//         </NavLink>
//         <NavLink to="/news" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//           <FaNewspaper className="nav-icon" /> News
//         </NavLink>
//       </div>

//       <div className="navbar-right">
//         <img
//           src={image ? `http://localhost:2000/uploads/${image}` : "./149071.png"}
//           alt="User"
//           className="user-avatar"
//         />
//         <span className="username">{name}</span>
//         <button className="navbar__logout" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default UserNavbar;


// import { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./UserNavbar.css";
// import { FaHome, FaShoppingCart, FaNewspaper } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLandmark } from "@fortawesome/free-solid-svg-icons";

// function UserNavbar() {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState({
//     name: "User",
//     image: "", // default placeholder
//   });

//   const handleLogout = () => {
//     localStorage.removeItem("userId");
//     navigate("/login");
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       const id = localStorage.getItem("userId");
//       if (!id) return;

//       const fd = new FormData();
//       fd.append("id", id);

//       const res = await fetch("http://localhost:2000/user/getuser", {
//         method: "POST",
//         body: fd,
//       });

//       const data = await res.json();
//       if (data) {
//         setUserData({
//           name: data.name,
//           image: data.image,
//         });
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <img
//           src="https://tse1.mm.bing.net/th/id/OIP.kQi2-h8ZaSmgd79vM2kxCgHaHa?pid=ImgDet&w=202&h=202&c=7&dpr=1.3&o=7&rm=3"
//           alt="Logo"
//           className="logo-icon"
//         />
//         <span className="brand-name">Smart Kishan</span>
//       </div>

//       <div className="navbar-center">
//         <NavLink to="/userhome" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//           <FaHome className="nav-icon" /> Home
//         </NavLink>
//         <NavLink to="/market" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//           <FaShoppingCart className="nav-icon" /> Market
//         </NavLink>
//         <NavLink to="/govtschemes" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//           <FontAwesomeIcon icon={faLandmark} className="nav-icon" /> Schemes
//         </NavLink>
//         <NavLink to="/news" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
//           <FaNewspaper className="nav-icon" /> News
//         </NavLink>
//       </div>

//       <div className="navbar-right">
//         <img
//           src={userData.image ? `http://localhost:2000/uploads/${userData.image}` : "/assets/user.jpg"}
//           alt="User"
//           className="user-avatar"
//         />
//         <span className="username">{userData.name}</span>
//         <button className="navbar__logout" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default UserNavbar;





// import { NavLink, useNavigate } from "react-router-dom";
// import "./UserNavbar.css";
// import { FaHome, FaShoppingCart, FaNewspaper } from "react-icons/fa";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLandmark } from '@fortawesome/free-solid-svg-icons';

// function UserNavbar() {
//   const navigate = useNavigate();
//   const username = localStorage.getItem("uname") || "User";

//   const handleLogout = () => {
//     localStorage.removeItem("uname");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <img src="https://tse1.mm.bing.net/th/id/OIP.kQi2-h8ZaSmgd79vM2kxCgHaHa?pid=ImgDet&w=202&h=202&c=7&dpr=1.3&o=7&rm=3" alt="Logo" className="logo-icon" />
//         <span className="brand-name">Smart Kishan</span>
//       </div>

//       <div className="navbar-center">
//         <NavLink to="/userhome" 
//         className={({ isActive }) =>
//             `nav-link ${isActive ? "active" : ""}`
//           }>
//           <FaHome className="nav-icon" /> Home
//         </NavLink>
//         <NavLink to="/market" className={({ isActive }) =>
//             `nav-link ${isActive ? "active" : ""}`
//           }>
//           <FaShoppingCart className="nav-icon" /> Market
//         </NavLink>
//         <NavLink to="/govtschemes" className={({ isActive }) =>
//             `nav-link ${isActive ? "active" : ""}`
//           }>
//           <FontAwesomeIcon icon={faLandmark} className="nav-icon" /> Schemes
//         </NavLink>
//         <NavLink to="/news" className={({ isActive }) =>
//             `nav-link ${isActive ? "active" : ""}`
//           }>
//           <FaNewspaper className="nav-icon" /> News
//         </NavLink>
//       </div>

//       <div className="navbar-right">
//         <img src="/assets/user.jpg" alt="User" className="user-avatar" />
//         <span className="username">{username}</span>
//         <button className="navbar__logout" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default UserNavbar;

 