function Footer(){
    return(
        <>
         <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright © Your Website 2020</span>
          </div>
        </div>
      </footer>

      <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
          <button className="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
        <div className="modal-footer">
          <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
          <a className="btn btn-primary" href="#" onClick={()=>{

            localStorage.removeItem("aname")
         localStorage.removeItem("aid")
         window.location="/login"
    
          }}>Logout</a>
        </div>
      </div>
    </div>
  </div>
        </>
    )
}
export default Footer;