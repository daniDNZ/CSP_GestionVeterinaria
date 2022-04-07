import { NavLink } from "react-router-dom";
function DashboardNavContent() {
    return (
        <ul className="nav nav-pills flex-column">
            <li className="mx-0 nav-item">
                <NavLink to="/turdus/dashboard" className="nav-link px-2">

                    <i className="bi bi-speedometer fs-5 me-2"></i>
                    <span className="d-inline">Dashboard</span>

                </NavLink>
            </li>
            <li className="mx-0 nav-item">
                <NavLink to="/turdus/schedule" className="nav-link px-2">
                    <i className="bi bi-calendar-week fs-5 me-2"></i>
                    <span className="d-inline">Horario</span>
                </NavLink>
            </li>
            <li className="mx-0 nav-item">
                <NavLink to="/turdus/visits" className="nav-link px-2">
                    <i className="bi bi-card-text fs-5 me-2"></i>
                    <span className="d-inline">Visitas</span>
                </NavLink>
            </li>
            <li className="mx-0 nav-item">
                <a href="#" className="nav-link px-2">
                    <i className="bi bi-bricks fs-5 me-2 "></i>
                    <span className="d-inline">Products</span>
                </a>
            </li>
            <li className="mx-0 nav-item">
                <a href="#" className="nav-link px-2 dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#customers-collapse" aria-controls="#customers-collapse" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="bi bi-person-lines-fill fs-5 me-2"></i>
                    <span className="d-inline">Clientes</span>
                </a>
                <div id="customers-collapse" className="collapse navbar-collapse">
                    <hr className="m-0" />
                    <ul className="nav navbar-nav flex-column">
                        <li className="mx-0 nav-item">
                            <NavLink to="/turdus/registrations" className="nav-link px-2">
                                <i className="bi bi-plus-circle fs-5 me-2"></i>
                                <span className="d-inline">Altas</span>
                            </NavLink>
                        </li>
                        <li className="mx-0 nav-item">
                            <NavLink to="/turdus/search" className="nav-link px-2">
                                <i className="bi bi-search fs-5 me-2"></i>
                                <span className="d-inline">Búsqueda</span>
                            </NavLink>
                        </li>
                        
                    </ul>
                </div>

            </li>
            <li className="mx-0 nav-item d-md-none">
                <a href="#" className="nav-link px-2 dropdown-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#user-collapse" aria-controls="#user-collapse" aria-expanded="false">
                    <img src="https://via.placeholder.com/28?text=!" alt="user" width="24" height="24" className="rounded-circle me-1" />
                    <span className="d-inline">Chellmer0</span>
                </a>
                <div id="user-collapse" className="collapse navbar-collapse">
                    <hr className="m-0" />
                    <ul className="nav nav-pills flex-column">
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

            </li>
        </ul>
    )
}

export default DashboardNavContent;