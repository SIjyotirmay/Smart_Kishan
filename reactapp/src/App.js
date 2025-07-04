import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserHome from "./pages/userhome";
import Addproduct from "./pages/Addproduct";
import Listproduct from "./pages/Listproduct";
import Login from "./pages/Login";
import Editproduct from "./pages/Editproduct";
import './App.css';
import GovtSchemes from "./pages/GovtSchemes";
import CropDiseaseDetection from "./pages/CropDiseaseDetection";


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

        {/* User Route */}
        <Route path="/userhome" element={<PrivateRoute role="user"><UserHome /></PrivateRoute>} />
  
        <Route path="/govtschemes" element={<PrivateRoute role="user"><GovtSchemes /></PrivateRoute>} />
        <Route path="/cropdisease" element={<PrivateRoute role="user"><CropDiseaseDetection /></PrivateRoute>} />

        {/* Public Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
