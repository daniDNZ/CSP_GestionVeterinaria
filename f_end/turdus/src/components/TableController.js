import { useEffect } from "react";
import { getPatients, getCustomers, getVets, getSpecies, getRaces, findVisits, findCustomers, findPatients, findVets, findSpecies } from "./ApiFetch";
import { handleDatalist } from "./Handlers";
import { FormArray, FormGenerator, handleClean, inputGenerator } from "./FormController";

function SearchFilter({ arr, fetchMethod }) {

    // CONTINUAR AFINANDO LAS BÚSQUEDAS, LOS DATALIST Y DEMÁS

    let filter = {
        // user: '',
        // customer: '',
        // patient: '',
        // species: '',
        // sterilised: '',
        // date: '',
        // completed: ''
    };
    let formType = 'searchCustomerForm';
    let id = ['namePicker', 'lastnamePicker', 'phonePicker', 'emailPicker'];

    if (arr[0] == 'visits') {
        formType = 'searchVisitForm';
    }
    if (arr[0] == 'patients') formType = 'searchPatientForm';

    if (arr[0] == 'customers') {
        formType = 'searchCustomerForm';
        id = ['namePicker', 'lastnamePicker', 'phonePicker', 'emailPicker']
    }

    const findData = () => {

        if (arr[0] == 'patients') {
            findPatients(assignData, filter, arr);
            findPatients(getData);
        }
        if (arr[0] == 'customers') {
            console.log(filter)
            findCustomers(assignData, filter, arr);
            findCustomers(getData);
        }
        if (arr[0] == 'visits') {
            findVisits(assignData, filter, arr);
            findVisits(getData);
        }
        // findPatients(handleDatalist, filter, 'patientPicker');
        // findCustomers(handleDatalist, filter, 'customerPicker');
        // findVets(handleDatalist, filter, 'vetPicker');
        // if (arr[0] !== 'visits') findSpecies(handleDatalist, filter, 'speciesPicker');
    }

    // const captureUser = (e) => {
    //     e.preventDefault();
    //     filter.user = e.target.value;
    //     findData();
    // }

    // const captureCustomer = (e) => {
    //     e.preventDefault();
    //     filter.customer = e.target.value;
    //     findData();
    // }

    // const capturePatient = (e) => {
    //     e.preventDefault();
    //     filter.patient = e.target.value.split(' ')[0];
    //     findData();
    // }

    // const captureSpecies = (e) => {
    //     e.preventDefault();
    //     filter.species = e.target.value;
    //     findData();
    // }

    // const captureSterilised = (e) => {
    //     e.preventDefault();
    //     filter.sterilised = e.target.value;
    //     findData();
    // }

    // const captureCompleted = (e) => {
    //     e.preventDefault();
    //     filter.completed = e.target.value;
    //     findData();
    // }

    // const captureDate = (e) => {
    //     e.preventDefault();
    //     filter.date = e.target.valueAsDate.toLocaleDateString();
    //     findData();
    // }

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
        console.log(filter)
        findData();
    }

    const getData = (data) => {
        
        let i = 0;
        let keys = Object.keys(data[0]);
        keys.shift();

        keys.forEach(k => {
            let arr = [];
            data.forEach(obj => {

                arr.push(obj[k]);
        
            });

            arr = [... new Set(arr)];
            handleDatalist(arr, id[i]);
            i++;
        });
        

    }

    const fillDatalist = () => {
        fetchMethod( getData )
        // getVets(handleDatalist, 'vetPicker');
        // getCustomers(handleDatalist, 'customerPicker');
        // if (arr[0] !== 'visits') getSpecies(handleDatalist, 'speciesPicker');
        // getPatients(handleDatalist, 'patientPicker');
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
        
        // if (arr[0] == 'patients') {
        //     document.getElementById('vetPicker').addEventListener('input', captureUser);
        //     document.getElementById('customerPicker').addEventListener('input', captureCustomer);
        //     document.getElementById('patientPicker').addEventListener('input', capturePatient);
        //     document.getElementById('sterilisedPicker').addEventListener('input', captureSterilised)
        //     document.getElementById('speciesPicker').addEventListener('input', captureSpecies)
        // } else if (arr[0] == 'visits'){
        //     document.getElementById('datePicker').addEventListener('input', captureDate);
        //     document.getElementById('completedPicker').addEventListener('input', captureCompleted);
        // } else if (arr[0] == 'customers'){
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
            
            // document.getElementById('completedPicker').addEventListener('input', captureCompleted);
        // }
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

const assignData = (fetchData, arr) => {

    let data = {
        thead: arr,
        tbody: fetchData
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
        </>
    )
}

export { TableGenerator }