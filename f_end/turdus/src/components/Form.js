import { useEffect } from "react";
import { addUpdateCustomer, getCustomers } from "./api/ApiCustomers";
import { addUpdatePatient, findPatients, getPatients } from "./api/ApiPatients";
import { addUpdateVisit, findTime } from "./api/ApiVisits";
import { findRaces, getRaces } from "./api/ApiRaces";
import { getSpecies } from "./api/ApiSpecies";
import { getVets, addUpdateUser } from "./api/ApiUser";
import OpenTime from "./OpenTime";
import { AlertModal } from "./Modals";

// Listeners
const addEvents = (callback) => {
    const form = document.querySelector('form');
    form.addEventListener('submit', callback);
}

// Si el formulario es para update utilizamos un modal
const setModal = (action) => {
    if (action == 'update') return <AlertModal />
    else return <button type="submit" className="btn btn-primary">Guardar</button>
}

// Crea las options de las datalist
const handleDatalist = (id, name, identifier = '') => {
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

// Desabilita las horas cogidas para las visitas
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

function UserForm({ action, id }) {

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();

        const fData = new FormData(e.target);
        addUpdateUser(fData, action, id);   // Llamamos a la petición indicando la acción (add | update)
    }

    if (action === 'add') document.getElementById("userViewPage").textContent = `Nuevo usuario`;


    useEffect(() => {
        addEvents(handleFData);
    }, [])
    return (
        <>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="d-flex flex-row justify-content-between" id="form-title">
                        <div className="d-flex flex-row">
                            <h3 className="col-auto" id="userViewPage"> </h3>
                        </div>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userName" className="form-label">Nombre:</label>
                        <input type="text" id="userName" name="name" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userLastname" className="form-label" >Apellidos:</label>
                        <input type="text" id="userLastname" name="last_name" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userArea" className="form-label" >Area:</label>
                        <input type="text" id="userArea" name="area" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userCollegiate" className="form-label" >Colegiado Nº:</label>
                        <input type="text" id="userCollegiate" name="collegiate" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userUsername" className="form-label" >Usuario:</label>
                        <input type="text" id="userUsername" name="username" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userPhone" className="form-label">Teléfono:</label>
                        <input type="text" id="userPhone" name="phone" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userEmail" className="form-label">Email:</label>
                        <input type="email" id="userEmail" name="email" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userDni" className="form-label">DNI:</label>
                        <input type="text" id="userDni" name="dni" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userSalary" className="form-label" >Salario:</label>
                        <input type="text" id="userSalary" name="salary" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userPic" className="form-label" >Foto:</label>
                        <input type="file" id="userPic" name="pic" className="form-control" />
                    </div>
                </div>
                <div id="form-row-2" className="row">

                    <div className="mb-3 col-auto">
                        <label className="form-label" >Roles:</label>

                        <div className="form-check">
                            <input className="form-check-input" type='checkbox' value='ROLE_VET' id="ROLE_VET"/>
                            <label className="form-check-label" htmlFor="ROLE_VET">Veterinaria/o</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type='checkbox' value='ROLE_ATV' id="ROLE_ATV" />
                            <label className="form-check-label" htmlFor="ROLE_ATV">ATV</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type='checkbox' value='ROLE_OFFICE' id="ROLE_OFFICE" />
                            <label className="form-check-label" htmlFor="ROLE_OFFICE">Oficina</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type='checkbox' value='ROLE_ADMIN' id="ROLE_ADMIN" />
                            <label className="form-check-label" htmlFor="ROLE_ADMIN">Admin</label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </>
    )
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
                    <div className="d-flex flex-row justify-content-between" id="form-title">
                        <div className="d-flex flex-row">
                            <h3 className="col-auto" id="customerViewPage">Cliente </h3><span id="cus-debt-badge" className="fs-6"></span>
                        </div>
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

            handleDatalist('responsiblePicker-datalist', name, identifier)
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
                        <label htmlFor="responsiblePicker" className="form-label">Cliente:</label>
                        <input type="search" id="responsiblePicker" className="form-control" list="responsiblePicker-datalist" placeholder="Buscar..." />
                        <datalist id="responsiblePicker-datalist">
                        </datalist>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientName" className="form-label">Nombre paciente:</label>
                        <input type="text" id="patientName" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="speciesPicker" className="form-label">Especie:</label>
                        <input type="search" id="speciesPicker" className="form-control" list="speciesPicker-datalist" placeholder="Buscar..." onInput={captureSpecies} />
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
                        <select id="genderPicker" className="form-select">
                            <option id="ge-null" value="">Select...</option>
                            <option id="ge-Male" value="Male">Macho</option>
                            <option id="ge-Female" value="Female">Hembra</option>
                        </select>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="sterilisedPicker" className="form-label">Esterilizad@:</label>
                        <select type="" id="sterilisedPicker" className="form-select">
                            <option id="st-null" value="">Select...</option>
                            <option id="st-0" value="false">No</option>
                            <option id="st-1" value="true">Sí</option>
                        </select>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientBirthday" className="form-label">Cumpleaños:</label>
                        <input type="date" id="patientBirthday" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientWeight" className="form-label">Peso:</label>
                        <div className="input-group">
                            <input type="text" id="patientWeight" className="form-control" style={{ width: '70px' }} />
                            <span className="input-group-text">Kg</span>
                        </div>
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

    const handleUsers = (data) => {
        data.forEach(e => {
            const name = e.name;
            const identifier = e.username;

            handleDatalist('userPicker-datalist', name, identifier)
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
            const identifier = '#' + e.id;

            handleDatalist('patientPicker-datalist', name, identifier)
        });
    }

    const handleCustomersFromPatients = (data) => {
        console.log(data)
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

    const capturePatient = (e) => {
        e.preventDefault();

        const patient = e.target.value.split(' - ')[0];

        cleanDatalist('customerPicker-datalist');
        findPatients(handleCustomersFromPatients, 1, { namePicker: patient });
    }

    const captureCustomer = (e) => {
        e.preventDefault();

        const customer = e.target.value.split(' - ')[0];

        cleanDatalist('patientPicker-datalist');
        findPatients(handlePatients, 1, { customerPicker: customer });
    }

    const captureUser = (e) => {
        e.preventDefault();

        const user = e.target.value.split(' - ')[1];
        Object.defineProperty(filter, 'user',
            {
                value: user,
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
        getVets(handleUsers);
        getCustomers(handleCustomers);
        getPatients(handlePatients);

        // Horario
        OpenTime();
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
                        <h3 className="col-auto">Visita</h3>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userPicker" className="form-label">Verinaria/o:</label>
                        <input type="search" id="userPicker" className="form-control" list="userPicker-datalist" placeholder="Buscar..." onInput={captureUser} />
                        <datalist id="userPicker-datalist" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="dateTimePicker" className="form-label">Fecha:</label>
                        <input type="date" id="datePicker" className="form-control" onInput={captureDate} />
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
                        <label htmlFor="completedPicker" className="form-label">Cerrada:</label>
                        <select id="completedPicker" className="form-select" >
                            <option id="co-null" value="">Select...</option>
                            <option id="co-0" value="false">No</option>
                            <option id="co-1" value="true">Sí</option>
                        </select>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="category" className="form-label">Categoría:</label>
                        <input type="text" id="category" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="patientPicker" className="form-label">Paciente:</label>
                        <input type="search" id="patientPicker" className="form-control" list="patientPicker-datalist" placeholder="Buscar..." onInput={capturePatient} />
                        <datalist id="patientPicker-datalist" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="customerPicker" className="form-label">Cliente:</label>
                        <input type="search" id="customerPicker" className="form-control" list="customerPicker-datalist" placeholder="Buscar..." onInput={captureCustomer} />
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

function Form({ selector, action, id = '' }) {

    let form;

    switch (selector) {
        case 'customer':
            form = <CustomerForm action={action} id={id} />;
            break;
        case 'patient':
            form = <PatientForm action={action} id={id} />;
            break;
        case 'user':
            form = <UserForm action={action} id={id} />;
            break;
        default:
            form = <VisitForm action={action} id={id} />;
            break;
    }

    return (
        <>
            {form}
        </>
    )
}

export { Form, handleTime };