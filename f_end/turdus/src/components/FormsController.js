import { useEffect } from "react";

function FormModal() {
    return (
        <>
            {/* Button trigger modal  */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#warningModal">Añadir</button>
            {/* Modal  */}
            <div className="modal fade" id="warningModal" tabIndex="-1" aria-labelledby="warningModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="warningModalLabel">¿Quieres actualizar?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Esta acción no se puede deshacer
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function FormAlerts() {
    const closeAlert = (e) => {
        e.preventDefault();
    
        const alert = e.target.parentElement;
        alert.classList.contains('d-none') ? alert.classList.remove('d-none') : alert.classList.add('d-none');
    
    }
    useEffect(() => {
        document.getElementById('alert-success-close').addEventListener('click', closeAlert);
        document.getElementById('alert-danger-close').addEventListener('click', closeAlert);
    }, [])
    
    return (
        <>
            <div className="alert alert-success alert-dismissible fade d-none show" tabIndex="-1" id="completedAlert" role="alert" aria-hidden="true">

                <strong>Creado con éxito!</strong>
                <button type="button" id="alert-success-close" className="btn-close" aria-label="Close"></button>

            </div>
            <div className="alert alert-danger alert-dismissible fade d-none show" tabIndex="-1" id="failedAlert" role="alert" aria-hidden="true">

                <strong>Error al crear, compruebe los campos</strong>
                <button type="button" id="alert-danger-close" className="btn-close" aria-label="Close"></button>

            </div>
        </>
    )
}



function CustomerForm() {
    return (
        <>
            <div className="row">
                <div className="mb-3 col-auto">
                    <label htmlFor="customer-name" className="form-label">Nombre:</label>
                    <input type="text" id="customer-name" name="cName" className="form-control" />
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="customer-lastname" className="form-label">Apellidos:</label>
                    <input type="text" id="customer-lastname" name="cLastName" className="form-control" />
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="customer-phone" className="form-label">Teléfono:</label>
                    <input type="text" id="customer-phone" name="cPhone" className="form-control" />
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="customer-email" className="form-label">Email:</label>
                    <input type="email" id="customer-email" name="cEmail" className="form-control" />
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="customer-dni" className="form-label">DNI:</label>
                    <input type="text" id="customer-dni" name="cDni" className="form-control" />
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="customer-PC" className="form-label">CP:</label>
                    <input type="text" id="customer-PC" name="cPc" className="form-control" />
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="customer-address" className="form-label">Dirección:</label>
                    <input type="text" id="customer-address" name="cAddress" className="form-control" />
                </div>
            </div>
            <div className="row">
                <div className="mb-3">
                    <label htmlFor="customer-info" className="form-label">Info:</label>
                    <textarea rows="5" id="customer-info" name="cInfo" className="form-control" />
                </div>
            </div>
        </>
    )
}

function PatientForm() {
    
    return (
        <>
            <div className="row">

                <div className="mb-3 col-auto">
                    <label htmlFor="vet-picker" className="form-label">Veterinaria/o:</label>
                    <select type="text" id="vet-picker" name="vet" className="form-select" ></select>
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="customer-picker" className="form-label">Cliente:</label>
                    <select type="text" id="customer-picker" name="customer" className="form-select"></select>
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="patient-name" className="form-label">Nombre:</label>
                    <input type="text" id="patient-name" name="name" className="form-control" />
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="species-picker" className="form-label">Especie:</label>
                    <select type="text" id="species-picker" name="species" className="form-select" >
                    </select>
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="race-picker" className="form-label">Raza:</label>
                    <select type="text" id="race-picker" name="race" className="form-select" ></select>
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="gender-picker" className="form-label">Género:</label>
                    <select type="text" id="gender-picker" name="gender" className="form-select" >
                        <option id="Female" value="Female">F</option>
                        <option id="Male" value="Male">M</option>
                    </select>
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="patient-sterilised-picker" className="form-label">Esterilizad@:</label>
                    <select type="text" id="sterilised-picker" name="sterilised" className="form-select" >
                        <option id="ste-false" value='0'>No</option>
                        <option id="ste-true" value='1'>Sí</option>
                    </select>
                </div>
            </div>
            <div className="row">


                <div className="mb-3 col-auto">
                    <label htmlFor="patient-birthday" className="form-label">Nacimiento:</label>
                    <input type="date" id="patient-birthday" name="birthday" className="form-control" />
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="patient-weight" className="form-label">Peso:</label>
                    <input type="text" id="patient-weight" name="weight" className="form-control" />
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="patient-chip" className="form-label">CHIP:</label>
                    <input type="text" id="patient-chip" name="chip" className="form-control" />
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="patient-color" className="form-label">Color:</label>
                    <input type="text" id="patient-color" name="color" className="form-control" />
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="patient-eyes" className="form-label">Ojos:</label>
                    <input type="text" id="patient-eyes" name="eyes" className="form-control" />
                </div>

            </div>
            <div className="row">
                <div className="mb-3">
                    <label htmlFor="patient-info" className="form-label">Información:</label>
                    <textarea rows="5" id="patient-info" name="info" className="form-control" />
                </div>
            </div>
        </>
    )
}
export { FormModal, FormAlerts, CustomerForm, PatientForm };