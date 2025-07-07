import Footer from "../../inc/Footer";
import Sidebar from "../../inc/Sidebar";
import Top from "../../inc/Top";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Addproduct(){
  let [pname,setPname]=useState("")
  let [pprice,setPprice]=useState("")
  let [pimg,setImg]=useState(null)
  let [pdetails,setPdetails]=useState("")

  const navi=useNavigate();
    return(
        <>
     <div>
  {/* Page Wrapper */}
  <div id="wrapper">
    {/* Sidebar */}
      <Sidebar/>
    {/* End of Sidebar */}
    {/* Content Wrapper */}
    <div id="content-wrapper" className="d-flex flex-column">
      {/* Main Content */}
      <div id="content">
        {/* Topbar */}
          <Top/>
        {/* End of Topbar */}
        {/* Begin Page Content */}
        <div className="container-fluid">
          {/* Page Heading */}
          <h1 className="h3 mb-4 text-gray-800">Add Product</h1>
          <p>Product Name</p>
          <p><input onChange={(ev)=>{
            setPname(ev.target.value)
          }} type="text" className="form-control" /></p>
          <p>Product Price</p>
          <p><input onChange={(ev)=>{
            setPprice(ev.target.value)
          }} type="text"  className="form-control" /></p>
          <p>Product image</p>
          <p><input onChange={(ev)=>{
            setImg(ev.target.files[0])
          }} type="file" /></p>
          <p>Product Details</p>
          <p><textarea onChange={(ev)=>{
            setPdetails(ev.target.value)
          }}  className="form-control"></textarea></p>
          <p><input onClick={async()=>{
            var fd=new FormData();
            fd.append("pname",pname);
            fd.append("pprice",pprice);
            fd.append("pdetails",pdetails);
            fd.append("pimg",pimg);

           var resp=await fetch("http://localhost:2000/product/add",{
            method:'POST',
            body:fd
           });
           var data=await resp.json();
           console.log(data)

           navi('/listproduct');

          }} type="button" className="btn btn-success" value="Add product" /></p>


        </div>
        {/* /.container-fluid */}
      </div>
      {/* End of Main Content */}
      {/* Footer */}
     <Footer/>
      {/* End of Footer */}
    </div>
    {/* End of Content Wrapper */}
  </div>
  {/* End of Page Wrapper */}
  {/* Scroll to Top Button*/}
  <a className="scroll-to-top rounded" href="#page-top">
    <i className="fas fa-angle-up" />
  </a>
  {/* Logout Modal*/}
  
</div>

        </>
    )
}

export default Addproduct;