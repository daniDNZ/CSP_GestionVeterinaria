import { NavLink } from "react-router-dom";
import { useEffect } from "react";

function DashboardNavContent({user}) {

    const getProfilePic = () => {
        const a = document.querySelector('#dropdownUser2');
        const img = document.createElement('img');
        img.setAttribute('src', '/img/profile/'+user.pic);
        img.setAttribute('alt', 'user');
        img.setAttribute('width', '32');
        img.setAttribute('height', '32');
        img.classList.add('rounded-circle', 'me-2');
        a.innerHTML = '';
        a.append(img);
      }
    
      const handleRole = () => {
        if (user.roles){
          if (user.roles.includes('ROLE_ADMIN')) {
            const userUl = document.querySelector('#dropdownUserUl2');
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.classList.add('dropdown-item');
            a.setAttribute('href', '#');
            a.textContent = 'Settings';
    
            li.append(a);
            userUl.prepend(li);
          }
        }
        
      }
    
   
    useEffect(() => {
        if(user) {
            getProfilePic();
            handleRole();
        }
        
    }, [user])
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
             {/* <li className="mx-0 nav-item">
                <a href="#" className="nav-link px-2 dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#visits-collapse" aria-controls="#visits-collapse" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="bi bi-card-text fs-5 me-2"></i>
                    <span className="d-inline">Visitas</span>
                </a>
                <div id="visits-collapse" className="collapse navbar-collapse">
                    <hr className="m-0" />
                    <ul className="nav navbar-nav flex-column">
                        <li className="mx-0 nav-item">
                            <NavLink to="/turdus/registrations" className="nav-link px-2">
                                <i className="bi bi-plus-circle fs-5 me-2"></i>
                                <span className="d-inline">Añadir</span>
                            </NavLink>
                        </li>
                        <li className="mx-0 nav-item">
                            <NavLink to="/turdus/visits" className="nav-link px-2">
                                <i className="bi bi-search fs-5 me-2"></i>
                                <span className="d-inline">Búsqueda</span>
                            </NavLink>
                        </li>
                        
                    </ul>
                </div>

            </li> */}

            {/* <li className="mx-0 nav-item">
                <a href="#" className="nav-link px-2">
                    <i className="bi bi-bricks fs-5 me-2 "></i>
                    <span className="d-inline">Products</span>
                </a>
            </li> */}
            {/* <li className="mx-0 nav-item">
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

            </li> */}
            <li className="mx-0 nav-item d-md-none">
                <a href="#" className="nav-link px-2 dropdown-toggle collapsed" id="dropdownUser2" data-bs-toggle="collapse" data-bs-target="#user-collapse" aria-controls="#user-collapse" aria-expanded="false">
                </a>
                <div id="user-collapse" className="collapse navbar-collapse">
                    <hr className="m-0" />
                    <ul id="dropdownUserUl2" className="nav nav-pills flex-column">
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