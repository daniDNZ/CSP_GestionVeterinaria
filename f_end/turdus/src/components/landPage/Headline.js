function Headline() {

    return (
        <>
            <div id="home" className="headline display-relative overflow-hidden p-5">
                <div className="d-md-flex flex-md-equal w-100 my-3">
                    <div className="text-center text-md-start text-primary overflow-hidden flex-fill flex-grow-1">
                        {/* <p className="text-dark">CLÍNICA VETERINARIA CON SERVICIO 24H LOS 365 DÍAS DEL AÑO</p> */}
                        <img src="/img/marabu-orange.png" className="w-100" style={{maxWidth: "964px"}}/>
                        <h3 className="display-6 fw-lighter my-2">Clínica Veterinaria Guadalajara</h3>
                        {/* <p className="lead">
                                Profesionales con amplia experiencia en las distintas
                                especialidades para asegurar la salud de los peludos.
                            </p> */}
                        <p className="m-0">
                            <a role="button" className="btn btn-lg btn-outline-primary" href="#contact">Ven a vernos</a>
                        </p>
                        {/* <p className="m-0">
                            <a role="button" className="btn btn-lg btn-outline-primary bg-transparent p-0 border-0" href="#contact">Contacto</a>
                        </p> */}
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