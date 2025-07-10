import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserShield,
  FaTachometerAlt,
  FaSeedling,
  FaUsers,
  FaShoppingCart,
  FaBook,
  FaBrain,
  FaComments,
  FaPlusCircle,
  FaListUl
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  const [openProducts, setOpenProducts] = useState(false);
  const [openSchemes, setOpenSchemes] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FaUserShield className="icon" />
        <span className="brand-text">Admin</span>
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink exact="true" to="/" className="nav-link">
            <FaTachometerAlt className="icon" />
            Dashboard
          </NavLink>
        </li>

        {/* Schemes */}
        <li className="submenu">
          <div className="submenu-title" onClick={() => setOpenSchemes(!openSchemes)}>
            <FaSeedling className="icon" />
            Schemes Management
          </div>
          {openSchemes && (
            <ul className="submenu-items">
              <li><NavLink to="/addscheme"><FaPlusCircle /> Add Scheme</NavLink></li>
              <li><NavLink to="/listscheme"><FaListUl /> List Schemes</NavLink></li>
            </ul>
          )}
        </li>

        {/* Products */}
        <li className="submenu">
          <div className="submenu-title" onClick={() => setOpenProducts(!openProducts)}>
            <FaShoppingCart className="icon" />
            Products Management
          </div>
          {openProducts && (
            <ul className="submenu-items">
              <li><NavLink to="/addproduct"><FaPlusCircle /> Add Product</NavLink></li>
              <li><NavLink to="/listproduct"><FaListUl /> List Products</NavLink></li>
            </ul>
          )}
        </li>

        {/* Users */}
        <li className="submenu">
          <div className="submenu-title" onClick={() => setOpenUsers(!openUsers)}>
            <FaUsers className="icon" />
            Users Management
          </div>
          {openUsers && (
            <ul className="submenu-items">
              <li><NavLink to="/adduser"><FaPlusCircle /> Add User</NavLink></li>
              <li><NavLink to="/usermanagement"><FaListUl /> List Users</NavLink></li>
            </ul>
          )}
        </li>

        <li>
          <NavLink to="/learning" className="nav-link">
            <FaBook className="icon" />
            Learning Center
          </NavLink>
        </li>

        <li>
          <NavLink to="/crop-disease-ai" className="nav-link">
            <FaBrain className="icon" />
            Crop Disease AI
          </NavLink>
        </li>

        <li>
          <NavLink to="/chat" className="nav-link">
            <FaComments className="icon" />
            Chat Management
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;




// import { NavLink } from "react-router-dom";
// import { FaUserShield } from "react-icons/fa";
// function Sidebar(){
//     return(
//         <>
//           <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
//       {/* Sidebar - Brand */}
//       <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
         
//         <div className="sidebar-brand-text mx-3"><FaUserShield/> Admin</div>
//       </a>
//       {/* Divider */}
//       <hr className="sidebar-divider my-0" />
//       {/* Nav Item - Dashboard */}
//       <li className="nav-item">
//         <NavLink className="nav-link" to="/">
//           <i className="fas fa-fw fa-tachometer-alt" />
//           <span>Dashboard</span></NavLink>
//       </li>
    
//       {/* Nav Item - Pages Collapse Menu */}
//       <li className="nav-item">
//         <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
//           <i className="fas fa-fw fa-cog" />
//           <span>Manage Products</span>
//         </a>
//         <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
//           <div className="bg-white py-2 collapse-inner rounded">
           
//             <NavLink className="collapse-item" to="/addproduct">Add product</NavLink>
//  <NavLink className="collapse-item" to="/listproduct">List product</NavLink>
//           </div>
//         </div>
//       </li>

//       <li className="nav-item">
//   <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseSchemes" aria-expanded="true" aria-controls="collapseSchemes">
//     <i className="fas fa-fw fa-folder" />
//     <span>Manage Schemes</span>
//   </a>
//   <div id="collapseSchemes" className="collapse" aria-labelledby="headingSchemes" data-parent="#accordionSidebar">
//     <div className="bg-white py-2 collapse-inner rounded">
//       <NavLink className="collapse-item" to="/addscheme">Add Scheme</NavLink>
//       <NavLink className="collapse-item" to="/listscheme">List Schemes</NavLink>
//     </div>
//   </div>
//   </li>

//       {/* Divider */}
//       <hr className="sidebar-divider d-none d-md-block" />
//       {/* Sidebar Toggler (Sidebar) */}
//       <div className="text-center d-none d-md-inline">
//         <button className="rounded-circle border-0" id="sidebarToggle" />
//       </div>
//     </ul>
//         </>
//     )
// }

// export default Sidebar;

// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaUserShield,
//   FaTachometerAlt,
//   FaSeedling,
//   FaUsers,
//   FaShoppingCart,
//   FaBook,
//   FaBrain,
//   FaComments
// } from "react-icons/fa";
// import "./Sidebar.css";

// function Sidebar() {
//   const [openProducts, setOpenProducts] = useState(false);
//   const [openSchemes, setOpenSchemes] = useState(false);

//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <FaUserShield className="icon" />
//         <span className="brand-text">Admin</span>
//       </div>

//       <ul className="sidebar-menu">
//         <li>
//           <NavLink exact="true" to="/" className="nav-link">
//             <FaTachometerAlt className="icon" />
//             Dashboard
//           </NavLink>
//         </li>

//         <li className="submenu">
//           <div className="submenu-title" onClick={() => setOpenSchemes(!openSchemes)}>
//             <FaSeedling className="icon" />
//             Schemes Management
//           </div>
//           {openSchemes && (
//             <ul className="submenu-items">
//               <li><NavLink to="/addscheme">Add Scheme</NavLink></li>
//               <li><NavLink to="/listscheme">List Schemes</NavLink></li>
//             </ul>
//           )}
//         </li>

//         <li className="submenu">
//           <div className="submenu-title" onClick={() => setOpenProducts(!openProducts)}>
//             <FaShoppingCart className="icon" />
//             Products Management
//           </div>
//           {openProducts && (
//             <ul className="submenu-items">
//               <li><NavLink to="/addproduct">Add Product</NavLink></li>
//               <li><NavLink to="/listproduct">List Products</NavLink></li>
//             </ul>
//           )}
//         </li>
//         <li>
//           <NavLink to="/user" className="nav-link">
//             <FaUsers className="icon" />
//             Users Management
//           </NavLink>
//         </li>
 

//         <li>
//           <NavLink to="/learning" className="nav-link">
//             <FaBook className="icon" />
//             Learning Center
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/crop-disease-ai" className="nav-link">
//             <FaBrain className="icon" />
//             Crop Disease AI
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/chat" className="nav-link">
//             <FaComments className="icon" />
//             Chat Management
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;
