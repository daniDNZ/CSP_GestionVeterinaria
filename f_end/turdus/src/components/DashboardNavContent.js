import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/context";

function DashboardNavContent() {
    const { user } = useContext(UserContext);
    const src = `/img/profile/${user.pic}`;
    const img = <img src={src} alt="user" width="32" height="32" className="rounded-circle me-2"/>;

    let li;

    user.roles.includes('ROLE_ADMIN')
    ? li = 
        <li>
          <a 
            href="/turdus/settings" 
            className="dropdown-item">
              Administrar Usuarios
          </a>
        </li>
    : li = <></>;

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
                <NavLink to="/turdus/waiting_room" className="nav-link px-2">
                    <i className="bi bi-signpost-2 fs-5 me-2"></i>
                    <span className="d-inline">Recepción</span>
                </NavLink>
            </li>
            <li className="mx-0 nav-item">
                <NavLink to="/turdus/search" className="nav-link px-2">
                    <i className="bi bi-search fs-5 me-2"></i>
                    <span className="d-inline">Buscar</span>
                </NavLink>
            </li>
            <li className="mx-0 nav-item">
                <NavLink to="/turdus/registrations" className="nav-link px-2">
                    <i className="bi bi-plus-circle fs-5 me-2"></i>
                    <span className="d-inline">Añadir</span>
                </NavLink>
            </li>
            <li className="mx-0 nav-item d-md-none">
                <a href="#" className="nav-link px-2 dropdown-toggle collapsed" id="dropdownUser2" data-bs-toggle="collapse" data-bs-target="#user-collapse" aria-controls="#user-collapse" aria-expanded="false">
                    {img}
                </a>
                <div id="user-collapse" className="collapse navbar-collapse">
                    <hr className="m-0" />
                    <ul id="dropdownUserUl2" className="nav nav-pills flex-column">
                        {li}
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <NavLink to="/logout" className="dropdown-item">Sign out</NavLink>
                        </li>
                    </ul>
                </div>

            </li>
        </ul>
    )
}

export default DashboardNavContent;