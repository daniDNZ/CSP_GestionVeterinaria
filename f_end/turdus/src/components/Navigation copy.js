import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";


function Navigation() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Turdus</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
        
              <NavLink to="/turdus/dashboard" className="nav-item nav-link active">Home</NavLink>
              {
                localStorage.token ?
                  <NavLink to="/turdus/logout" className="nav-item nav-link">Logout</NavLink> :
                  <NavLink to="/turdus/login" className="nav-item nav-link">Login</NavLink>
              }
          
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation;