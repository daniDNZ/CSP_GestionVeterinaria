import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <>
            <aside className="col-sm-2 flex-grow-sm-1 flex-shrink-1 flex-grow-0 sticky-top  bg-light px-0" >
                <div className="p-1 h-100 sticky-top px-3">
                    <ul className="nav nav-pills flex-sm-column flex-row justify-content-between text-truncate  make-me-sticky">
                        <li className="nav-item">
                            <NavLink to="/turdus/dashboard" className="nav-link px-2 text-truncate">
                                <i className="bi bi-speedometer fs-5 me-2 me-2"></i>
                                <span className="d-none d-sm-inline">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/turdus/schedule" className="nav-link px-2 text-truncate">
                                <i className="bi bi-calendar-week fs-5 me-2 me-2"></i>
                                <span className="d-none d-sm-inline">Horario</span>
                            </NavLink>
                        </li>
                        <li>
                        <NavLink to="/turdus/visits" className="nav-link px-2 text-truncate">
                                <i className="bi bi-card-text fs-5 me-2"></i>
                                <span className="d-none d-sm-inline">Visitas</span>
                        </NavLink>
                        </li>
                        <li>
                            <a href="#" className="nav-link px-2 text-truncate">
                                <i className="bi bi-bricks fs-5 me-2"></i>
                                <span className="d-none d-sm-inline">Products</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link px-2 text-truncate">
                                <i className="bi bi-people fs-5 me-2"></i>
                                <span className="d-none d-sm-inline">Clientes</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;