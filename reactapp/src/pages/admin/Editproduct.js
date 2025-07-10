// 

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../inc/Sidebar";
import Top from "../../inc/Top";
import Footer from "../../inc/Footer";
function EditProduct() {
  const [pname, setPname] = useState("");
  const [pprice, setPprice] = useState("");
  const [pdetails, setPdetails] = useState("");
  const [pimg, setPimg] = useState(null);
  const [imgurl, setImgurl] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getEditData = async () => {
      if (id) {
        const fd = new FormData();
        fd.append("id", id);

        const res = await fetch("http://localhost:2000/product/edit", {
          method: "POST",
          body: fd,
        });
        const data = await res.json();

        if (data) {
          setPname(data.pname);
          setPprice(data.pprice);
          setPdetails(data.pdetails);
          setImgurl(data.pimg);
        }
      }
    };

    getEditData();
  }, [id]);

  const handleUpdate = async () => {
    const fd = new FormData();
    fd.append("id", id);
    fd.append("pname", pname);
    fd.append("pprice", pprice);
    fd.append("pdetails", pdetails);
    if (pimg) fd.append("pimg", pimg);

    const res = await fetch("http://localhost:2000/product/upd", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    if (data.msg === "Product updated") {
      alert("Product updated successfully");
      navigate("/listproduct");
    } else {
      alert("Failed to update product");
    }
  };

  return (
    <div className="layout1">
      <Sidebar />
      <div className="main-content1">
        <div className="content-area">
          <h1 className="page-title">Edit Product</h1>
             {imgurl && (
            <div >
               
              <img className="pimg"
                src={`http://localhost:2000/productimg/${imgurl}`}
                alt="product"
              />
            </div>
          )}
          <div className="form-group">
            <label>Product Name</label>
            <input value={pname} onChange={(e) => setPname(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Product Price</label>
            <input value={pprice} onChange={(e) => setPprice(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <input type="file" onChange={(e) => setPimg(e.target.files[0])} />
          </div>

        

          <div className="form-group">
            <label>Product Details</label>
            <textarea
              value={pdetails}
              onChange={(e) => setPdetails(e.target.value)}
            />
          </div>

          <button className="submit-btn" onClick={handleUpdate}>
            Update Product
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default EditProduct;
