// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Sidebar from "../../inc/Sidebar";
// import Top from "../../inc/Top";
// import Footer from "../../inc/Footer";
// import "./UserManagement.css";

// function UserManagement() {
//   const [users, setUsers] = useState([]);

//   const getUsers = async () => {
//     const res = await fetch("http://localhost:2000/user/all");
//     const data = await res.json();
//     setUsers(data);
//   };

//   const deleteUser = async (id) => {
//     const confirm = window.confirm("Delete this user?");
//     if (!confirm) return;

//     const fd = new FormData();
//     fd.append("id", id);

//     const res = await fetch("http://localhost:2000/user/delete", {
//       method: "POST",
//       body: fd,
//     });

//     const result = await res.json();
//     if (result.msg === "User deleted") {
//       getUsers();
//     } else {
//       alert("Error deleting user");
//     }
//   };

//   useEffect(() => {
//     getUsers();
//   }, []);

//   return (
//     <div className="layout">
//       <Sidebar />
//       <div className="main-content">
//         <Top />
//         <div className="content-area">
//           <h1 className="page-title">User Management</h1>

//           <div className="table-container">
//             <table className="custom-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Role</th>
//                   <th>Status</th>
//                   <th>Delete</th>
//                   <th>Edit</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((u) => (
//                   <tr key={u._id}>
//                     <td>{u.name}</td>
//                     <td>{u.email}</td>
//                     <td>{u.role}</td>
//                     <td>{u.status ? "Active" : "Inactive"}</td>
//                     <td>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => deleteUser(u._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                     <td>
//                       <Link to={`/edituser/${u._id}`} className="btn btn-success">
//                         Edit
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default UserManagement;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../inc/Sidebar";
import Top from "../../inc/Top";
import Footer from "../../inc/Footer";
import "./UserManagement.css";

function UserManagement() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await fetch("http://localhost:2000/user/all");
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    const confirm = window.confirm("Delete this user?");
    if (!confirm) return;

    const fd = new FormData();
    fd.append("id", id);

    const res = await fetch("http://localhost:2000/user/delete", {
      method: "POST",
      body: fd,
    });

    const result = await res.json();
    if (result.msg === "User deleted successfully") {
      getUsers();
    } else {
      alert("Error deleting user");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Top />
        <div className="content-area">
          <h1 className="page-title">User Management</h1>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>
                      {u.image ? (
                        <img
                          src={`http://localhost:2000/uploads/${u.image}`}
                          alt="Profile"
                          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>{u.status ? "Active" : "Inactive"}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUser(u._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <Link to={`/edituser/${u._id}`} className="btn btn-success">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default UserManagement;
