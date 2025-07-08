import { Link, useNavigate } from "react-router-dom";
import "./UserNavbar.css";
import { FaHome, FaShoppingCart, FaNewspaper } from "react-icons/fa";

function UserNavbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("uname") || "User";

  const handleLogout = () => {
    localStorage.removeItem("uname");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="https://tse1.mm.bing.net/th/id/OIP.kQi2-h8ZaSmgd79vM2kxCgHaHa?pid=ImgDet&w=202&h=202&c=7&dpr=1.3&o=7&rm=3" alt="Logo" className="logo-icon" />
        <span className="brand-name">Smart Kishan</span>
      </div>

      <div className="navbar-center">
        <Link to="/userhome" className="nav-link">
          <FaHome className="nav-icon" /> Home
        </Link>
        <Link to="/marketplace" className="nav-link">
          <FaShoppingCart className="nav-icon" /> Smart Marketplace
        </Link>
        <Link to="/news" className="nav-link">
          <FaNewspaper className="nav-icon" /> News
        </Link>
      </div>

      <div className="navbar-right">
        <img src="/assets/user.jpg" alt="User" className="user-avatar" />
        <span className="username">{username}</span>
        <button className="navbar__logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default UserNavbar;



// import React from "react";
// import "./UserNavbar.css";
// import { FaHome, FaShoppingCart, FaNewspaper } from "react-icons/fa";

// function UserNavbar({ uname, onLogout }) {
//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <img src="/assets/logo.png" alt="Logo" className="logo-icon" />
//         <span className="brand-name">FarmConnect</span>
//       </div>

//       <div className="navbar-center">
//         <a href="#" className="nav-link">
//           <FaHome className="nav-icon" /> Home
//         </a>
//         <a href="#" className="nav-link active">
//           <FaShoppingCart className="nav-icon" /> Smart Marketplace
//         </a>
//         <a href="#" className="nav-link">
//           <FaNewspaper className="nav-icon" /> News
//         </a>
//       </div>

//       <div className="navbar-right">
//         <img
//           src="/assets/user.jpg"
//           alt="User"
//           className="user-avatar"
//         />
//         <span className="username">Rajesh Kumar</span>
//       </div>
//     </nav>
//   );
// }

// export default UserNavbar;


// import React from 'react';
// import './UserNavbar.css'; // Pure CSS file

// function UserNavbar({ uname, onLogout }) {
//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">Smart Kishan</div>
//       <div className="navbar-right">
//         <span className="navbar-welcome">Welcome, {uname}</span>
//         <button className="navbar-logout" onClick={onLogout}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default UserNavbar;

 