import {NavLink} from "react-router-dom";


function Navigation() {
    return (
      <>
      <nav className="row justify-content-around bg-dark py-3 mx-0">
        <NavLink to="/" className="font-weight-bold text-light text-decoration-none">Login</NavLink>
        <NavLink to="home" className="font-weight-bold text-light text-decoration-none">Home</NavLink>
      </nav>
      </>
    )
}

export default Navigation;