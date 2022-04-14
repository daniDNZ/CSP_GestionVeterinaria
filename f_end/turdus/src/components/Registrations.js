import { useEffect, useState } from "react";
import { handleDatalist } from "./Datalist";
import { FormGenerator, FormArray, handleClean } from "./FormController";
import { addUpdatePatient, getVets, getAllCustomers, getSpecies, getRaces, findRaces, addUpdateCustomer } from "./ApiFetch";

function Registrations() {

    let formType = 'customer';
    let prop = FormArray(formType, {});

    const [arrForm, newArrForm] = useState(prop);

    useEffect(() => { listeners() }, [arrForm]);

    // SEGUIR EL EJEMPLO DE LOS FORMULARIOS DE BÚSQUEDA PARA LAS DATALIST.

    const listeners = () => {

        if (document.getElementById('speciesPicker')) {

            getVets(handleFetch, 'vetPicker');
            getAllCustomers(handleFetch, 'customerPicker');
            getSpecies(handleFetch, 'speciesPicker');
            getRaces(handleFetch, 'racePicker');
    
            document.getElementById('speciesPicker').addEventListener('input', filterRaces);
            // HAY QUE AÑADIR MÁS FILTROS
    
        }
       
        document.getElementById('auto-form').addEventListener('submit', handleData);
        
    }

    const handleFetch = (data, id) => {
        let arrData = [];

        if (id === 'customerPicker') {
            data.forEach(e => {
                arrData.push(e.name+' - '+e.email);
            })
        } else if (id === 'vetPicker'){
            data.forEach(e => {
                arrData.push(e.name+' - '+e.username);
            })
        } else {
            data.forEach(e => {
                arrData.push(e.name);
            });
        }

            
        
            

        handleDatalist(arrData, id);
    }

    const handleData = (e) => {
        e.preventDefault();
        const fData = e.target;


        if (fData.customerEmail) {
            addUpdateCustomer(fData, 'add')

        } else {
            fData.customerPicker.value = fData.customerPicker.value.split(' - ')[1] 
            
            fData.vetPicker.value = fData.vetPicker.value.split(' - ')[1]
            
            addUpdatePatient(fData, 'add')
        }
            
        
        handleClean(fData);
    }

    const filterRaces = (e) => {
        e.preventDefault();
        findRaces(handleDatalist, 'racePicker', e.target.value);
    }

    const changeForm = (e) => {
        formType = e.target.value;
        prop =  FormArray(formType)
        newArrForm(prop);

        document.getElementById('auto-form').removeEventListener('submit', handleData);

    }

    return (
        <>
            <h3>Alta:</h3>
            <select id="selectForm" className="form-select" onChange={changeForm}>
                <option value="customer">Nuevo Cliente</option>
                <option value="patient">Nuevo Paciente</option>
                <option value="visit">Nueva Visita</option>
                {/* <option value="both" >Nuevo Paciente + Cliente</option> */}
            </select>
            <hr />
            <FormGenerator arrForm={arrForm} />
        </>
    )
}
export default Registrations;