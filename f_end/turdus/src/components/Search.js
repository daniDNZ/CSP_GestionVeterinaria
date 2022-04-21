import { useState } from "react";
import Table from "./Table";

function Search() {

    const [selector, setSelector] = useState('customers');
    
    
    const changeForm = (e) => {
        e.preventDefault();
        setSelector(e.target.value);
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
            <Table selector={selector}/>
        </>
    )
}
export default Search;