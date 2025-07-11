import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import UserHome from "./pages/user/userhome";
import Addproduct from "./pages/admin/Addproduct";
import Addscheme from "./pages/admin/Addscheme";
import Listproduct from "./pages/admin/Listproduct";
import Listscheme from "./pages/admin/Listscheme";
import Login from "./pages/Login";
import Editproduct from "./pages/admin/Editproduct";
import Editscheme from "./pages/admin/Editscheme";
import './App.css';
import GovtSchemes from "./pages/user/GovtSchemes";
import CropDiseaseDetection from "./pages/user/CropDiseaseDetection";
import News from "./pages/user/News"
import Market from "./pages/user/Market";
import WeatherWidget from "./pages/user/WeatherWidget"
import UserManagement from "./pages/admin/Usermanagement";
import AddUser from "./pages/admin/Adduser";
import EditUser from "./pages/admin/Edituser";

function App() {
  const PrivateRoute = ({ children, role }) => {
    const uname = localStorage.getItem("uname");
    const aname = localStorage.getItem("aname");

    if (role === "admin" && aname) {
      return children;
    } else if (role === "user" && uname) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/" element={<PrivateRoute role="admin"><Dashboard /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute role="admin"><Dashboard /></PrivateRoute>} />
        <Route path="/addproduct" element={<PrivateRoute role="admin"><Addproduct /></PrivateRoute>} />
        <Route path="/listproduct" element={<PrivateRoute role="admin"><Listproduct /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute role="admin"><Editproduct /></PrivateRoute>} />
        <Route path="/addscheme" element={<PrivateRoute role="admin"><Addscheme /></PrivateRoute>} />
        <Route path="/adduser" element={<PrivateRoute role="admin"><AddUser /></PrivateRoute>} />
        <Route path="/listscheme" element={<PrivateRoute role="admin"><Listscheme /></PrivateRoute>} />
        <Route path="/editscheme/:id" element={<PrivateRoute role="admin"><Editscheme /></PrivateRoute>} />
        <Route path="/usermanagement" element={<PrivateRoute role="admin"><UserManagement /></PrivateRoute>} />
        <Route path="/edituser/:id" element={<PrivateRoute role="admin"><EditUser /></PrivateRoute>} />
        {/* User Route */}
        <Route path="/userhome" element={<PrivateRoute role="user"><UserHome /></PrivateRoute>} />
        <Route path="/news" element={<PrivateRoute role="user"><News /></PrivateRoute> } />
        <Route path="/market" element={<PrivateRoute role="user"><Market /></PrivateRoute> } />
        <Route path="/govtschemes" element={<PrivateRoute role="user"><GovtSchemes /></PrivateRoute>} />
        <Route path="/cropdisease" element={<PrivateRoute role="user"><CropDiseaseDetection /></PrivateRoute>} />
        <Route path="/weather" element={<PrivateRoute role="user"><WeatherWidget /></PrivateRoute> } />
        
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
