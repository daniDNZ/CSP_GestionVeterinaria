import { useEffect } from "react";
import { addUpdateCustomer, addUpdatePatient, addUpdateVisit } from "./ApiFetch";
import { FormModal, handleClean } from "./FormController";

// Listeners
const addEvents = (callback) => {
    const form = document.querySelector('form');
    form.addEventListener('submit', callback);
}

// Si el formulario es para update utilizamos un modal
const setModal = (action) => {
    if (action == 'update') return <FormModal />
    else return <button type="submit" className="btn btn-primary">Añadir</button>
}

function CustomerForm({ action }) {

    const modal = setModal(action);

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();

        const fData = e.target;             // Asignamos el formulario
        addUpdateCustomer(fData, action);   // Llamamos a la petición indicando la acción (add | update)
    }

    useEffect(() => {
        addEvents(handleFData);
    }, [])
    return (
        <>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="row justify-content-between" id="form-title">
                        <h3 className="col-auto">Cliente</h3>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerName" className="form-label">Nombre cliente:</label>
                        <input type="text" id="customerName" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerLastname" className="form-label" >Apellidos cliente:</label>
                        <input type="text" id="customerLastname" className="form-control" required/>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerPhone" className="form-label">Teléfono cliente:</label>
                        <input type="text" id="customerPhone" className="form-control" required/>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerEmail" className="form-label">Email:</label>
                        <input type="email" id="customerEmail" className="form-control" required/>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerDni" className="form-label">DNI:</label>
                        <input type="text" id="customerDni" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerPc" className="form-label">CP:</label>
                        <input type="text" id="customerPc" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerAddress" className="form-label">Dirección:</label>
                        <input type="text" id="customerAddress" className="form-control" />
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="customerInfo" className="form-label">Información cliente:</label>
                            <textarea type="" id="customerInfo" className="form-control" rows="5" />
                        </div>
                    </div>
                </div>
                { modal }
                
            </form>
        </>
    )
}

function PatientForm({ action }) {

    const modal = setModal(action);

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();

        const fData = e.target;             // Asignamos el formulario
        addUpdatePatient(fData, action);   // Llamamos a la petición indicando la acción (add | update)
    }

    useEffect(() => {
        addEvents(handleFData);
    }, [])
    return (
        <>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="row justify-content-between" id="form-title">
                        <h3 className="col-auto">Paciente</h3>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="vetPicker" className="form-label">Veterinaria/o:</label>
                        <input type="search" id="vetPicker" className="form-control" list="vetPicker-datalist" placeholder="Buscar..." />
                        <datalist id="vetPicker-datalist">
                        </datalist>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerPicker" className="form-label">Cliente:</label>
                        <input type="search" id="customerPicker" className="form-control" list="customerPicker-datalist" placeholder="Buscar..." />
                        <datalist id="customerPicker-datalist">
                        </datalist>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientName" className="form-label">Nombre paciente:</label>
                        <input type="text" id="patientName" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="speciesPicker" className="form-label">Especie:</label>
                        <input type="search" id="speciesPicker" className="form-control" list="speciesPicker-datalist" placeholder="Buscar..." />
                        <datalist id="speciesPicker-datalist">
                        </datalist>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="racePicker" className="form-label">Raza:</label>
                        <input type="search" id="racePicker" className="form-control" list="racePicker-datalist" placeholder="Buscar..." />
                        <datalist id="racePicker-datalist">
                        </datalist>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="genderPicker" className="form-label">Género:</label>
                        <select type="" id="genderPicker" className="form-select">
                            <option id="ge-null" value="">Select...</option>
                            <option id="ge-Male" value="Male">Macho</option>
                            <option id="ge-Female" value="Female">Hembra</option>
                        </select>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="sterilisedPicker" className="form-label">Esterilizad@:</label>
                        <select type="" id="sterilisedPicker" className="form-select">
                            <option id="st-null" value="">Select...</option>
                            <option id="st-0" value="0">No</option>
                            <option id="st-1" value="1">Sí</option>
                        </select>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientBirthday" className="form-label">Cumpleaños:</label>
                        <input type="date" id="patientBirthday" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientWeight" className="form-label">Peso:</label>
                        <input type="text" id="patientWeight" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientChip" className="form-label">CHIP:</label>
                        <input type="text" id="patientChip" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientColor" className="form-label">Color:</label>
                        <input type="text" id="patientColor" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientEyes" className="form-label">Ojos:</label>
                        <input type="text" id="patientEyes" className="form-control" />
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="patientInfo" className="form-label">Información paciente:</label>
                            <textarea type="" id="patientInfo" className="form-control" rows="5" />
                        </div>
                    </div>
                </div>
                { modal }
            </form>
        </>
    )
}

