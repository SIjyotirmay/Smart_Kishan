import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // Optional: create a specific CSS if needed

function UserNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("uname");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">🌾Smart Kishan</div>
      <div className="navbar__links">
        <Link to="/userhome" className="navbar__link">Home</Link>
        <Link to="/govtschemes" className="navbar__link">Govt Schemes</Link>
        <Link to="/cropdisease" className="navbar__link">Crop Disease</Link>
        <button className="navbar__logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default UserNavbar;
