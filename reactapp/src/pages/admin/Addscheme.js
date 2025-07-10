 
// import Footer from "../../inc/Footer";
// import Sidebar from "../../inc/Sidebar";
// import Top from "../../inc/Top";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Addscheme() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [applyLink, setApplyLink] = useState("");
//   const [image, setImage] = useState(null);

//   const navi = useNavigate();

//   return (
//     <>
//       <div>
//         <div id="wrapper">
//           <Sidebar />
//           <div id="content-wrapper" className="d-flex flex-column">
//             <div id="content">
//               <Top />
//               <div className="container-fluid">
//                 <h1 className="h3 mb-4 text-gray-800">Add Scheme</h1>

//                 <p>Scheme Title</p>
//                 <p>
//                   <input
//                     onChange={(e) => setTitle(e.target.value)}
//                     type="text"
//                     className="form-control"
//                   />
//                 </p>

//                 <p>Scheme Description</p>
//                 <p>
//                   <textarea
//                     onChange={(e) => setDescription(e.target.value)}
//                     className="form-control"
//                   ></textarea>
//                 </p>

//                 <p>Apply Link</p>
//                 <p>
//                   <input
//                     onChange={(e) => setApplyLink(e.target.value)}
//                     type="url"
//                     className="form-control"
//                   />
//                 </p>

//                 <p>Scheme Image (optional)</p>
//                 <p>
//                   <input
//                     onChange={(e) => setImage(e.target.files[0])}
//                     type="file"
//                   />
//                 </p>

//                 <p>
//                   <input
//                     onClick={async () => {
//                       const fd = new FormData();
//                       fd.append("title", title);
//                       fd.append("description", description);
//                       fd.append("applyLink", applyLink);
//                       fd.append("image", image);

//                       const resp = await fetch("http://localhost:2000/scheme/add", {
//                         method: "POST",
//                         body: fd,
//                       });

//                       const data = await resp.json();
//                       console.log(data);

//                       navi("/listscheme");
//                     }}
//                     type="button"
//                     className="btn btn-success"
//                     value="Add Scheme"
//                   />
//                 </p>
//               </div>
//             </div>
//             <Footer />
//           </div>
//         </div>
//         <a className="scroll-to-top rounded" href="#page-top">
//           <i className="fas fa-angle-up" />
//         </a>
//       </div>
//     </>
//   );
// }

// export default Addscheme;
import Footer from "../../inc/Footer";
import Sidebar from "../../inc/Sidebar";
import Top from "../../inc/Top";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Addscheme.css";

function Addscheme() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("applyLink", applyLink);
    fd.append("image", image);

    const resp = await fetch("http://localhost:2000/scheme/add", {
      method: "POST",
      body: fd,
    });

    const data = await resp.json();
    console.log(data);
    navigate("/listscheme");
  };

  return (
    <div >
      <Sidebar />
      <div className="main-content1">
        <Top />
        <div className="content-area">
          <h1 className="page-title">Add Scheme</h1>

          <div className="form-group">
            <label>Scheme Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Scheme Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Apply Link</label>
            <input
              type="url"
              value={applyLink}
              onChange={(e) => setApplyLink(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Scheme Image (optional)</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Add Scheme
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Addscheme;
