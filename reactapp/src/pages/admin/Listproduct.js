import { Link } from "react-router-dom";
import Footer from "../../inc/Footer";
import Sidebar from "../../inc/Sidebar";
import Top from "../../inc/Top";
import { useState, useEffect } from "react";
import "./Listschemes.css";

function Listproduct() {
  const [products, setProducts] = useState([]);

  const getdata = async () => {
    const resp = await fetch("http://localhost:2000/product/sel");
    const data = await resp.json();
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    const fd = new FormData();
    fd.append("id", id);

    const resp = await fetch("http://localhost:2000/product/del", {
      method: "POST",
      body: fd,
    });

    const data = await resp.json();
    console.log(data);
    getdata();
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Top />
        <div className="content-area">
          <h1 className="page-title">List Products</h1>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Details</th>
                  <th>Image</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>{p.pname}</td>
                    <td>{p.pprice}</td>
                    <td>{p.pdetails}</td>
                    <td>
                      {p.pimg ? (
                        <img
                          className="pimg"
                          src={`http://localhost:2000/productimg/${p.pimg}`}
                          alt="Product"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProduct(p._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <Link to={`/edit/${p._id}`} className="btn btn-success">
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

export default Listproduct;
