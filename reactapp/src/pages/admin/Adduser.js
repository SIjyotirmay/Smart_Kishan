import { useState } from "react";
import Sidebar from "../../inc/Sidebar";
import Top from "../../inc/Top";
import Footer from "../../inc/Footer";
import "./Addscheme.css";

function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    status: true,
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = name === "status" ? value === "true" : value;
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([key, val]) => fd.append(key, val));
    if (image) fd.append("image", image);

    const res = await fetch("http://localhost:2000/user/create", {
      method: "POST",
      body: fd,
    });

    const result = await res.json();
    alert(result.msg);
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Top />
        <div className="content-area">
          <h1 className="page-title">Add User</h1>
          <form className="add-user-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label>Name</label>
              <input name="name" placeholder="Name" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select name="role" onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" onChange={handleChange}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div className="form-group">
              <label>Profile Image</label>
              <input type="file" accept="image/*" onChange={handleImage} />
            </div>

            <button type="submit" className="submit-btn">Create User</button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AddUser;
