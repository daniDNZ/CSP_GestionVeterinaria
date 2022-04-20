import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/visits.css';
import { Form, handleTime } from "./Form";
import { findOneCustomer, findOnePatient, findOneVisit, findCustomerPatients, findPatientVisits, findTime, addUpdateVisit, closeVisit } from "./ApiFetch";
import { NewPatient, NewVisit } from "./Modals";

function Customer() {
    const { id } = useParams();

    useEffect(() => {

        findOneCustomer(handleCustomer, id);
        addButtons();
        findCustomerPatients(addPatients, id)

    }, [])

    const handleCustomer = (data) => {

        document.getElementById("customerDni").value = data.dni;
        document.getElementById("customerName").value = data.name;
        document.getElementById("customerInfo").value = data.info;
        document.getElementById("customerPhone").value = data.phone;
        document.getElementById("customerEmail").value = data.email;
        document.getElementById("customerPc").value = data.postalCode;
        document.getElementById("customerAddress").value = data.address;
        document.getElementById("customerLastname").value = data.lastName;
        
        // Modal
        document.getElementById("responsiblePicker").value = `${data.name} - ${data.email}`;

    }

    const addButtons = () => {
        const formTitle = document.querySelector("#form-title");
        let bContainer = document.createElement("div");
        bContainer.classList.add('btn', 'btn-light', 'col-auto', 'p-0');

        let pButton = document.createElement("a");
        pButton.setAttribute('id', 'addPatientButton');
        pButton.setAttribute('type', 'button');
        pButton.setAttribute('data-bs-toggle', 'offcanvas');
        pButton.setAttribute('data-bs-target', '#offcanvas');
        pButton.setAttribute('aria-controls', 'offcanvas');
        pButton.classList.add('btn', 'col-auto');
        pButton.textContent = 'Pacientes';

        bContainer.append(pButton);
        formTitle.append(bContainer);
    }

    const addPatients = (data) => {
        const offCanvas = document.querySelector('.offcanvas-body');
        const div = document.createElement('div');
        div.classList.add('list-group');

        data.forEach(p => {
            const a = document.createElement('a');
            a.classList.add('list-group-item', 'list-group-item-action');
            a.setAttribute('href', `/turdus/patients/${p.id}`);
            a.textContent = `${p.name} - ${p.species}`;
            div.append(a);
        });

        offCanvas.append(div);
    }

    const handleModal = () => {
        const sendButton = document.querySelector('.modal-body button[type=submit]');
        sendButton.classList.add('d-none');
    }

    return (
        <>
            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Pacientes</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <button className="btn btn-light w-100 mb-3" type="button" data-bs-toggle="modal" data-bs-target="#newPatientModal" data-bs-dismiss="offcanvas" onClick={handleModal}>Nuevo Paciente</button>
                </div>
            </div>
            
            <Form selector='customer' action='update' id={id} />

            {/* MODAL NUEVO PACIENTE */}
            <NewPatient />
        </>
    )
}

