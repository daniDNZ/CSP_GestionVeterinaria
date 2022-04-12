import { useEffect } from "react";
import { getPatients, getCustomers, getVets, getSpecies, getRaces, findVisits, findCustomers, findPatients, findVets, findSpecies } from "./ApiFetch";
import { handleDatalist, handlePagination } from "./Handlers";
import { FormArray, FormGenerator, handleClean, inputGenerator } from "./FormController";

function SearchFilter({ arr, fetchMethod }) {

    // ORDENAR ELEMENTOS EN EL PRIMER FECTH (GET) UTILIZANDO LA FUNCIÓN CUSTOM
    // CONTINUAR AFINANDO LAS BÚSQUEDAS, LOS DATALIST Y DEMÁS

    let filter = {};
    let formType = 'searchCustomerForm';

    let id = ['namePicker', 'lastnamePicker', 'phonePicker', 'emailPicker'];

    if (arr[0] == 'visits') {
        formType = 'searchVisitForm';
        id = [
            'datePicker',
            'categoryPicker',
            'vetPicker',
            'customerPicker',
            'patientPicker',
            'completedPicker'
        ]
    }

    if (arr[0] == 'patients') {
        formType = 'searchPatientForm';
        id = [
            'namePicker', 
            'speciesPicker', 
            'racePicker', 
            'birthdayPicker', 
            'genderPicker',
            'sterilisedPicker',
            'vetPicker',
            'customerPicker'
        ]
    }

    if (arr[0] == 'customers') {
        formType = 'searchCustomerForm';
        id = ['namePicker', 'lastnamePicker', 'phonePicker', 'emailPicker']
    }

    const findData = () => {

        if (arr[0] == 'patients') {
            findPatients(assignData, filter, arr);
            findPatients(getData, filter);
        }
        if (arr[0] == 'customers') {
            findCustomers(assignData, filter, arr);
            findCustomers(getData, filter);
        }
        if (arr[0] == 'visits') {
            findVisits(assignData, filter, arr);
            findVisits(getData, filter);
        }

    }

    const captureData = (e) => {
        e.preventDefault();
        let named = e.target.id;
        let value = e.target.value;
        Object.defineProperty(filter, named, 
        {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
        findData();
    }

    // Recoge los valores de la misma key de cada objeto para 
    // imprimirlos después en la datalist correspondiente.
    const getData = (data) => {
        
        // Primero comprobamos que tenemos datos.
        if (data.length > 0) {

            // Inicializamos un contador para recorrer los id
            // del array de ids para las datalist.
            let i = 0;

            // Recogemos las keys del objeto.
            let keys = Object.keys(data[0]);

            // Eliminamos la key 'id',
            keys.shift();

            // Por cada key recorremos todos los objetos y los almacenamos
            // para enviarlos al método que crea la datalist.
            keys.forEach(k => {
                let arrData = [];

                data.forEach(obj => { arrData.push(obj[k]) });

                // Eliminamos elementos repetidos.
                arrData = [... new Set(arrData)];

                handleDatalist(arrData, id[i]);
                i++;
            });
        }
    }

    const fillDatalist = () => {
        fetchMethod( getData )
    }

    const cleanForm = (e) => {
        e.preventDefault();

        const fData = e.target.parentNode.parentNode.parentNode;
        handleClean(fData);

        for (const key in filter) {
            filter[key] = '';
        }

        fetchMethod(assignData, arr);
        fillDatalist();
    }

    const searchListeners = () => {
        
            id.forEach(e => {
                Object.defineProperty(filter, e, 
                    {
                        value: '',
                        enumerable: true,
                        configurable: true,
                        writable: true
                    })
                document.getElementById(e).addEventListener('input', captureData);
            });
            
        document.getElementById('cleanButton').addEventListener('click', cleanForm);
        
    }

    useEffect(() => {
        inputGenerator(FormArray(formType, {}))
        fillDatalist();
        searchListeners();
    }, [arr])

    return (
        <form>
            <div id="form-row-1" className="row">
            </div>
        </form>
    )
}

const fillTable = (data) => {

    const thead = document.getElementById('auto-table-thead');
    const tbody = document.getElementById('auto-table-tbody');
    const pagination = document.getElementById('pagination');

    let newTbody = '';
    let headRow = '<tr>';
    let i = 0;

    data.thead.forEach(e => {
        if (i !== 0) {
            let cell = `<th scope="col">${e}</th>`;
            headRow += cell;
        }
        i++;
    });
    headRow += '</tr>';

    data.tbody.forEach(e => {

        let bodyRow = '<tr>';

        for (const key in e) {

            let cell = `<td>${e[key]}</td>`;
            bodyRow += cell;
        }

        bodyRow += `
            <td>
                <a href="/turdus/${data.thead[0]}/${e.id}" class="nav-link px-2 text-truncate">
                    <i class="bi bi-card-text fs-5 me-2"></i>
                </a>
            </td>
        </tr>`;
        newTbody += bodyRow;
    });

    // Pagination
    
    let pages = [];
    let arr;
    
    if (data.thisPage == 1) {
        
        arr = [];
        for (let i = 1; i <= data.maxPages; i++) {
            arr.push(i)
        }
        pages = arr;
        

    } else if (data.thisPage == data.maxPages) {

        arr = [];
        for (let i = data.maxPages; i >= 1; i--) {
            arr.push(i)
        }
            
        pages = arr.reverse();

    } else {
        pages = [data.thisPage-1, data.thisPage, data.thisPage+1];
    }
        
    let paginator = `
        <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `;

    pages.forEach(p => {
        paginator += 
        `
            <li class="page-item"><a class="page-link" href="#">${p}</a></li>
        `
    });

    paginator +=
    `
        <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `

    thead.innerHTML = headRow;
    tbody.innerHTML = newTbody;
    pagination.innerHTML = paginator;

    // Paginator listeners
    const paginationItems = document.querySelectorAll('.page-link');

    paginationItems.forEach(e => {
        // MIRAR CÓMO HACER EL FECTH PARA DEVOLVER LOS CAMPOS (DÓNDE PONER EL HANDLE, CÓMO DEVOLVER LA PÁGINA ACTUAL, ETC)
        e.addEventListener('click', handlePagination);
    });

}

const assignData = (fetchData, arr) => {

    let data = {
        thead: arr,
        tbody: fetchData.data,
        maxPages: fetchData.maxPages,
        thisPage: fetchData.thisPage
    }
    fillTable(data);
};

function TableGenerator({ arr, fetchMethod }) {

    useEffect(() => {
        fetchMethod(assignData, arr);
    }, [arr])

    return (
        <>
            <SearchFilter arr={arr} fetchMethod={fetchMethod} />
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="auto-table">
                    <thead id="auto-table-thead"></thead>
                    <tbody id="auto-table-tbody"></tbody>
                </table>
            </div>
            <nav aria-label="Table pagination">
                <ul className="pagination" id="pagination">
                    {/* <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li> */}
                </ul>
            </nav>
        </>
    )
}

export { TableGenerator }