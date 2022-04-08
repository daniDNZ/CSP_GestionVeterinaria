import { useEffect } from "react";
import { getPatients, getCustomers, getVets, getSpecies, getRaces, findVisits, findCustomers, findPatients, findVets, findSpecies } from "./ApiFetch";
import { handleDatalist } from "./Handlers";
import { FormArray, FormGenerator, handleClean, inputGenerator } from "./FormController";

function SearchFilter({ arr, fetchMethod }) {

    let filter = {
        user: '',
        customer: '',
        patient: '',
        species: '',
        sterilised: '',
        date: '',
        completed: ''
    };
    let formType = 'searchForm';

    if (arr[0] == 'visits') formType = 'visitSearchForm';

    const findData = () => {

        if (arr[0] == 'patients') {
            findPatients(assignData, filter, arr);
            findPatients(getData);
        }
        if (arr[0] == 'customers') {
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

    const captureUser = (e) => {
        e.preventDefault();
        filter.user = e.target.value;
        findData();
    }

    const captureCustomer = (e) => {
        e.preventDefault();
        filter.customer = e.target.value;
        findData();
    }

    const capturePatient = (e) => {
        e.preventDefault();
        filter.patient = e.target.value.split(' ')[0];
        findData();
    }

    const captureSpecies = (e) => {
        e.preventDefault();
        filter.species = e.target.value;
        findData();
    }

    const captureSterilised = (e) => {
        e.preventDefault();
        filter.sterilised = e.target.value;
        findData();
    }

    const captureCompleted = (e) => {
        e.preventDefault();
        filter.completed = e.target.value;
        findData();
    }

    const captureDate = (e) => {
        e.preventDefault();
        filter.date = e.target.valueAsDate.toLocaleDateString();
        findData();
    }

    const getData = (data) => {
        let arrVets = [];
        let arrCustomers = [];
        let arrPatients = [];
        let vet;
        let customer;
        let patient;

        data.forEach(e => {
            e.vet ? vet = e.vet : vet = e.name;
            e.customer ? customer = e.customer : customer = e.name;
            e.patient ? patient = e.patient : patient = e.name;

            arrVets.push(vet);
            arrCustomers.push(customer);
            arrPatients.push(patient)
        });

        // Eliminamos duplicados
        arrVets = [... new Set(arrVets)];
        arrCustomers = [... new Set(arrCustomers)];
        arrPatients = [... new Set(arrPatients)];

        handleDatalist(arrVets, 'vetPicker');
        handleDatalist(arrCustomers, 'customerPicker');
        handleDatalist(arrPatients, 'patientPicker');

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
        document.getElementById('vetPicker').addEventListener('input', captureUser);
        document.getElementById('customerPicker').addEventListener('input', captureCustomer);
        document.getElementById('patientPicker').addEventListener('input', capturePatient);
        if (arr[0] !== 'visits') {
            document.getElementById('sterilisedPicker').addEventListener('input', captureSterilised)
            document.getElementById('speciesPicker').addEventListener('input', captureSpecies)
        } else {
            document.getElementById('datePicker').addEventListener('input', captureDate);
            document.getElementById('completedPicker').addEventListener('input', captureCompleted);
        }
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