import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/visits.css';
import { FormGenerator, FormArray, CustomerForm, FormAlerts, FormModal } from "./FormController";
import { findOneCustomer, addUpdateCustomer } from "./ApiFetch";

function Customer() {
    const { id } = useParams();
    let arrData;


    useEffect(() => {

        findOneCustomer(handleCustomer, id);
        addButtons();
        document.getElementById('auto-form').addEventListener('submit', handleData);

    }, [])

    const handleData = (e) => {
        e.preventDefault();
        const fData = e.target;
        addUpdateCustomer(fData, 'update', id);
    }

    const handleCustomer = (data) => {

        document.getElementById("customerDni").value = data.dni;
        document.getElementById("customerName").value = data.name;
        document.getElementById("customerInfo").value = data.info;
        document.getElementById("customerPhone").value = data.phone;
        document.getElementById("customerEmail").value = data.email;
        document.getElementById("customerPc").value = data.postalCode;
        document.getElementById("customerAddress").value = data.address;
        document.getElementById("customerLastname").value = data.lastName;

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
            <FormGenerator arrForm={FormArray('customer', {})} />
        </>
    )
}
export default Customer;