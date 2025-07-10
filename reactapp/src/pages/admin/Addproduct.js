import Footer from "../../inc/Footer";
import Sidebar from "../../inc/Sidebar";
import Top from "../../inc/Top";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Addscheme.css";

function Addproduct() {
  const [pname, setPname] = useState("");
  const [pprice, setPprice] = useState("");
  const [pimg, setImg] = useState(null);
  const [pdetails, setPdetails] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("pname", pname);
    fd.append("pprice", pprice);
    fd.append("pdetails", pdetails);
    fd.append("pimg", pimg);

    const resp = await fetch("http://localhost:2000/product/add", {
      method: "POST",
      body: fd,
    });

    const data = await resp.json();
    console.log(data);
    navigate("/listproduct");
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Top />
        <div className="content-area">
          <h1 className="page-title">Add Product</h1>

          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              value={pname}
              onChange={(e) => setPname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Product Price</label>
            <input
              type="text"
              value={pprice}
              onChange={(e) => setPprice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <input type="file" onChange={(e) => setImg(e.target.files[0])} />
          </div>

          <div className="form-group">
            <label>Product Details</label>
            <textarea
              value={pdetails}
              onChange={(e) => setPdetails(e.target.value)}
            ></textarea>
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Add Product
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Addproduct;
