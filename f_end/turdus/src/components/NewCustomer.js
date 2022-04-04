import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/visits.css';
import { fetchVets } from "./ApiFetch";
import { CustomerForm, datalistGenerator, FormAlerts, FormArray, FormGenerator, FormModal, PatientForm } from "./FormsController";

function NewCustomer() {
    useEffect(() => {

        fetchVets(handleVets);
        document.getElementById('auto-form').addEventListener('submit', handleData);
    }, []);
    
    
    const handleData = (e) => {
        e.preventDefault();
        console.log('funciona')
    }

    // LLAMAR A LOS FETCH DESDE AQUÍ (SOLO EN PACIENTES). LUEGO PONER EL CALLBACK HANDLEVETS EN EL FORM CONTROLLER
    // PARA RELLENAR EL FORMULARIO DE FORMA INICIAL. LUEGO HAREMOS HANDLES INDIVIDUALES O NO, PIENSA TÚ.
    const handleVets = (data) => {
        let arrVets = [];
        data.forEach(e => {
            arrVets.push(e.name)
        });
        
        const datalist = datalistGenerator('vet-picker', arrVets);
        document.getElementById('vet-picker-datalist').innerHTML = datalist;
    }

    // PARA CONTROLAR LAS ALERTAS HACE FALTA LLAMAR A ESTA FUNCIÓN CON EL FETCH
    // const handleAlert = (success) => {

    //     let alert;
    //     if (success) {
    //         alert = document.getElementById("completedAlert");
    //     } else {
    //         alert = document.getElementById("failedAlert");
    //     }
    //     alert.classList.contains('d-none') ? alert.classList.remove('d-none') : alert.classList.add('d-none')

    // }
    return (
        <>
            <FormGenerator arrForm={FormArray('patient', {cName: 'Pedro'})} />
        </>
    )
}
export default NewCustomer;