function VisitForm({ action }) {

    const modal = setModal(action);

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();

        const fData = e.target;             // Asignamos el formulario
        addUpdateVisit(fData, action);      // Llamamos a la petición indicando la acción (add | update)
    }

    const sumDuration = (e) => {
        e.preventDefault();

        const input = document.getElementById('duration');
        input.value = parseInt(input.value) + 15;
        
    }

    const restDuration = (e) => {
        e.preventDefault();

        const input = document.getElementById('duration');
        input.value = parseInt(input.value) - 15;

        if (input.value < 15) input.value = 15;
    }

    useEffect(() => {
        addEvents(handleFData);
    }, [])
    return (
        <>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="row justify-content-between" id="form-title">
                        <h3 className="col-auto">Visita</h3>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="dateTimePicker" className="form-label">Fecha/Hora:</label>
                        <input type="datetime-local" id="dateTimePicker" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="vetPicker" className="form-label">Veterinaria/o:</label>
                        <input type="search" id="vetPicker" className="form-control"  list="vetPicker-datalist" placeholder="Buscar..." />
                        <datalist id="vetPicker-datalist" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="duration" className="form-label">Duración estimada:</label>
                        <div className="input-group">
                            <input type="text" id="duration" className="form-control" defaultValue="15" readOnly/>
                                <button type="button" className=" btn btn-outline-secondary" onClick={sumDuration}>+</button>
                                <button type="button" className="btn btn-outline-secondary" onClick={restDuration}>-</button>
                        </div>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="completedPicker" className="form-label">Completada:</label>
                        <select type="" id="completedPicker" className="form-select" >
                            <option id="co-null" value="">Select...</option>
                            <option id="co-0" value="0">No</option>
                            <option id="co-1" value="1">Sí</option>
                        </select>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="category" className="form-label">Categoría:</label>
                        <input type="text" id="category" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientPicker" className="form-label">Paciente:</label>
                        <input type="search" id="patientPicker" className="form-control" list="patientPicker-datalist" placeholder="Buscar..." />
                        <datalist id="patientPicker-datalist" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerPicker" className="form-label">Cliente:</label>
                        <input type="search" id="customerPicker" className="form-control" list="customerPicker-datalist" placeholder="Buscar..." />
                        <datalist id="customerPicker-datalist" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientWeight" className="form-label">Peso:</label>
                        <input type="text" id="patientWeight" className="form-control" />
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripción:</label>
                            <textarea type="" id="description" className="form-control" rows="5" />
                        </div>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="treatment" className="form-label">Tratamiento:</label>
                                <textarea type="" id="treatment" className="form-control" rows="5" />
                            </div>
                        </div>
                    </div>
                </div>
                { modal }
            </form>
        </>
    )
}

function Form({ selector, action }) {

    let form;

    switch (selector) {
        case 'customer':
            form = <CustomerForm action={ action } />;
            break;
        case 'patient':
            form = <PatientForm action={ action }/>;
            break;
        default:
            form = <VisitForm action={ action }/>;
            break;
    }

    return (
        <>
            {form}
        </>
    )
}

export default Form;