function Patient() {
    const { id } = useParams();

    useEffect(() => {

        findOnePatient(handlePatient, id);
        findPatientVisits(addVisits, id)
        addButtons();

    }, [])

    const handlePatient = (data) => {

        document.getElementById("vetPicker").value = `${data.vetName} - ${data.vetUsername}`;
        document.getElementById("responsiblePicker").value = `${data.responsible} - ${data.responsibleEmail}`;
        document.getElementById("patientName").value = data.name;
        document.getElementById("speciesPicker").value = data.species;
        document.getElementById("racePicker").value = data.race;
        document.getElementById("genderPicker").value = data.gender;
        document.getElementById("sterilisedPicker").value = data.sterilised;
        document.getElementById("patientBirthday").value = data.birthday;
        document.getElementById("patientWeight").value = data.weight;
        document.getElementById("patientChip").value = data.chip;
        document.getElementById("patientColor").value = data.color;
        document.getElementById("patientEyes").value = data.eyes;
        document.getElementById("patientInfo").value = data.info;

        document.getElementById("viewCustomerButton").setAttribute('href', `/turdus/customers/${data.responsibleId}`)

        // Modal
        document.getElementById("patientPicker").value = `${data.name} - #${data.id}`;
        document.getElementById("customerPicker").value = `${data.responsible} - ${data.responsibleEmail}`;

    }

    const addButtons = () => {
        const formTitle = document.getElementById("form-title");
        const allBContainer = document.createElement('div');
        allBContainer.classList.add('col-auto', 'justify-content-between');
        let bContainer = document.createElement("div");
        bContainer.classList.add('btn', 'btn-light', 'col-auto', 'p-0', 'mx-1');
        let bCustomerCont = document.createElement("div");
        bCustomerCont.classList.add('btn', 'btn-light', 'col-auto', 'p-0', 'mx-1');

        let pButton = document.createElement("a");
        pButton.setAttribute('id', 'addPatientButton');
        pButton.setAttribute('data-bs-toggle', 'offcanvas');
        pButton.setAttribute('data-bs-target', '#offcanvas');
        pButton.setAttribute('aria-controls', 'offcanvas');
        pButton.classList.add('btn', 'col-auto');
        pButton.textContent = ' Visitas ';

        let custButton = document.createElement("a");
        custButton.setAttribute('id', 'viewCustomerButton');
        custButton.classList.add('btn', 'col-auto');
        custButton.textContent = ' Responsable ';

        bCustomerCont.append(custButton);
        bContainer.append(pButton);
        allBContainer.append(bCustomerCont);
        allBContainer.append(bContainer);

        formTitle.append(allBContainer);
    }

    const addVisits = (data) => {
        const offCanvas = document.querySelector('.offcanvas-body');
        const div = document.createElement('div');
        div.classList.add('list-group');

        data.forEach(p => {
            const a = document.createElement('a');
            a.classList.add('list-group-item', 'list-group-item-action');
            a.setAttribute('href', `/turdus/visits/${p.id}`);
            a.textContent = `${p.date_time} - ${p.category}`;
            div.append(a);
        });

        offCanvas.append(div);
    }

    const handleModal = () => {
        const sendButton = document.querySelector('.modal-body button[type=submit]');
        sendButton.classList.add('d-none');
    }

    return (
        <>
            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Visitas</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">                   
                    <button className="btn btn-light w-100 mb-3" type="button" data-bs-toggle="modal" data-bs-target="#newVisitModal" data-bs-dismiss="offcanvas" onClick={handleModal}>Nueva Visita</button>
                </div>
            </div>
            <Form selector='patient' action='update' id={id} />

            {/* MODAL NUEVA VISITA */}
            <NewVisit />
        </>
    )
}

