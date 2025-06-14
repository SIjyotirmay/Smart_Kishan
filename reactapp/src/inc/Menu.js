import { NavLink } from "react-router-dom";
function Menu(){
    return(
        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Logo</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About Us</NavLink>
                    </li>
                
                </ul>
                </div>
            </div>
            </nav>

        </>
    )
}

export default Menu;