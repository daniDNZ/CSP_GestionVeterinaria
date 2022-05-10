function Headline() {

    return (
        <>
            <div id="home" className="headline display-relative overflow-hidden py-3 p-md-5">
                <div className="d-md-flex flex-md-equal w-100 my-3 ps-md-3">
                    <div className="me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-md-start text-white overflow-hidden flex-fill flex-grow-1">
                        <p>CLÍNICA VETERINARIA CON SERVICIO 24H LOS 365 DÍAS DEL AÑO</p>
                        <h1>Clínica Veterinaria TuClínica</h1>
                        <h1>Guadalajara</h1>
                        {/* <p className="lead">
                                Profesionales con amplia experiencia en las distintas
                                especialidades para asegurar la salud de los peludos.
                            </p> */}
                        <p className="lead">
                            <a role="button" className="btn btn-lg btn-outline-primary fw-bold border-0" href="#contact">¿Dónde estamos?</a>
                        </p>
                        <p className="lead">
                            <a role="button" className="btn btn-lg btn-outline-primary fw-bold border-0" href="#contact">Contacto</a>
                        </p>
                    </div>
                    <div className="d-float headline-image">
                            {/* <img src="/img/headline2.jpg" className="img-fluid"/> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Headline;