function Visit() {
    const { id } = useParams();

    useEffect(() => {

        findOneVisit(handleVisit, id);
        addButtons();

    }, [])

    const opVisit = (e) => {
        e.preventDefault();

        document.getElementById("completedPicker").value = false;

        let fData = {};
        const form = document.querySelector('#auto-form');
        for (const input of form) {
            Object.defineProperty(fData, input.id,                   // Creamos una propiedad del objeto fData con el string a buscar.
            {
                value: {value: input.value},
                enumerable: true,
                configurable: true,
                writable: true
            }
            )
        }
        addUpdateVisit(fData, 'update', id);
    }

    const clVisit = (e) => {
        e.preventDefault();
        document.getElementById("completedPicker").value = true;
        let fData = {};
        const form = document.querySelector('#auto-form');
        for (const input of form) {
            Object.defineProperty(fData, input.id,                   // Creamos una propiedad del objeto fData con el string a buscar.
            {
                value: {value: input.value},
                enumerable: true,
                configurable: true,
                writable: true
            }
            )
        }
        closeVisit(fData, id, `/turdus/visits/${id}`);
    }

    const recVisit = (e) => {
        e.preventDefault();
        document.getElementById("completedPicker").value = true;
        let fData = {};
        const form = document.querySelector('#auto-form');
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
        closeVisit(fData, id, `/turdus/visits/${id}/receive`);
    }

    const handleVisit = (data) => {

        document.getElementById("userPicker").value = `${data.vetName} - ${data.vetUsername}`;
        document.getElementById("datePicker").value = data.date;
        document.getElementById("timePicker").value = data.time;
        document.getElementById("duration").value = data.duration * 15;
        const completed = document.getElementById("completedPicker");
        completed.value = data.done;
        if (data.done) completed.setAttribute('disabled', 'true');
        document.getElementById("category").value = data.category;
        document.getElementById("patientPicker").value = `${data.patient} - #${data.patientId}`;
        document.getElementById("customerPicker").value = `${data.customer} - ${data.customerEmail}`;
        document.getElementById("patientWeight").value = data.weight;
        document.getElementById("description").value = data.description;
        document.getElementById("treatment").value = data.treatment;

        // Desabilitamos las horas cogidas por otras visitas
        const date = data.date;
        const user = data.vetUsername;
        
        let filter = {};
        filter.date = date;
        filter.user = user;
        console.log(filter)
        
        findTime(handleTime, filter);

        // Creamos botones de cerrar o abrir visita

        const offCanvasBody = document.querySelector('.offcanvas-body');

        if(data.done) {
            const bOpen = document.createElement('button');
            bOpen.classList.add('btn', 'btn-danger', 'w-100','mb-3');
            bOpen.setAttribute('type', 'button');
            bOpen.setAttribute('data-bs-toggle', 'modal');
            bOpen.setAttribute('data-bs-target', '#newPatientModal');
            bOpen.setAttribute('data-bs-dismiss', 'offcanvas');
            bOpen.textContent = 'Abrir visita';
            bOpen.addEventListener('click', opVisit);

            offCanvasBody.append(bOpen);

            const inputs = document.querySelectorAll('input, select, textarea, .input-group button');
            for (const e of inputs) {
                e.setAttribute('disabled', 'true');
            }

        } else {
            const bClose = document.createElement('button');
            bClose.classList.add('btn', 'btn-light', 'w-100','mb-3');
            bClose.setAttribute('type', 'button');
            bClose.setAttribute('data-bs-toggle', 'modal');
            bClose.setAttribute('data-bs-target', '#newPatientModal');
            bClose.setAttribute('data-bs-dismiss', 'offcanvas');
            bClose.textContent = 'Cerrar visita';
            bClose.addEventListener('click', clVisit);

            const bReceive = document.createElement('button');
            bReceive.classList.add('btn', 'btn-light', 'w-100','mb-3');
            bReceive.setAttribute('type', 'button');
            bReceive.setAttribute('data-bs-toggle', 'modal');
            bReceive.setAttribute('data-bs-target', '#newPatientModal');
            bReceive.setAttribute('data-bs-dismiss', 'offcanvas');
            bReceive.textContent = 'Cerrar y cobrar';
            bReceive.addEventListener('click', recVisit);

            offCanvasBody.append(bClose);
            offCanvasBody.append(bReceive);
        }
    }

    const addButtons = () => {
        const formTitle = document.querySelector("#form-title");
        let bContainer = document.createElement("div");
        bContainer.classList.add('btn', 'btn-light', 'col-auto', 'p-0');

        let pButton = document.createElement("a");
        pButton.setAttribute('id', 'addPatientButton');
        pButton.setAttribute('type', 'button');
        pButton.setAttribute('data-bs-toggle', 'offcanvas');
        pButton.setAttribute('data-bs-target', '#offcanvas');
        pButton.setAttribute('aria-controls', 'offcanvas');
        pButton.classList.add('btn', 'col-auto');
        pButton.textContent = 'Cerrar / Cobrar';

        bContainer.append(pButton);
        formTitle.append(bContainer);
    }

    return (
        <>
            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Opciones</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {/* <button className="btn btn-light w-100 mb-3" type="button" data-bs-toggle="modal" data-bs-target="#newPatientModal" data-bs-dismiss="offcanvas">Cerrar Visita</button>
                    <button className="btn btn-light w-100 mb-3" type="button" data-bs-toggle="modal" data-bs-target="#newPatientModal" data-bs-dismiss="offcanvas">Cerrar y cobrar</button> */}
                </div>
            </div>
            
            <Form selector='visit' action='update' id={id} />
        </>
    )
}

export { Customer, Patient, Visit };