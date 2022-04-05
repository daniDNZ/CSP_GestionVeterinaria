import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/visits.css';
import { FormGenerator, FormArray, CustomerForm, FormAlerts, FormModal } from "./FormsController";
import { findCustomers, addUpdateCustomer } from "./ApiFetch";

function Customer() {
    const { id } = useParams();
    let arrData;


    useEffect(() => {

        findCustomers(handleCustomer, {customerId: id});
        document.getElementById('auto-form').addEventListener('submit', handleData);

    }, [])

    const handleData = (e) => {
        e.preventDefault();
        const fData = e.target;
        addUpdateCustomer(fData, 'update', id);
    }

    const handleCustomer = (data) => {

        data = data[0];
        document.getElementById("customerDni").value = data.dni;
        document.getElementById("customerName").value = data.name;
        document.getElementById("customerInfo").value = data.info;
        document.getElementById("customerPhone").value = data.phone;
        document.getElementById("customerEmail").value = data.email;
        document.getElementById("customerPc").value = data.postalCode;
        document.getElementById("customerAddress").value = data.address;
        document.getElementById("customerLastname").value = data.lastName;

    }


    return (
        <>
            <FormGenerator arrForm={FormArray('customer', {})} />
        </>
    )
}
export default Customer;