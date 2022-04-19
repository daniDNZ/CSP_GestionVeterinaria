import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/visits.css';
import Form from "./Form";
import { findOneCustomer, findCustomerPatients, findOnePatient } from "./ApiFetch";
import { NewPatient } from "./Modals";

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
        
        document.getElementById("customerPicker").value = `${data.name} - ${data.email}`;

    }

    const patientsOffCanvas = (e) => {
        e.preventDefault();

        console.log('click')
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
        pButton.addEventListener('click', patientsOffCanvas)

        bContainer.append(pButton);
        formTitle.append(bContainer);
    }

    const addPatients = (data) => {
        const offCanvas = document.querySelector('.offcanvas-body');
        console.log(data)
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
        const sendButton = document.querySelector('.modal-body button');
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
    let arrData;


    useEffect(() => {

        findOnePatient(handlePatient, id);
        addButtons();
        // document.getElementById('auto-form').addEventListener('submit', handleData);

    }, [])

    // const handleData = (e) => {
    //     e.preventDefault();
    //     const fData = e.target;
    //     addUpdatePatient(fData, 'update', id);
    // }

    const handlePatient = (data) => {

        document.getElementById("vetPicker").value = `${data.vetName} - ${data.vetUsername}`;
        document.getElementById("customerPicker").value = `${data.responsible} - ${data.responsibleEmail}`;
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


    }

    const addButtons = () => {
        const formTitle = document.getElementById("form-title");
        let bContainer = document.createElement("div");
        bContainer.classList.add('btn', 'btn-light', 'col-auto', 'p-0');

        let pButton = document.createElement("a");
        pButton.setAttribute('id', 'addPatientButton');
        pButton.classList.add('btn', 'col-auto');
        pButton.textContent = ' Paciente + ';

        bContainer.append(pButton);
        formTitle.append(bContainer);
    }


    return (
        <>
            <button className="btn btn-light w-100 mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
                Filtros
            </button>
            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Filtrar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body"></div>
            </div>
            <Form selector='patient' action='update' id={id} />
        </>
    )
}
export { Customer };