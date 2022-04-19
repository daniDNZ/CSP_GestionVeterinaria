import { useEffect } from "react";
import { addUpdateCustomer, addUpdatePatient, addUpdateVisit, findPatients, findTime, findRaces, getCustomers, getPatients, getRaces, getSpecies, getVets } from "./ApiFetch";
import { FormModal, handleClean } from "./FormController";
import OpenTime from "./OpenTime";

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

// Crea las options de las datalist
const handleDatalist = ( id, name, identifier = '') => {
    const datalist = document.getElementById(id);
    const option = document.createElement('option');

    identifier == '' ? option.value = name : option.value = `${name} - ${identifier}`;

    datalist.append(option);
}

// Limpia una datalist
const cleanDatalist = (id) => {
    const datalist = document.getElementById(id);
    datalist.innerHTML = '';
}

function CustomerForm({ action, id }) {

    const modal = setModal(action);

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();

        const fData = e.target;   
        addUpdateCustomer(fData, action, id);   // Llamamos a la petición indicando la acción (add | update)
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
                        <input type="text" id="customerLastname" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerPhone" className="form-label">Teléfono cliente:</label>
                        <input type="text" id="customerPhone" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerEmail" className="form-label">Email:</label>
                        <input type="email" id="customerEmail" className="form-control" required />
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
                {modal}

            </form>
        </>
    )
}

function PatientForm({ action, id = '' }) {

    const modal = setModal(action);

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();

        const fData = e.target;             // Asignamos el formulario
        addUpdatePatient(fData, action, id);   // Llamamos a la petición indicando la acción (add | update)
    }

    const handleVets = (data) => {
        data.forEach(e => {
            const name = e.name;
            const identifier = e.username; 

            handleDatalist('vetPicker-datalist', name, identifier)
        });
    }

    const handleCustomers = (data) => {
        data['allData'].forEach(e => {
            const name = e.name;
            const identifier = e.email; 

            handleDatalist('customerPicker-datalist', name, identifier)
        });
    }

    const handleSpecies = (data) => {
        data.forEach(e => {
            const name = e.name;

            handleDatalist('speciesPicker-datalist', name)
        });
    }

    const handleRaces = (data) => {
        data.forEach(e => {
            const name = e.name;

            handleDatalist('racePicker-datalist', name)
        });
    }

    const captureSpecies = (e) => {
        e.preventDefault();

        const species = e.target.value;

        cleanDatalist('racePicker-datalist');
        findRaces(handleRaces, species);
    }

    const fetchDatalists = () => {
        getVets(handleVets);
        getCustomers(handleCustomers);
        getSpecies(handleSpecies);
        getRaces(handleRaces);
    }

    useEffect(() => {
        addEvents(handleFData);
        fetchDatalists();
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
                        <input type="search" id="speciesPicker" className="form-control" list="speciesPicker-datalist" placeholder="Buscar..." onInput={captureSpecies}/>
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
                {modal}
            </form>
        </>
    )
}

