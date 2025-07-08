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
      <div className="row">
        <div className="col-md-4 frm">
          {iserr && (
            <div className="alert alert-danger">
              <strong>Error!</strong> Invalid login
            </div>
          )}

          <p>Login As</p>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <p>Email</p>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />

          <p>Password</p>
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
    </div>
  );
}

export default Login;
