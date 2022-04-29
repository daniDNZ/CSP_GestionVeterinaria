import { useState } from "react";
import { useParams } from "react-router-dom";
import { Form } from "./Form";

function Registrations() {
    const { name } = useParams();

    const [selector, setSelector] = useState(name);
    
    const changeForm = (e) => {
        e.preventDefault();
        setSelector(e.target.value);
    }

    return (
        <>
            <h3>Añadir:</h3>
            <select id="selectForm" className="form-select" onChange={changeForm}>
                <option value="visit">Nueva Visita</option>
                <option value="customer">Nuevo Cliente</option>
                <option value="patient">Nuevo Paciente</option>
            </select>
            <hr />
            <Form selector={ selector } action={ 'add' } />
        </>
    )
}
export default Registrations;