import { NavLink } from "react-router-dom";


function Navigation() {
  return (
    <>
      <div className="d-flex flex-column bg-light w-100">

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/turdus/dashboard" className="nav-link active">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  {
                    localStorage.token ?
                      <NavLink to="/turdus/logout" className="nav-link">Logout</NavLink> :
                      <NavLink to="/turdus/login" className="nav-link">Login</NavLink>
                  }
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navigation;