import { useState } from "react";
import { NewRace, NewSpecies } from "./Modals";
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
            <div className="d-flex flex-row justify-content-between">
                <select id="selectForm" className="form-select me-2" onInput={changeForm}>
                    <option value="customers">Clientes</option>
                    <option value="patients">Pacientes</option>
                    <option value="visits">Visitas</option>
                </select>
                <button className="btn btn-outline-secondary py-0 px-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
                    <i className="bi bi-filter-left fs-1 text-secondary"></i>
                </button>
            </div>
            <hr />
            <Table selector={selector} />
            {
                () => {
                    if (selector == 'patients') {
                       return (
                        <>
                            <NewSpecies />
                            <NewRace />
                        </>
                       )
                       
                    }
                }
            }
        </>
    )
}
export default Search;