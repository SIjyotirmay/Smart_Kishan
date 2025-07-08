/*import { useState } from "react";
function Login(){
    let [email,setEmail]=useState("")
    let [pass,setPass]=useState("")

    let [iserr,setIserr]=useState(false)

return(
    <>
    <div className="container">
        <div className="row">
            <div className="col-md-4 frm">

{iserr?<div class="alert alert-danger">
  <strong>Error!</strong> Invalid login
</div>:''}

                <p>Email</p>
                <p><input onChange={(ev)=>{
                    setEmail(ev.target.value)
                }} type="email" className="form-control" /></p>
                  <p>Password</p>
                <p><input onChange={(ev)=>{
                    setPass(ev.target.value)
                }} type="password" className="form-control" /></p>
                <p><button onClick={async ()=>{
                    var fd=new FormData();
                    fd.append("email",email);
                    fd.append("pass",pass);
                    var resp=await fetch("http://localhost:2000/admin/login",{
                        method:'POST',
                        body:fd
                    });
                    var data=await resp.json();
                    if(data.msg=="Invalid login"){
                        setIserr(true)
                    }else{
         localStorage.setItem("aname",data.name)
         localStorage.setItem("aid",data.id)

         window.location="/"

                    }

                    console.log(data)
                }} className="btn btn-success">Login</button></p>
            </div>
        </div>
    </div>
    </>
)
}

export default Login;*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FaUser, FaShieldAlt,FaUserShield } from "react-icons/fa";



function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("user");
  const [iserr, setIserr] = useState(false);
  const navigate = useNavigate(); // Add this

  const handleLogin = async () => {
    const fd = new FormData();
    fd.append("email", email);
    fd.append("pass", pass);
    fd.append("role", role);

    const endpoint =
      role === "admin"
        ? "http://localhost:2000/admin/login"
        : "http://localhost:2000/user/login";

    const resp = await fetch(endpoint, {
      method: "POST",
      body: fd,
    });

    const data = await resp.json();

    if (data.msg === "Invalid login") {
      setIserr(true);
    } else {
      if (role === "admin") {
        localStorage.setItem("aname", data.name);
        localStorage.setItem("aid", data.id);
        navigate("/dashboard"); // ✅ use this
      } else {
        localStorage.setItem("uname", data.name);
        localStorage.setItem("uid", data.id);
        navigate("/userhome"); // ✅ use this
      }
    }
  };

  return (
    <div className="container1">

        
         
        <div className="col-md-4 frm">
          <div className="login-header text-center">
          <div className="logo-container">
            <img src="https://tse1.mm.bing.net/th/id/OIP.kQi2-h8ZaSmgd79vM2kxCgHaHa?pid=ImgDet&w=202&h=202&c=7&dpr=1.3&o=7&rm=3" alt="Logo" className="logo-img" />
          </div>
           <h3 className="login-title">Smart Kishan</h3>
            <p className="login-subtitle">Your Smart Agricultural Platform</p>
          </div>

          {/* Logo image */}
           
          {iserr && (
            <div className="alert alert-danger">
              <strong>Error!</strong> Invalid login
            </div>
          )}

            <div className="role-selector">
            <label className="label"><FaUserShield className="icon"/> Select Role</label>
            <div className="role-options">
              <button
                className={`role-btn ${role === "farmer" ? "active" : ""}`}
                onClick={() => setRole("farmer")}
              >
                <FaUser className="icon" />
                Farmer
              </button>

              <button
                className={`role-btn ${role === "admin" ? "active" : ""}`}
                onClick={() => setRole("admin")}
              >
                <FaShieldAlt className="icon" />
                Admin
              </button>
            </div>
          </div>

          <p><FaEnvelope className="icon" /> Email</p>
           
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />

          <p> <FaLock className="icon" /> Password</p>
          
          <input
           
            type="password"
            className="form-control"
            onChange={(e) => setPass(e.target.value)}
          />

          <p>
            <button className="btn btn-success" onClick={handleLogin}>
              Login
            </button>
          </p>
        </div>
    </div>
  );
}

export default Login;
