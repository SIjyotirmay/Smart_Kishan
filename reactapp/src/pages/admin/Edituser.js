// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Footer from "../../inc/Footer";
// import Sidebar from "../../inc/Sidebar";
// import Top from "../../inc/Top";

// function EditUser() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user",
//     status: true,
//   });
//   const [image, setImage] = useState(null);
//   const [oldImage, setOldImage] = useState("");

//   // Fetch user data
//   useEffect(() => {
//     const fetchUser = async () => {
//       const fd = new FormData();
//       fd.append("id", id);

//       const res = await fetch("http://localhost:2000/user/getuser", {
//         method: "POST",
//         body: fd,
//       });

//       const data = await res.json();
//       setForm({
//         name: data.name,
//         email: data.email,
//         password: data.password,
//         role: data.role,
//         status: data.status,
//       });
//       setOldImage(data.image);
//     };

//     fetchUser();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleUpdate = async () => {
//     const fd = new FormData();
//     fd.append("id", id);
//     Object.entries(form).forEach(([key, val]) => fd.append(key, val));
//     if (image) fd.append("image", image);

//     const res = await fetch("http://localhost:2000/user/update", {
//       method: "POST",
//       body: fd,
//     });

//     const data = await res.json();
//     if (data.msg === "User updated successfully") {
//       alert("User updated");
//       navigate("/usermanagement");
//     } else {
//       alert("Failed to update user");
//     }
//   };

//   return (
//     <>
//       <div id="wrapper">
//         <Sidebar />
//         <div id="content-wrapper" className="d-flex flex-column">
//           <div id="content">
//             <Top />
//             <div className="container-fluid">
//               <h1 className="h3 mb-4 text-gray-800">Edit User</h1>

//               <p>Name</p>
//               <p>
//                 <input
//                   name="name"
//                   type="text"
//                   value={form.name}
//                   className="form-control"
//                   onChange={handleChange}
//                 />
//               </p>

//               <p>Email</p>
//               <p>
//                 <input
//                   name="email"
//                   type="email"
//                   value={form.email}
//                   className="form-control"
//                   onChange={handleChange}
//                 />
//               </p>

//               <p>Password</p>
//               <p>
//                 <input
//                   name="password"
//                   type="password"
//                   value={form.password}
//                   className="form-control"
//                   onChange={handleChange}
//                 />
//               </p>

//               <p>Role</p>
//               <p>
//                 <select
//                   name="role"
//                   value={form.role}
//                   className="form-control"
//                   onChange={handleChange}
//                 >
//                   <option value="user">User</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </p>

//               <p>Status</p>
//               <p>
//                 <select
//                   name="status"
//                   value={form.status}
//                   className="form-control"
//                   onChange={handleChange}
//                 >
//                   <option value={true}>Active</option>
//                   <option value={false}>Inactive</option>
//                 </select>
//               </p>

//               <p>Profile Image</p>
//               <p>
//                 <input type="file" onChange={handleImageChange} />
//               </p>
//               {oldImage && (
//                 <p>
//                   <strong>Current Image:</strong>
//                   <br />
//                   <img
//                     src={`http://localhost:2000/uploads/${oldImage}`}
//                     width="150"
//                     alt="Old User"
//                     style={{ marginTop: "10px" }}
//                   />
//                 </p>
//               )}

//               <p>
//                 <button className="btn btn-primary" onClick={handleUpdate}>
//                   Update User
//                 </button>
//               </p>
//             </div>
//           </div>
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }

// export default EditUser;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../inc/Footer";
import Sidebar from "../../inc/Sidebar";
import Top from "../../inc/Top";
import "./Addscheme.css"; // Importing CSS

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    status: true,
  });
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const fd = new FormData();
      fd.append("id", id);

      const res = await fetch("http://localhost:2000/user/getuser", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      setForm({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        status: data.status,
      });
      setOldImage(data.image);
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    const fd = new FormData();
    fd.append("id", id);
    Object.entries(form).forEach(([key, val]) => fd.append(key, val));
    if (image) fd.append("image", image);

    const res = await fetch("http://localhost:2000/user/update", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    if (data.msg === "User updated successfully") {
      alert("User updated");
      navigate("/usermanagement");
    } else {
      alert("Failed to update user");
    }
  };

  return (
    <div className="layout1">
      <Sidebar />
      <div className="main-content1">
        
        <div className="content-area">
          <h1 className="page-title">Edit User</h1>
             {oldImage && (
            <div>
              <img className="pimg"
                src={`http://localhost:2000/uploads/${oldImage}`}
                alt="User"
              />
            </div>
          )}
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>

          <div className="form-group">
            <label>Profile Image</label>
            <input type="file" onChange={handleImageChange} />
          </div>

          

          <button className="submit-btn" onClick={handleUpdate}>
            Update User
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default EditUser;

