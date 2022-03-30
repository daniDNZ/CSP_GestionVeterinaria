import { NavLink } from "react-router-dom";
import DashboardNavContent from "./DashboardNavContent";

function DashboardNavigation() {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light make-me-sticky py-3">
        <div className="container-fluid">

          <div className="flex-shrink-1">
            <a href="#" className="d-flex align-items-center col-lg-4 mb-0 mb-lg-0 link-dark text-decoration-none">
              <i className="bi bi-bootstrap fs-2 text-dark"></i>
              <span className="d-none d-sm-inline"><h3 className="my-0 mx-1">TuClínica.Turdus</h3></span>
            </a>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="#navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <div className="d-md-none">
              <DashboardNavContent />
            </div>
            <div className="flex-shrink-0 dropdown d-none d-md-flex">
              <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://via.placeholder.com/28?text=!" alt="user" width="32" height="32" className="rounded-circle me-2" />
                <strong>Chellmer0</strong>
              </a>
              <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="dropdownUser2" >
                <li><a className="dropdown-item" href="#">New project...</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink to="/turdus/logout" className="dropdown-item">Sign out</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default DashboardNavigation;