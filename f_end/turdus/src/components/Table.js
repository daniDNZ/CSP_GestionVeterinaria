import { useEffect } from "react";
import { findCustomers, findPatients, findVisits, getCustomers, getPatients, getVisits } from "./ApiFetch";
import { getDataDatalist } from "./Datalist";
import { Pagination } from "./TablePagination";
import { handleClean } from "./FormController";

// Método con el que rellenamos las tablas
const handleTable = (d, destiny) => {
    const data = d.data;
    let count = 1 + ((d.thisPage - 1) * 10);                            // Contador con el que numeramos los resultados
    let tbody = document.getElementById('auto-table-tbody');
    tbody.innerHTML = "";

    data.forEach(e => {                                                 // Creamos las filas y los campos según los datos obtenidos.
        let tr = document.createElement('tr');
        for (const k in e) {                                            // Recorremos las keys del objeto para rellenar la fila.
            let td = document.createElement('td');

            k != 'id' ? td.textContent = e[k] : td.textContent = count // En vez de meter el id del elemento, metemos el contador

            tr.append(td);
        }
        count++;

        let td = document.createElement('td');
        let a = document.createElement('a');
        let i = document.createElement('i');

        a.setAttribute('href', `/turdus/${destiny}/${e.id}`);
        a.classList.add('nav-link', 'px-2', 'text-truncate');

        i.classList.add('bi', 'bi-card-text', 'fs-5', 'me-2');

        a.append(i);
        td.append(a);
        tr.append(td);
        tbody.append(tr);
    });
}

function CustomersTable() {
    let filter = {};                                        // Filtro con el que realizaremos las peticiones como body.

    // Evento de los inputs
    const captureData = (e) => {
        e.preventDefault();

        const id = e.target.id;
        const value = e.target.value;

        Object.defineProperty(filter, id,                   // Creamos una propiedad del objeto filter con el string a buscar.
            {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            }
        )

        findCustomers(handleData, 1, filter)                // Petición al servidor (callback, n página, filtro)
    }

    // Método que maneja los datos de la petición
    const handleData = (d) => {
        
        handleTable(d, 'customers');                        // Rellena la tabla
        Pagination(d, findCustomers, handleData, filter);   // Crea la paginación y añade los eventos a esta, por eso pasamos los métodos y el filtro.

        let arrIds = [];
        const arrInputs = document.querySelectorAll('form .form-control, form .form-select');
        arrInputs.forEach(i => {                            // Recogemos los campos para almacenar los ids y para añadir el evento.
            arrIds.push(i.id);
            i.addEventListener('input', captureData);
        });
        getDataDatalist(d, arrIds)                          // Creamos las datalist para facilitar las búsquedas.
    }

    // Método que limpia los filtros de búsqueda
    const cleanFilters = (e) => {
        e.preventDefault();

        const fData = e.target.parentNode.parentNode.parentNode;
        handleClean(fData);                                 // Seleccionamos el formulario y llamamos al método que lo vacía.

        for (const key in filter) {                         // Limpiamos el objeto filter.
            filter[key] = '';
        }

        findCustomers(handleData);                          // Volvemos a hacer la petición al servidor.
    }

    // Hacemos la petición al servidor, pasándole el callback.
    useEffect(() => {
        findCustomers(handleData);  

    }, []);

    return (
        <>
            <button className="btn btn-light w-100 mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
                Filtros
            </button>
            <div className="offcanvas offcanvas-start pt-10" data-bs-scroll="false" data-bs-backdrop="true" tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Filtrar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form>
                        <div id="form-row-1" className="row">
                            <div className="mb-3 col-auto">
                                <label htmlFor="namePicker" className="form-label">Nombre:</label>
                                <input type="search" id="namePicker" className="form-control" list="namePicker-datalist" placeholder="Buscar..." />
                                <datalist id="namePicker-datalist">
                                    <option id="na-cliente001" value="cliente001">cliente001</option>
                                </datalist>
                            </div>
                            <div className="mb-3 col-auto">
                                <label htmlFor="lastnamePicker" className="form-label">Apellidos:</label>
                                <input type="search" id="lastnamePicker" className="form-control" list="lastnamePicker-datalist" placeholder="Buscar..." />
                                <datalist id="lastnamePicker-datalist">
                                    <option id="la-apellidos001" value="apellidos001">apellidos001</option>
                                </datalist>
                            </div>
                            <div className="mb-3 col-auto">
                                <label htmlFor="phonePicker" className="form-label">Teléfono:</label>
                                <input type="search" id="phonePicker" className="form-control" list="phonePicker-datalist" placeholder="Buscar..." />
                                <datalist id="phonePicker-datalist">
                                    <option id="ph-245326326" value="245326326">245326326</option>
                                </datalist>
                            </div>
                            <div className="mb-3 col-auto">
                                <label htmlFor="emailPicker" className="form-label">e-mail:</label>
                                <input type="search" id="emailPicker" className="form-control" list="emailPicker-datalist" placeholder="Buscar..." />
                                <datalist id="emailPicker-datalist">
                                    <option id="em-c001@gmail.com" value="c001@gmail.com">c001@gmail.com</option>
                                </datalist>
                            </div>
                            <div className="mb-3 col-auto flex-column d-flex justify-content-end">
                                <button id="cleanButton" className="btn btn-light" onClick={cleanFilters}>Limpiar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="auto-table">
                    <thead id="auto-table-thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">e-mail</th>
                            <th scope="col">Vista</th>
                        </tr>
                    </thead>
                    <tbody id="auto-table-tbody" />
                </table>
            </div>
            <nav aria-label="Table pagination">
                <ul className="pagination" id="pagination">

                </ul>
            </nav>
        </>
    )
}

