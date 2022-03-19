function Sidebar() {
    return (
        <>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
            <i class="bi bi-bootstrap-fill" style={{"fontSize":"1.5em"}}></i>
                        &nbsp;
                <span className="fs-4">MiClínica.Turdus</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                    <i class="bi bi-house"></i>
                        &nbsp;
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark">
                    <i class="bi bi-speedometer2"></i>
                        &nbsp;
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark">
                    <i class="bi bi-table"></i>
                        &nbsp;
                        Orders
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark">
                    <i class="bi bi-grid"></i>
                        &nbsp;
                        Products
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-dark">
                        <i class="bi bi-people"></i>
                        &nbsp;
                        Customers
                    </a>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" className="rounded-circle me-2" width="32" height="32" />
                    <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;