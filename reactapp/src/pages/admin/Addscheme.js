// import Footer from "../../inc/Footer";
// import Sidebar from "../../inc/Sidebar";
// import Top from "../../inc/Top";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Addscheme() {
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [doc, setDoc]   = useState(null);   // optional PDF/image upload

//   const navigate = useNavigate();

//   const handleAdd = async () => {
//     const fd = new FormData();
//     fd.append("title", title);
//     fd.append("description", desc);
//     if (doc) fd.append("doc", doc);        // only if file selected

//     const resp  = await fetch("http://localhost:2000/scheme/add", {
//       method: "POST",
//       body: fd,
//     });
//     const data = await resp.json();
//     console.log(data);

//     navigate("/listscheme");               // go to list page
//   };

//   return (
//     <>
//       <div id="wrapper">
//         <Sidebar />

//         <div id="content-wrapper" className="d-flex flex-column">
//           <div id="content">
//             <Top />

//             <div className="container-fluid">
//               <h1 className="h3 mb-4 text-gray-800">Add Scheme</h1>

//               <p>Scheme Title</p>
//               <input
//                 type="text"
//                 className="form-control"
//                 onChange={(e) => setTitle(e.target.value)}
//               />

//               <p>Scheme Description</p>
//               <textarea
//                 className="form-control"
//                 onChange={(e) => setDesc(e.target.value)}
//               />

//               <p>Attach Document / Image (optional)</p>
//               <input
//                 type="file"
//                 onChange={(e) => setDoc(e.target.files[0])}
//               />

//               <p>
//                 <input
//                   type="button"
//                   value="Add Scheme"
//                   className="btn btn-success"
//                   onClick={handleAdd}
//                 />
//               </p>
//             </div>
//           </div>

//           <Footer />
//         </div>
//       </div>

//       <a className="scroll-to-top rounded" href="#page-top">
//         <i className="fas fa-angle-up" />
//       </a>
//     </>
//   );
// }

// export default Addscheme;
import Footer from "../../inc/Footer";
import Sidebar from "../../inc/Sidebar";
import Top from "../../inc/Top";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Addscheme() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [image, setImage] = useState(null);

  const navi = useNavigate();

  return (
    <>
      <div>
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Top />
              <div className="container-fluid">
                <h1 className="h3 mb-4 text-gray-800">Add Scheme</h1>

                <p>Scheme Title</p>
                <p>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </p>

                <p>Scheme Description</p>
                <p>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                  ></textarea>
                </p>

                <p>Apply Link</p>
                <p>
                  <input
                    onChange={(e) => setApplyLink(e.target.value)}
                    type="url"
                    className="form-control"
                  />
                </p>

                <p>Scheme Image (optional)</p>
                <p>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                  />
                </p>

                <p>
                  <input
                    onClick={async () => {
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

                      navi("/listscheme");
                    }}
                    type="button"
                    className="btn btn-success"
                    value="Add Scheme"
                  />
                </p>
              </div>
            </div>
            <Footer />
          </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>
      </div>
    </>
  );
}

export default Addscheme;
