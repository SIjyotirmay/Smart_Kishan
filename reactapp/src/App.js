import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Addproduct from "./pages/Addproduct";
import Listproduct from "./pages/Listproduct";
import Login from "./pages/Login";
import Editproduct from "./pages/Editproduct";
import './App.css'
function App(){

  const PrivateRoute = ({children }) => {
    var isAuthenticated=localStorage.getItem("aname")
  return isAuthenticated ? children : <Navigate to="/login" />;
};

  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      <Route path="/addproduct" element={<PrivateRoute><Addproduct/></PrivateRoute>}/>
      <Route path="/listproduct" element={<PrivateRoute><Listproduct/></PrivateRoute>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/edit/:id" element={<PrivateRoute><Editproduct/></PrivateRoute>} /> 
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;