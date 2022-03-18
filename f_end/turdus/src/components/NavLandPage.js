
function NavLandPage() {
  return (
    <>
      <header className="header-land-page px-5 py-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand">TuClínica</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="true" href="#home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#clinica">La clínica</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">Contacto</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    Login
                  </a>
                  <form className="dropdown-menu dropdown-menu-end p-4">
                    <div className="form-floating mb-3">
                      <input type="email" className="form-control" id="dropdownFormEmail2" placeholder="email@example.com" />
                      <label htmlFor="dropdownFormEmail2" className="form-label">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="password" className="form-control" id="dropdownFormPassword2" placeholder="Password" />
                      <label htmlFor="dropdownFormPassword2" className="form-label">Password</label>
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="dropdownCheck2" />
                        <label className="form-check-label" htmlFor="dropdownCheck2">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default NavLandPage;