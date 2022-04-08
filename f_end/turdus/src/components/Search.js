import { useState } from "react";
import { getPatients, getCustomers } from "./ApiFetch";
import { TableGenerator } from "./TableController";

function Search() {

    const [arr, setArr] = useState([
        'customers',
        '#', 
        'Nombre', 
        'Apellidos', 
        'Teléfono', 
        'e-mail', 
        'Vista'
    ]);
    
    const [fetchMethod, setFetchMethod] = useState(() => getCustomers);
    
    const changeForm = (e) => {
        e.preventDefault();

        if (e.target.value == 'customers') {
            setArr([
                'customers',
                '#', 
                'Nombre', 
                'Apellidos', 
                'Teléfono', 
                'e-mail', 
                'Vista'
            ]);
            setFetchMethod(() => getCustomers);
        } 
        else if (e.target.value == 'patients') {
            setArr([
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
            ]);
            setFetchMethod(() => getPatients);
        }
    }

    
    return (
        <>
            <h3>Buscar:</h3>
            <select id="selectForm" className="form-select" onInput={changeForm}>
                <option value="customers">Clientes</option>
                <option value="patients">Pacientes</option>
            </select>
            <hr />
            <TableGenerator arr={arr} fetchMethod={fetchMethod}/>
           
        </>
    )
}
export default Search;