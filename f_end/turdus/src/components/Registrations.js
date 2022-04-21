import { useState } from "react";
import { Form } from "./Form";

function Registrations() {

    const [selector, setSelector] = useState('customer');
    
    
    const changeForm = (e) => {
        e.preventDefault();
        setSelector(e.target.value);
    }

    return (
        <>
            <h3>Añadir:</h3>
            <select id="selectForm" className="form-select" onChange={changeForm}>
                <option value="customer">Nuevo Cliente</option>
                <option value="patient">Nuevo Paciente</option>
                <option value="visit">Nueva Visita</option>
                {/* <option value="both" >Nuevo Paciente + Cliente</option> */}
            </select>
            <hr />
            <Form selector={ selector } action={ 'add' } />
        </>
    )
}
export default Registrations;