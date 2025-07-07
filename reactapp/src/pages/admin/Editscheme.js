import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../inc/Footer";
import Sidebar from "../../inc/Sidebar";
import Top from "../../inc/Top";

function Editscheme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  // Fetch existing scheme details
  useEffect(() => {
    const fetchData = async () => {
      const fd = new FormData();
      fd.append("id", id);

      const res = await fetch("http://localhost:2000/scheme/edit", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();

      setTitle(data.title);
      setDescription(data.description);
      setApplyLink(data.applyLink);
      setOldImage(data.image); // Store old image for display
    };

    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    const fd = new FormData();
    fd.append("id", id);
    fd.append("title", title);
    fd.append("description", description);
    fd.append("applyLink", applyLink);
    if (image) {
      fd.append("image", image);
    }

    const res = await fetch("http://localhost:2000/scheme/upd", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    if (data.msg === "Scheme updated") {
      alert("Scheme updated successfully");
      navigate("/listscheme");
    } else {
      alert("Failed to update scheme");
    }
  };

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Top />
            <div className="container-fluid">
              <h1 className="h3 mb-4 text-gray-800">Edit Scheme</h1>

              <p>Title</p>
              <p>
                <input
                  type="text"
                  value={title}
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </p>

              <p>Description</p>
              <p>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </p>

              <p>Apply Link</p>
              <p>
                <input
                  type="text"
                  value={applyLink}
                  className="form-control"
                  onChange={(e) => setApplyLink(e.target.value)}
                />
              </p>

              <p>Scheme Image</p>
              <p>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </p>
              {oldImage && (
                <p>
                  <strong>Current Image:</strong>
                  <br />
                  <img
                    src={`http://localhost:2000/uploads/${oldImage}`}
                    width="150"
                    alt="Old Scheme"
                    style={{ marginTop: "10px" }}
                  />
                </p>
              )}

              <p>
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update Scheme
                </button>
              </p>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Editscheme;