function VisitForm({ action, id = '' }) {

    const filter = {};

    const modal = setModal(action);

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();

        const fData = e.target;             // Asignamos el formulario
        addUpdateVisit(fData, action, id);      // Llamamos a la petición indicando la acción (add | update)
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

    const handleVets = (data) => {
        data.forEach(e => {
            const name = e.name;
            const identifier = e.username; 

            handleDatalist('vetPicker-datalist', name, identifier)
        });
    }

    const handleCustomers = (data) => {
        data['allData'].forEach(e => {
            const name = e.name;
            const identifier = e.email; 

            handleDatalist('customerPicker-datalist', name, identifier)
        });
    }

    const handlePatients = (data) => {
        data['allData'].forEach(e => {
            const name = e.name;
            const identifier = '#'+e.id;

            handleDatalist('patientPicker-datalist', name, identifier)
        });
    }

    const handleCustomersFromPatients = (data) => {
        if (data['allData'].length > 0) {
            data['allData'].forEach(e => {
                const name = e.customer;
                const identifier = e.customerEmail;

                handleDatalist('customerPicker-datalist', name, identifier);
            }) 
        } else {
            getCustomers(handleCustomers);
        }
            
    }

    const handleTime = (data) => {

        let options = document.querySelectorAll('#timePicker>option');  // Recogemos los options

        options.forEach(o => {
            if (o.hasAttribute('disabled')) o.removeAttribute('disabled'); // Eliminamos el atributo disabled 
        })
        data.forEach(v => {                                  // Recorremos las visitas
            let dur = 0;                                     // Variable que recoge la duración de las visitas previas
            options.forEach(o => {
                if (dur > 1) {

                    o.setAttribute('disabled', 'true');     // Si la duración > 1 quiere decir que está ocupado por otra visita, desabilitamos.
                    dur--;                                  // Decrementamos la duración.

                } else {

                    if (v.time == o.value) {                // Si coincide la hora con una de las visitas, desabilitamos.
                        o.setAttribute('disabled', 'true');
                        dur = v.duration;                   // Asignamos la duración a la variable para no pisar una visita con otra.
                    } 
                }
            });
        });
    }

    const capturePatient = (e) => {
        e.preventDefault();

        const patient = e.target.value;

        cleanDatalist('customerPicker-datalist');
        findPatients(handleCustomersFromPatients, 1, {namePicker: patient});
    }

    const captureCustomer = (e) => {
        e.preventDefault();

        const customer = e.target.value.split(' - ')[0];

        cleanDatalist('patientPicker-datalist');
        findPatients(handlePatients, 1, {customerPicker: customer});
    }

    const captureVet = (e) => {
        e.preventDefault();

        const vet = e.target.value.split(' - ')[1];
        Object.defineProperty(filter, 'vet', 
            {
                value: vet,
                enumerable: true,
                configurable: true,
                writable: true
            })
    }

    const captureDate = (e) => {
        e.preventDefault();

        const date = e.target.value;
        Object.defineProperty(filter, 'date', 
            {
                value: date,
                enumerable: true,
                configurable: true,
                writable: true
            })
        findTime(handleTime, filter);
    }

    const fetchDatalists = () => {
        getVets(handleVets);
        getCustomers(handleCustomers);
        getPatients(handlePatients);
    }

    useEffect(() => {
        addEvents(handleFData);
        fetchDatalists();
        OpenTime();
    }, [])
    return (
        <>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="row justify-content-between" id="form-title">
                        <h3 className="col-auto">Visita</h3>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="vetPicker" className="form-label">Veterinaria/o:</label>
                        <input type="search" id="vetPicker" className="form-control" list="vetPicker-datalist" placeholder="Buscar..." onInput={captureVet}/>
                        <datalist id="vetPicker-datalist" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="dateTimePicker" className="form-label">Fecha:</label>
                        <input type="date" id="datePicker" className="form-control" onInput={captureDate}/>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="timePicker" className="form-label">Hora:</label>
                        <select id="timePicker" className="form-select" >
                           
                        </select>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="duration" className="form-label">Duración estimada:</label>
                        <div className="input-group">
                            <input type="text" id="duration" className="form-control" defaultValue="15" style={{ width: '70px' }} readOnly />
                            <span className="input-group-text"> min</span>
                            <button type="button" className=" btn btn-outline-secondary" onClick={sumDuration}>+</button>
                            <button type="button" className="btn btn-outline-secondary" onClick={restDuration}>-</button>
                        </div>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="completedPicker" className="form-label">Completada:</label>
                        <select id="completedPicker" className="form-select" >
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
                        <input type="search" id="patientPicker" className="form-control" list="patientPicker-datalist" placeholder="Buscar..." onInput={capturePatient}/>
                        <datalist id="patientPicker-datalist" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerPicker" className="form-label">Cliente:</label>
                        <input type="search" id="customerPicker" className="form-control" list="customerPicker-datalist" placeholder="Buscar..." onInput={captureCustomer}/>
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
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="treatment" className="form-label">Tratamiento:</label>
                            <textarea type="" id="treatment" className="form-control" rows="5" />
                        </div>
                    </div>
                </div>
                {modal}
            </form>
        </>
    )
}

function Form({ selector, action, id = ''}) {

    let form;

    switch (selector) {
        case 'customer':
            form = <CustomerForm action={action} id={id}/>;
            break;
        case 'patient':
            form = <PatientForm action={action} id={id}/>;
            break;
        default:
            form = <VisitForm action={action} id={id}/>;
            break;
    }

    return (
        <>
            {form}
        </>
    )
}

export default Form;