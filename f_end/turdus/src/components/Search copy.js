import { useState } from "react";
import { getPatients, getCustomers, getVisits } from "./ApiFetch";
import { TableGenerator } from "./TableController";

function Search() {

    const [arr, setArr] = useState({
        headers:  
            [
                'customers',
                '#', 
                'Nombre', 
                'Apellidos', 
                'Teléfono', 
                'e-mail', 
                'Vista'
            ],
        ids:
            [
                'namePicker', 
                'lastnamePicker', 
                'phonePicker', 
                'emailPicker' 
            ],
        formType: 'searchCustomerForm'
    
    });
    
    const [fetchMethod, setFetchMethod] = useState(() => getCustomers);
    
    const changeForm = (e) => {
        e.preventDefault();

        if (e.target.value == 'customers') {
            setArr(
                {
                    headers:  
                        [
                            'customers',
                            '#', 
                            'Nombre', 
                            'Apellidos', 
                            'Teléfono', 
                            'e-mail', 
                            'Vista'
                        ],
                    ids:
                        [
                            'namePicker', 
                            'lastnamePicker', 
                            'phonePicker', 
                            'emailPicker' 
                        ],
                    formType: 'searchCustomerForm'
                
                }
            );
            setFetchMethod(() => getCustomers);
        } 
        else if (e.target.value == 'patients') {
            setArr(
                {
                    headers:
                        [
                            'patients',
                            '#', 
                            'Nombre', 
                            'Especie', 
                            'Raza', 
                            'Edad', 
                            'Género', 
                            'Esterilizado', 
                            'Veterinari@', 
                            'Responsable', 
                            'Vista'
                        ],
                    ids:
                        [
                            'namePicker',
                            'speciesPicker',
                            'racePicker',
                            'birthdayPicker',
                            'genderPicker',
                            'sterilisedPicker',
                            'vetPicker',
                            'customerPicker'
                        ],
                    formType: 'searchPatientForm'
                }
        );
            setFetchMethod(() => getPatients);
        }
        else if (e.target.value == 'visits') {
            setArr(
                {
                    headers:
                        [
                            'visits',
                            '#', 
                            'Fecha', 
                            'Categoría', 
                            'Veterinaria/o', 
                            'Cliente',
                            'Paciente', 
                            'Completada', 
                            'Vista'
                        ],
                    ids :
                        [
                            'datePicker',
                            'categoryPicker',
                            'vetPicker',
                            'customerPicker',
                            'patientPicker',
                            'completedPicker',
                        ],
                    formType: 'searchVisitForm'
                }
        );
            setFetchMethod(() => getVisits);
        }
    }

    
    return (
        <>
            {/* <h3>Buscar:</h3> */}
            <select id="selectForm" className="form-select" onInput={changeForm}>
                <option value="customers">Clientes</option>
                <option value="patients">Pacientes</option>
                <option value="visits">Visitas</option>
            </select>
            <hr />
            <TableGenerator arr={arr} fetchMethod={fetchMethod}/>
        </>
    )
}
export default Search;