function PatientsTable() {

    let filter = {};

    const captureData = (e) => {
        e.preventDefault();

        const id = e.target.id;
        const value = e.target.value;

        Object.defineProperty(filter, id, 
            {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            }
        )

        findPatients(handleData, 1, filter)
    }

    const handleData = (d, fetchMethod) => {
        handleTable(d, 'patients');
        Pagination(d, fetchMethod, handleData);

        let arrIds = [];
        const arrInputs = document.querySelectorAll('form .form-control, form .form-select');
        arrInputs.forEach(i => {
            arrIds.push(i.id);
            i.addEventListener('input', captureData);

        });
        getDataDatalist(d, arrIds)
    }

    const cleanFilters = (e) => {
        e.preventDefault();

        const fData = e.target.parentNode.parentNode.parentNode;
        handleClean(fData);

        for (const key in filter) {
            filter[key] = '';
        }

        getPatients(handleData);
    }

    useEffect(() => {
        getPatients(handleData);

    }
        , []);
    return (
        <>
            <button className="btn btn-light w-100 mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
                Filtros
            </button>
            <div className="offcanvas offcanvas-start pt-10" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="1060" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Filtrar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form>
                        <div id="form-row-1" className="row">
                            <div className="mb-3 col-auto">
                                <label htmlFor="namePicker" className="form-label">Paciente:</label>
                                <input type="search" id="namePicker" className="form-control" list="namePicker-datalist" placeholder="Buscar..." />
                                <datalist id="namePicker-datalist">
                                    <option id="na-César" value="César">César</option>
                                </datalist>
                            </div>
                            <div className="mb-3 col-auto">
                                <label htmlFor="speciesPicker" className="form-label">Especie:</label>
                                <input type="search" id="speciesPicker" className="form-control" list="speciesPicker-datalist" placeholder="Buscar..." />
                                <datalist id="speciesPicker-datalist">
                                    <option id="sp-Perro" value="Perro">Perro</option>
                                </datalist>
                            </div>
                            <div className="mb-3 col-auto">
                                <label htmlFor="racePicker" className="form-label">Raza:</label>
                                <input type="search" id="racePicker" className="form-control" list="racePicker-datalist" placeholder="Buscar..." />
                                <datalist id="racePicker-datalist">
                                    <option id="ra-Alaskan Malamute" value="Alaskan Malamute">Alaskan Malamute</option>
                                </datalist>
                            </div>
                            <div className="mb-3 col-auto">
                                <label htmlFor="birthdayPicker" className="form-label">F. Nacimiento:</label>
                                <input type="date" id="birthdayPicker" className="form-control" />
                            </div>
                            <div className="mb-3 col-auto">
                                <label htmlFor="genderPicker" className="form-label">Género:</label>
                                <select type="" id="genderPicker" className="form-select" >
                                    <option id="ge-" value="">Select...</option>
                                    <option id="ge-female" value="female">Hembra</option>
                                    <option id="ge-male" value="male">Macho</option>
                                </select>
                            </div>
                            <div className="mb-3 col-auto">
                                <label htmlFor="sterilisedPicker" className="form-label">Esterilizado:</label>
                                <select type="" id="sterilisedPicker" className="form-select" >
                                    <option id="st-" value="">Select...</option>
                                    <option id="st-1" value="1">Sí</option>
                                    <option id="st-0" value="0">No</option>
                                </select>
                            </div>
                            <div className="mb-3 col-auto">
                                <label htmlFor="vetPicker" className="form-label">Veterinaria/o:</label>
                                <input type="search" id="vetPicker" className="form-control" list="vetPicker-datalist" placeholder="Buscar..." />
                                <datalist id="vetPicker-datalist">
                                    <option id="ve-Ansel" value="Ansel">Ansel</option>
                                </datalist>
                            </div>
                            <div className="mb-3 col-auto">
                                <label htmlFor="customerPicker" className="form-label">Cliente:</label>
                                <input type="search" id="customerPicker" className="form-control" list="customerPicker-datalist" placeholder="Buscar..." />
                                <datalist id="customerPicker-datalist">
                                    <option id="cu-Nicko" value="Nicko">Nicko</option>
                                </datalist>
                            </div>
                            <div className="mb-3 col-auto flex-column d-flex justify-content-end">
                                <button id="cleanButton" className="btn btn-light" onClick={cleanFilters}>Limpiar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="auto-table">
                    <thead id="auto-table-thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Especie</th>
                            <th scope="col">Raza</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Género</th>
                            <th scope="col">Esterilizado</th>
                            <th scope="col">Veterinari@</th>
                            <th scope="col">Responsable</th>
                            <th scope="col">Vista</th>
                        </tr>
                    </thead>
                    <tbody id="auto-table-tbody" />
                </table>
            </div>
            <nav aria-label="Table pagination">
                <ul className="pagination" id="pagination">

                </ul>
            </nav>
        </>
    )
}

