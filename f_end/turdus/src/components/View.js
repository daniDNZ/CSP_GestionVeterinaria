import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../css/visits.css';
import { Form, handleTime } from "./Form";
import { findOneCustomer, findCustomerPatients } from "./api/ApiCustomers";
import { findOnePatient, findPatientVisits } from "./api/ApiPatients";
import { findOneVisit, findTime, addUpdateVisit, closeVisit, updateCart } from "./api/ApiVisits";
import { findBill } from "./api/ApiBills";
import { getOneUser } from "./api/ApiUser";
import { AddProducts, NewPatient, NewVisit } from "./Modals";
import global from "../global";

export function User() {
    const { id } = useParams();

    useEffect(() => {

        getOneUser(handleUser, id);

    }, [])

    const handleUser = (data) => {

        // Title
        document.getElementById("userViewPage").textContent = `${data.name} ${data.lastName}`;


        document.getElementById("userName").value = data.name;
        document.getElementById("userLastname").value = data.lastName;
        document.getElementById("userArea").value = data.area;
        document.getElementById("userCollegiate").value = data.collegiate;
        document.getElementById("userUsername").value = data.username;
        document.getElementById("userPhone").value = data.phone;
        document.getElementById("userEmail").value = data.email;
        document.getElementById("userDni").value = data.dni;
        document.getElementById("userSalary").value = data.salary;

        data.roles.forEach(role => {
            document.getElementById(role).checked = true;
        });

    }

    return (
        <>
            <Form selector='user' action='update' id={id} />
        </>
    )
}

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

        // Badge
        console.log(data)
        if (data.debt > 0) {

            const debtBadge = document.querySelector('span#cus-debt-badge');
            let aDebt = document.createElement('a');
            let spDebt = document.createElement('span');

            aDebt.setAttribute('href', `/turdus/customers/${id}/pay_debt`); // MODIFICAR PARA QUE LLEVE AL COBRO DE DEUDA
            aDebt.classList.add('nav-link', 'px-2', 'text-truncate', 'mb-auto');
            spDebt.classList.add('badge', 'bg-danger', 'rounded-pill');
            spDebt.textContent = parseFloat(data.debt).toFixed(2)+' '+global.currency;

            aDebt.append(spDebt);
            debtBadge.append(aDebt);
        }

        // Title
        document.getElementById("customerViewPage").textContent = `${data.name} ${data.lastName}`;


    }

    const addButtons = () => {
        const formTitle = document.querySelector("#form-title");
        document.querySelector("#form-title");

        let pButton = document.createElement("a");
        pButton.setAttribute('id', 'addPatientButton');
        pButton.setAttribute('type', 'button');
        pButton.setAttribute('data-bs-toggle', 'offcanvas');
        pButton.setAttribute('data-bs-target', '#offcanvas');
        pButton.setAttribute('aria-controls', 'offcanvas');
        pButton.setAttribute('role', 'button');
        pButton.classList.add('btn', 'btn-light');
        pButton.textContent = 'Pacientes';

        formTitle.append(pButton);
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

        let pButton = document.createElement("a");
        pButton.setAttribute('id', 'addPatientButton');
        pButton.setAttribute('data-bs-toggle', 'offcanvas');
        pButton.setAttribute('data-bs-target', '#offcanvas');
        pButton.setAttribute('aria-controls', 'offcanvas');
        pButton.setAttribute('role', 'button');
        pButton.classList.add('btn', 'btn-light', 'mx-1');
        pButton.textContent = ' Visitas ';

        let custButton = document.createElement("a");
        custButton.setAttribute('id', 'viewCustomerButton');
        custButton.setAttribute('role', 'button');
        custButton.classList.add('btn', 'btn-light', 'mx-1');
        custButton.textContent = ' Responsable ';

        allBContainer.append(custButton);
        allBContainer.append(pButton);

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
    let cart = []; // Array del carrito.
    let currency = '€';

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
        closeVisit(fData, id, `/turdus/visits/${id}/bill`);
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

        document.getElementById("viewPatientButton").setAttribute('href', `/turdus/patients/${data.patientId}`);


        // Desabilitamos las horas cogidas por otras visitas
        const date = data.date;
        const user = data.vetUsername;
        
        let filter = {};
        filter.date = date;
        filter.user = user;
        
        findTime(handleTime, filter);

        // Rellenamos carrito
        if (data.cart) {
            cart = data.cart; 
            makeList();
        }

        // Creamos botones de cerrar o abrir visita en offcanvas

        const offCanvasBody = document.querySelector('.offcanvas-body');

        if(data.done) {
            const bOpen = document.createElement('button');
            const bPay = document.createElement('a');

            bOpen.classList.add('btn', 'btn-danger', 'w-100','mb-3');
            bOpen.setAttribute('type', 'button');
            bOpen.setAttribute('data-bs-toggle', 'modal');
            bOpen.setAttribute('data-bs-target', '#newPatientModal');
            bOpen.setAttribute('data-bs-dismiss', 'offcanvas');
            bOpen.textContent = 'Abrir visita';
            bOpen.addEventListener('click', opVisit);

            bPay.classList.add('btn', 'btn-outline-primary', 'w-100','mb-3');
            bPay.setAttribute('role', 'button');
            bPay.setAttribute('href', `/turdus/visits/${id}/bill`);
            bPay.textContent = 'Tramitar cobro';

            offCanvasBody.append(bPay, bOpen);

            const inputs = document.querySelectorAll('input, select, textarea, .input-group button');
            for (const e of inputs) {
                e.setAttribute('disabled', 'true');
            }

            findBill(disableCart, {visit_id: id});

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

        // Listener Carrito
        const payDebt = document.querySelector('#close-pay-button');
        payDebt.addEventListener('click', recVisit);
    }

    const disableCart = (bill) => { // desabilitamos los botones del carrito para no modificar el bill
        if (bill.paymentCompleted) {
            const cartChilds = document.querySelectorAll('#offcanvascart a, #offcanvascart button');
            cartChilds.forEach(child => {
                console.log(child)
                child.classList.add('disabled');
            });
        } else {
            const cartChilds = document.querySelectorAll('#offcanvascart a, #offcanvascart button');
            cartChilds.forEach(child => {
                if (child.id !== 'close-pay-button') {

                    console.log(child)
                    child.classList.add('disabled');
                }
            });
            // Si queda deuda pendiente, enviamos al cobro con el botón de cobrar
            const payDebt = document.querySelector('#close-pay-button');
            payDebt.removeEventListener('click', recVisit); // Quitamos el listener
            payDebt.setAttribute('href', `/turdus/customers/${bill.customer}/pay_debt`);
        }
    }

    const addButtons = () => {
        const formTitle = document.querySelector("#form-title");
        const allBContainer = document.createElement('div');
        allBContainer.classList.add('col-auto', 'justify-content-between');
     
        let pButton = document.createElement("a");
        pButton.setAttribute('id', 'addPatientButton');
        pButton.setAttribute('type', 'button');
        pButton.setAttribute('data-bs-toggle', 'offcanvas');
        pButton.setAttribute('data-bs-target', '#offcanvas');
        pButton.setAttribute('aria-controls', 'offcanvas');
        pButton.setAttribute('role', 'button');
        pButton.classList.add('btn', 'btn-outline-secondary', 'mx-1');
        pButton.textContent = 'Abrir / Cerrar';

        let iCart = document.createElement('i');
        iCart.classList.add('bi', 'bi-cart3');

        let pCart = document.createElement("a");
        pCart.setAttribute('id', 'cartButton');
        pCart.setAttribute('type', 'button');
        pCart.setAttribute('data-bs-toggle', 'offcanvas');
        pCart.setAttribute('data-bs-target', '#offcanvascart');
        pCart.setAttribute('aria-controls', 'offcanvas');
        pCart.setAttribute('role', 'button');
        pCart.classList.add('btn', 'btn-outline-primary', 'mx-1');
        pCart.append(iCart);

        let patButton = document.createElement("a");
        patButton.setAttribute('id', 'viewPatientButton');
        patButton.setAttribute('role', 'button');

        patButton.classList.add('btn', 'btn-outline-secondary', 'mx-1');
        patButton.textContent = ' Paciente ';
    
        allBContainer.append(patButton, pButton, pCart);

        formTitle.append(allBContainer);
    }

    const makeList = () => {
        updateCart(id, cart);
        let total = 0;
        const ul = document.querySelector('#offcanvascart .offcanvas-body ul');
        ul.innerHTML = '';

        cart.forEach(i => {
            
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'flex-row');

            const div1 = document.createElement('div');
            const a1 = document.createElement('a');
            const span1 = document.createElement('span');

            div1.classList.add('col-auto', 'overflow-hidden');
            div1.setAttribute('style', 'max-width: 180px; max-height: 50px');
            a1.classList.add('btn', 'px-0');
            a1.setAttribute('role', 'button');
            a1.dataset.id = i.id;
            a1.dataset.type = i.type;
            a1.dataset.price = i.price;
            a1.addEventListener('click', removeItem);
            span1.textContent = i.name;

            const DOMi = document.createElement('i');
            DOMi.classList.add('bi', 'bi-x', 'fs-4', 'eliminate');

            a1.append(DOMi);
            div1.append(a1, span1);

            const div2 = document.createElement('div');
            const span2 = document.createElement('span');
            const input2 = document.createElement('input');

            div2.classList.add('col-auto', 'd-flex', 'flex-row');
            span2.classList.add('my-auto', 'mx-1');
            span2.textContent = `${parseFloat(i.price).toFixed(2)}${currency}`;
            input2.classList.add('form-control', 'product-quantity', 'me-2');
            input2.setAttribute('type', 'number');
            input2.dataset.id = i.id;
            input2.dataset.type = i.type
            input2.dataset.price = i.price;
            input2.dataset.quantity = i.q;
            input2.addEventListener('input', qModify);
            input2.value = i.q;

            div2.append(input2, span2);
            li.append(div1, div2);
            ul.append(li);

            total += parseFloat(i.price*i.q);
        });

        const cartTotal = document.querySelector('#cartTotal');
        cartTotal.textContent = `Total: ${total.toFixed(2)} ${currency}`;
        
        
    }

    // Modifica las cantidades
    const qModify = (e) => {
        let input = e.target;
        cart.forEach(i => {
            if (i.id === input.dataset.id && i.type === input.dataset.type) i.q = input.value;
        });

        makeList();
    }

    // Remueve el objeto
    const removeItem = (e) => {
        let input = e.currentTarget;
        cart = cart.filter(i => i.id !== input.dataset.id || i.type !== input.dataset.type);  // Filtra el carrito, dejando pasar solo los objetos distintos del eliminado.
        makeList(); // Volvemos a renderizar la lista
    }

    const addProduct = (cartItems) => {
        let cartTemp = [];

        cartItems.forEach(i => {        // Filtra los objetos que ya están en el carrito
            let comp = true;
            cart.forEach(o => {
                if (i.id === o.id && i.type === o.type) comp = false;
            });
            if (comp) cartTemp.push(i);
        });

        cart = cart.concat(cartTemp);
        if (cart.length > 0) makeList();
    }

    return (
        <>
            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Opciones</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                </div>
            </div>

            <div className="offcanvas offcanvas-end pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvascart" aria-labelledby="offcanvascartLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvascartLabel">Carrito</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="list-group overflow-scroll h-80">
                        
                    </ul>
                    <div id="cartTotal" className="text-end my-2 mx-2"></div>
                    <hr />
                    <div className="d-flex flex-row justify-content-between">
                        <a href="#" id="close-pay-button" role="button" className="btn btn-outline-secondary">Cerrar y cobrar</a>
                        <button type="button" className="btn btn-outline-primary" data-bs-dismiss="offcanvas" data-bs-toggle="modal" data-bs-target="#addProductsModal">Añadir +</button>
                    </div>
                </div>
            </div>
            
            <Form selector='visit' action='update' id={id} />
            <AddProducts callback={addProduct}/>
         
        </>
    )
}

export { Customer, Patient, Visit };