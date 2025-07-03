import Footer from "../inc/Footer";
import Sidebar from "../inc/Sidebar";
import Top from "../inc/Top";
import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
function Editproduct(){
  let [pname,setPname]=useState("")
  let [pprice,setPprice]=useState("")
  let [pimg,setImg]=useState(null)
  let [pdetails,setPdetails]=useState("")
  let [imgurl,setImgurl]=useState("")
  const navi=useNavigate();
  const param=useParams();

  async function getedit(){
    if(param.id!=null){
    var id=param.id;
    var fd=new FormData();
    fd.append("id",id);
    var resp=await fetch("http://localhost:2000/product/edit",{
      method:'POST',
      body:fd
    });
    var data=await resp.json()
    if(data!=null){
      setPname(data.pname);
      setPprice(data.pprice)
      setPdetails(data.pdetails);
      setImgurl(data.pimg)
    
    }
  }

  }

  useEffect(()=>{
       getedit(); 
  },[]);



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
          <h1 className="h3 mb-4 text-gray-800">Edit Product</h1>
          <p>Product Name</p>
          <p><input value={pname} onChange={(ev)=>{
            setPname(ev.target.value)
          }} type="text" className="form-control" /></p>
          <p>Product Price</p>
          <p><input value={pprice} onChange={(ev)=>{
            setPprice(ev.target.value)
          }} type="text"  className="form-control" /></p>
          <p>Product image</p>
          <p><input onChange={(ev)=>{
            setImg(ev.target.files[0])
          }} type="file" /></p>
          <p><img className="pimg" src={"http://localhost:2000/productimg/"+imgurl} /></p>
          <p>Product Details</p>
          <p><textarea onChange={(ev)=>{
            setPdetails(ev.target.value)
          }}  className="form-control" value={pdetails}></textarea></p>
          <p><input onClick={async()=>{
            var fd=new FormData();
            fd.append("pname",pname);
            fd.append("pprice",pprice);
            fd.append("pdetails",pdetails);
            fd.append("pimg",pimg);
            fd.append("id",param.id)

           var resp=await fetch("http://localhost:2000/product/upd",{
            method:'POST',
            body:fd
           });
           var data=await resp.json();
           console.log(data)

           navi('/listproduct');

          }} type="button" className="btn btn-success" value="Edit product" /></p>


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

export default Editproduct;