function VisitsTable() {

    let filter = {};

    const captureData = (e) => {
        e.preventDefault();

        const id = e.target.id;
        const value = e.target.value;

        Object.defineProperty(filter, id, 
            {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            }
        )

        findVisits(handleData, 1, filter)
    }

    const handleData = (d, fetchMethod) => {
        handleTable(d, 'visits');
        Pagination(d, fetchMethod, handleData);

        let arrIds = [];
        const arrInputs = document.querySelectorAll('form .form-control, form .form-select');
        arrInputs.forEach(i => {
            arrIds.push(i.id);
            i.addEventListener('input', captureData);

        });
        getDataDatalist(d, arrIds)
    }

    const cleanFilters = (e) => {
        e.preventDefault();

        const fData = e.target.parentNode.parentNode.parentNode;
        handleClean(fData);

        for (const key in filter) {
            filter[key] = '';
        }

        getVisits(handleData);
    }

    useEffect(() => {
        getVisits(handleData);
    }
        , []);
    return (
        <>
            <button className="btn btn-light w-100 mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
                Filtros
            </button>
            <div className="offcanvas offcanvas-start pt-10" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="1060" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasLabel">Filtrar</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form>
                        <div id="form-row-1" className="row">
                            <div className="mb-3 col-auto">
                                <label htmlFor="datePicker" className="form-label">Fecha:</label>
                                <input type="date" id="datePicker" className="form-control" />
                            </div>
                            <div className="mb-3 col-auto">
                                <label htmlFor="categoryPicker" className="form-label">Categoría:</label>
                                <input type="search" id="categoryPicker" className="form-control" list="categoryPicker-datalist" placeholder="Buscar..." />
                                <datalist id="categoryPicker-datalist">
                                </datalist>
                            </div>
                            <div className="mb-3 col-auto">
                                <label htmlFor="vetPicker" className="form-label">Veterinaria/o:</label>
                                <input type="search" id="vetPicker" className="form-control" list="vetPicker-datalist" placeholder="Buscar..." />
                                <datalist id="vetPicker-datalist">
                                    <option id="ve-Colette" value="Colette">Colette</option>
                                </datalist>
                            </div>
                            <div className="mb-3 col-auto">
                                <label htmlFor="customerPicker" className="form-label">Cliente:</label>
                                <input type="search" id="customerPicker" className="form-control" list="customerPicker-datalist" placeholder="Buscar..." />
                                <datalist id="customerPicker-datalist">
                                    <option id="cu-Nicko" value="Nicko">Nicko</option>
                                </datalist>
                            </div>
                            <div className="mb-3 col-auto">
                                <label htmlFor="patientPicker" className="form-label">Paciente:</label>
                                <input type="search" id="patientPicker" className="form-control" list="patientPicker-datalist" placeholder="Buscar..." />
                                <datalist id="patientPicker-datalist">
                                    <option id="pa-Croqueta" value="Croqueta">Croqueta</option>
                                </datalist>
                            </div>
                            <div className="mb-3 col-auto">
                                <label htmlFor="completedPicker" className="form-label">Completada:</label>
                                <select type="" id="completedPicker" className="form-select">
                                    <option id="co-" value="">Select...</option>
                                    <option id="co-1" value="1">Sí</option>
                                    <option id="co-0" value="0">No</option>
                                </select>
                            </div>
                            <div className="mb-3 col-auto flex-column d-flex justify-content-end">
                                <button id="cleanButton" className="btn btn-light" onClick={cleanFilters}>Limpiar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="auto-table">
                    <thead id="auto-table-thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Veterinaria/o</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Paciente</th>
                            <th scope="col">Completada</th>
                            <th scope="col">Vista</th>
                        </tr>
                    </thead>
                    <tbody id="auto-table-tbody" />
                </table>
            </div>
            <nav aria-label="Table pagination">
                <ul className="pagination" id="pagination">

                </ul>
            </nav>
        </>
    )
}


function Table({ selector }) {

    let table;

    switch (selector) {
        case 'customers':
            table = <CustomersTable />;
            break;
        case 'patients':
            table = <PatientsTable />;
            break;
        default:
            table = <VisitsTable />;
            break;
    }

    return (
        <>
            {table}
        </>
    )
}

export default Table;