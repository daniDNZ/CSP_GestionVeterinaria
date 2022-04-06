import { useEffect, useState } from "react";
import { handleDatalist } from "./Handlers";
import { FormGenerator, FormArray, handleClean } from "./FormsController";
import { addUpdatePatient, getVets, getCustomers, getSpecies, getRaces, findRaces, addUpdateCustomer } from "./ApiFetch";

function Registrations() {

    let formType = 'customer';
    let prop = FormArray(formType, {});

    const [arrForm, newArrForm] = useState(prop);

    useEffect(() => { listeners() }, [arrForm]);

    const listeners = () => {

        if (document.getElementById('speciesPicker')) {

            getVets(handleDatalist, 'vetPicker');
            getCustomers(handleDatalist, 'customerPicker');
            getSpecies(handleDatalist, 'speciesPicker');
            getRaces(handleDatalist, 'racePicker');
    
            document.getElementById('speciesPicker').addEventListener('input', filterRaces);
    
        }
       
        document.getElementById('auto-form').addEventListener('submit', handleData);
        
    }

    const handleData = (e) => {
        e.preventDefault();
        const fData = e.target;

        fData.customerEmail ?
            addUpdateCustomer(fData, 'add')
        :
            addUpdatePatient(fData, 'add')
        ;
        
        handleClean(fData);
    }

    const filterRaces = (e) => {
        e.preventDefault();
        findRaces(handleDatalist, 'racePicker', e.target.value);
    }

    const changeForm = (e) => {
        formType = e.target.value;
        prop =  FormArray(formType, {})
        newArrForm(prop);

        document.getElementById('auto-form').removeEventListener('submit', handleData);

    }

    return (
        <>
            <h3>Alta:</h3>
            <select id="selectForm" className="form-select" onChange={changeForm}>
            <option value="customer">Nuevo Cliente</option>
            <option value="patient">Nuevo Paciente</option>
                {/* <option value="both" >Nuevo Paciente + Cliente</option> */}
            </select>
            <hr />
            <FormGenerator arrForm={arrForm} />
        </>
    )
}
export default Registrations;