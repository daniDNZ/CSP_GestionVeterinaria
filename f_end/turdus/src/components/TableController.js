import { useEffect } from "react";
import { getPatients, getCustomers, getVets, getSpecies, getRaces, findCustomers, findPatients, findVets, findSpecies } from "./ApiFetch";
import { handleDatalist } from "./Handlers";
import { handleClean } from "./FormController";

function SearchFilter({ arr, fetchMethod }) {

    let filter = {
        user: '',
        customer: '',
        patient: '',
        species: '',
        sterilised: ''
    };

    const findData = () => {
        
        if (arr[0] == 'patients') findPatients(assignData, filter, arr);
        if (arr[0] == 'customers') findCustomers(assignData, filter, arr);
        findPatients(handleDatalist, filter, 'patientPicker');
        findCustomers(handleDatalist, filter, 'customerPicker');
        findVets(handleDatalist, filter,  'vetPicker');
        findSpecies(handleDatalist, filter, 'speciesPicker');
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
        filter.sterilised = e.target.checked;
        findData();

    }

    const fillDatalist = () => {
        getVets(handleDatalist, 'vetPicker');
        getCustomers(handleDatalist, 'customerPicker');
        getSpecies(handleDatalist, 'speciesPicker');
        getPatients(handleDatalist, 'patientPicker');
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

    useEffect(() => {
        fillDatalist();
    }, [])


    return (
        <form>
            <div className="row">
                <div className="mb-3 col-auto">
                    <label htmlFor="vetPicker" className="form-label">Veterinaria/o:</label>
                    <input id="vetPicker" list="vetPicker-datalist" className="form-control" placeholder="Buscar..." onInput={captureUser}></input>
                    <datalist id="vetPicker-datalist"></datalist>
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="customerPicker" className="form-label">Cliente:</label>
                    <input id="customerPicker" className="form-control" list="customerPicker-datalist" placeholder="Buscar..." onInput={captureCustomer}></input>
                    <datalist id="customerPicker-datalist"></datalist>
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="patientPicker" className="form-label">Paciente:</label>
                    <input id="patientPicker" className="form-control" list="patientPicker-datalist" placeholder="Buscar..." onInput={capturePatient}></input>
                    <datalist id="patientPicker-datalist"></datalist>
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="speciesPicker" className="form-label">Especie:</label>
                    <input list="speciesPicker-datalist" id="speciesPicker" className="form-control" placeholder="Buscar..." onInput={captureSpecies} />
                    <datalist id="speciesPicker-datalist">
                    </datalist>
                </div>
                <div className="mb-3 col-auto d-flex flex-column">
                    <div>
                        <label htmlFor="checkbox-sterilised" className="form-label row">Esterilizado: </label>
                    </div>
                    <div className=" my-auto d-flex flex-row justify-content-center">
                        <input type="checkbox" id="checkbox-sterilised" name="completed" className="form-check-input row" onInput={captureSterilised} />
                    </div>
                </div>
                <div className="mb-3 col-auto flex-column d-flex justify-content-end">
                    <button type="submit" className="btn btn-light" onClick={cleanForm}>Limpiar...</button>
                </div>
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
            <SearchFilter arr={arr} fetchMethod={fetchMethod}/>
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