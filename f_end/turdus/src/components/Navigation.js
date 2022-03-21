import { NavLink } from "react-router-dom";


function Navigation() {
  return (
    <>
      <div className="container-fluid align-items-center d-flex">
          <div className="flex-shrink-1">
            <a href="#" className="d-flex align-items-center col-lg-4 mb-0 mb-lg-0 link-dark text-decoration-none">
              <i className="bi bi-bootstrap fs-2 text-dark"></i>
              <span className="d-none d-sm-inline"><h3 className="my-0 mx-1">TuClínica.Turdus</h3></span>
            </a>
          </div>
          <div className="flex-grow-1 d-flex align-items-center justify-content-end">
            
            <div className="flex-shrink-0 dropdown">
              <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://via.placeholder.com/28?text=!" alt="user" width="32" height="32" className="rounded-circle me-2" />
                <strong>vet</strong>
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
    </>
  )
}

export default Navigation;