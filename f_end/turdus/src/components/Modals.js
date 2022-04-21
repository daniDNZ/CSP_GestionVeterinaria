import { addUpdatePatient, addUpdateVisit } from "./ApiFetch";
import { Form } from "./Form"

function AlertModal() {
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

function NewPatient(){
    const handleData = (e) => {
        e.preventDefault();

        let fData = {};
        const form = document.querySelector('.modal-body form');
        for (const e of form) {
            Object.defineProperty(fData, e.id,                   // Creamos una propiedad del objeto filter con el string a buscar.
            {
                value: {value: e.value},
                enumerable: true,
                configurable: true,
                writable: true
            }
            )
        }
        addUpdatePatient(fData, 'add');
    }


    return (
        <>
            <div className="modal fade" id="newPatientModal" tabIndex="-1" aria-labelledby="newPatientModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newPatientModalLabel">Nuevo Paciente</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form selector='patient' action='add' />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={handleData}>Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function NewVisit(){
    const handleData = (e) => {
        e.preventDefault();

        let fData = {};
        const form = document.querySelector('.modal-body form');
        for (const e of form) {
            Object.defineProperty(fData, e.id,                   // Creamos una propiedad del objeto fData con el string a buscar.
            {
                value: {value: e.value},
                enumerable: true,
                configurable: true,
                writable: true
            }
            )
        }
        addUpdateVisit(fData, 'add');
    }


    return (
        <>
            <div className="modal fade" id="newVisitModal" tabIndex="-1" aria-labelledby="newVisitModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newVisitModalLabel">Nueva Visita</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form selector='visit' action='add' />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={handleData}>Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ViewVisitsList(){
   


    return (
        <>
            <div className="modal fade" id="viewVisitsListModal" tabIndex="-1" aria-labelledby="viewVisitsListModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="viewVisitsListModalLabel">Visita Ref</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" >Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { AlertModal, NewPatient, NewVisit, ViewVisitsList }