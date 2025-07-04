import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Top from "../inc/Top";
import UserNavbar from "../inc/UserNavbar";
function UserHome() {
  const navigate        = useNavigate();
  const [uname, setUname] = useState(null);
  const [error, setError] = useState(false);

  /* ----------  On mount: check token ---------- */
  useEffect(() => {
    const user = localStorage.getItem("uname");
    if (user) {
      setUname(user);
    } else {
      setError(true);
    }
  }, []);

  /* ----------  Logout ---------- */
  const handleLogout = () => {
    localStorage.removeItem("uname");
    navigate("/login", { replace: true });
  };

  /* ----------  Access denied screen ---------- */
  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-red-100 text-red-800 p-4">
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="mt-2 text-lg">Please login to continue.</p>
        <button
          onClick={() => navigate("/login", { replace: true })}
          className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full"
        >
          Go to Login
        </button>
      </div>
    );
  }

  /* ----------  Main dashboard ---------- */
  return (
     <div>
       <UserNavbar/>
      <h1 style={{color:"red"}}>HI I am home page of user</h1>
      
    </div>
  );
}

export default UserHome;
