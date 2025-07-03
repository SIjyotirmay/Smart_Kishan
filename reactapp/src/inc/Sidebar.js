import { NavLink } from "react-router-dom";
function Sidebar(){
    return(
        <>
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* Sidebar - Brand */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
      </a>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard</span></NavLink>
      </li>
    
      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-fw fa-cog" />
          <span>Manage Products</span>
        </a>
        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
           
            <NavLink className="collapse-item" to="/addproduct">Add product</NavLink>
 <NavLink className="collapse-item" to="/listproduct">List product</NavLink>
          </div>
        </div>
      </li>

      
      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" />
      </div>
    </ul>
        </>
    )
}

export default Sidebar;