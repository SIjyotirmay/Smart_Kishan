//  import { Link } from "react-router-dom";
// import Footer from "../../inc/Footer";
// import Sidebar from "../../inc/Sidebar";
// import Top from "../../inc/Top";
// import { useState, useEffect } from "react";

// function Listscheme() {
//   const [schemes, setSchemes] = useState([]);

//   const getSchemes = async () => {
//     const res = await fetch("http://localhost:2000/scheme/all");
//     const data = await res.json();
//     setSchemes(data);
//   };

//   useEffect(() => {
//     getSchemes();
//   }, []);

//   const deleteScheme = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this scheme?");
//     if (!confirmDelete) return;

//     const fd = new FormData();
//     fd.append("id", id);

//     const res = await fetch("http://localhost:2000/scheme/del", {
//       method: "POST",
//       body: fd,
//     });

//     const data = await res.json();
//     if (data.msg === "Scheme deleted") {
//       getSchemes();
//     } else {
//       alert("Failed to delete scheme.");
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
//               <h1 className="h3 mb-4 text-gray-800">List of Schemes</h1>
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>Title</th>
//                     <th>Description</th>
//                     <th>Image</th>
//                     <th>Apply Link</th>
//                     <th>Delete</th>
//                     <th>Edit</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {schemes.map((s) => (
//                     <tr key={s._id}>
//                       <td>{s.title}</td>
//                       <td>{s.description}</td>
//                       <td>
//                         {s.image ? (
//                           <img
//                             className="pimg"
//                             src={`http://localhost:2000/uploads/${s.image}`}
//                             alt="scheme"
//                             width="100"
//                           />
//                         ) : (
//                           "No image"
//                         )}
//                       </td>
//                       <td>
//                         {s.applyLink ? (
//                           <a href={s.applyLink} target="_blank" rel="noopener noreferrer">
//                             Apply Now
//                           </a>
//                         ) : (
//                           "No Link"
//                         )}
//                       </td>
//                       <td>
//                         <button
//                           className="btn btn-danger"
//                           onClick={() => deleteScheme(s._id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                       <td>
//                         <Link to={`/editscheme/${s._id}`} className="btn btn-success">
//                           Edit
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Listscheme;
import { Link } from "react-router-dom";
import Footer from "../../inc/Footer";
import Sidebar from "../../inc/Sidebar";
import Top from "../../inc/Top";
import { useState, useEffect } from "react";
import "./Listschemes.css";

function Listscheme() {
  const [schemes, setSchemes] = useState([]);

  const getSchemes = async () => {
    const res = await fetch("http://localhost:2000/scheme/all");
    const data = await res.json();
    setSchemes(data);
  };

  useEffect(() => {
    getSchemes();
  }, []);

  const deleteScheme = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this scheme?");
    if (!confirmDelete) return;

    const fd = new FormData();
    fd.append("id", id);

    const res = await fetch("http://localhost:2000/scheme/del", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    if (data.msg === "Scheme deleted") {
      getSchemes();
    } else {
      alert("Failed to delete scheme.");
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Top />
        <div className="content-area">
          <h1 className="page-title">List of Schemes</h1>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Apply Link</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {schemes.map((s) => (
                  <tr key={s._id}>
                    <td>{s.title}</td>
                    <td>{s.description}</td>
                    <td>
                      {s.image ? (
                        <img
                          className="pimg"
                          src={`http://localhost:2000/uploads/${s.image}`}
                          alt="scheme"
                          width="100"
                        />
                      ) : (
                        "No image"
                      )}
                    </td>
                    <td>
                      {s.applyLink ? (
                        <a href={s.applyLink} target="_blank" rel="noopener noreferrer">
                          Apply Now
                        </a>
                      ) : (
                        "No Link"
                      )}
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => deleteScheme(s._id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <Link to={`/editscheme/${s._id}`} className="btn btn-success">
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

export default Listscheme;
