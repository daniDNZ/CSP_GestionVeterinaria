import { useEffect } from "react";
import { findVisits, findCustomers, findPatients } from "./ApiFetch";
import { FormArray, handleClean, inputGenerator } from "./FormController";
import { getDataDatalist } from "./Datalist";

function SearchFilter({ arr, fetchMethod }) {

    // ORDENAR ELEMENTOS EN EL PRIMER FECTH (GET) UTILIZANDO LA FUNCIÓN CUSTOM
    // CONTINUAR AFINANDO LAS BÚSQUEDAS, LOS DATALIST Y DEMÁS

    let filter = {};

    const findData = () => {

        if (arr.headers[0] == 'patients') {
            findPatients(arr, 1, filter);
        }
        if (arr.headers[0] == 'customers') {
            findCustomers(arr, 1, filter);
        }
        if (arr.headers[0] == 'visits') {
            findVisits(arr, 1, filter);
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

    // const fillDatalist = () => {
    //     fetchMethod( getDataDatalist, id )
    // }

    const cleanForm = (e) => {
        e.preventDefault();

        const fData = e.target.parentNode.parentNode.parentNode;
        handleClean(fData);

        for (const key in filter) {
            filter[key] = '';
        }

        fetchMethod(arr);
        // fetchMethod(assignData, arr);
        // fillDatalist();
    }

    const searchListeners = () => {
        
            arr.ids.forEach(e => {
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
        inputGenerator(FormArray(arr.formType, {}))
        // fetchMethod();
        // fillDatalist();
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
    thead.innerHTML = headRow;
    tbody.innerHTML = newTbody;
}

const assignData = (fetchData, arr, bodyData = {}) => {
    let data = {
        thead: arr.headers,
        tbody: fetchData.data,
        maxPages: fetchData.maxPages,
        thisPage: fetchData.thisPage
    }

    fillTable(data);
    // activePagination(data, arr, bodyData);
};


function TableGenerator({ arr, fetchMethod }) {

    useEffect(() => {
        // fetchMethod(assignData, arr);
        fetchMethod(arr);
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

export { TableGenerator, assignData }
