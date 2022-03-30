import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function Visits() {
    let userId = '';
    let customer = '';
    let patient = '';
    let species = '';
    let sterilised = '';
    let arrVets;
    let arrCustomers;
    let arrPatients;

    useEffect(() => {

        fetchVets();
        fetchCustomers();
        fetchPatients();


    }, [])


    const fetchVets = () => {
        const bodyData = {
            patient: patient,
            customer: customer
        }
        const config = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        }
        const request = new Request("http://192.168.1.81:8888/api/vets", config);
        fetch(request)
            .then(response => response.json())
            .then(data => { handleVets(data) })
            .catch(e => {
                console.log(e)
                // localStorage.clear();
            });
    }

    const fetchCustomers = () => {
        const bodyData = {
            patient: patient,
            species: species,
            userid: userId,
        }
        const config = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        }
        const request = new Request("http://192.168.1.81:8888/api/customers", config);
        fetch(request)
            .then(response => response.json())
            .then(data => { handleCustomers(data) })
            .catch(e => {
                console.log(e)
                // localStorage.clear();
            });
    }

    const fetchPatients = () => {
        const bodyData = {
            patient: patient,
            userid: userId,
            customer: customer,
            species: species,
            sterilised: sterilised
        }
        const config = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        }
        const request = new Request(`http://192.168.1.81:8888/api/patients`, config);
        fetch(request)
            .then(response => response.json())
            .then(data => { handlePatients(data); handleData(data); })
            .catch(e => {
                console.log(e)
                // localStorage.clear();
            });
    }

    const handleVets = (data) => {
        arrVets = data;
        let datalist = `<option value='' selected>Select...</option>`;
        arrVets.forEach(vet => {
            const option =
                `
                <option value="${vet.id}">${vet.name}</ option>
            `
            datalist += option;
        });
        document.getElementById("vet-picker").innerHTML = datalist;

    }

    const handleCustomers = (data) => {
        arrCustomers = data;
        let datalist = '';
        arrCustomers.forEach(c => {
            const option =
                `
                <option value="${c.id} ${c.name}">${c.name}</ option>
            `
            datalist += option;
        });
        document.getElementById("datalist-customers").innerHTML = datalist;

    }

    const handlePatients = (data) => {
        arrPatients = data;
        let datalist = '';
        arrPatients.forEach(p => {
            const option =
                `
                <option value="${p.id} ${p.name}">${p.name}</ option>
            `
            datalist += option;
        });
        document.getElementById("datalist-patients").innerHTML = datalist;

    }

    const handleData = (data) => {
        arrPatients = data;
        console.log(arrPatients)
        let datalist = '<tr>';
        arrPatients.forEach(p => {
            let birthday = new Date(p.birthday.date)
            const li =
                `
                <td>${p.name}</ td>
                <td>${p.species}</ td>
                <td>${p.race}</ td>
                <td>${birthday.toISOString().split('T')[0]}</ td>
                <td>${p.gender}</ td>
                <td>${p.sterilised}</ td>
                <td>${p.vet}</ td>
                <td>${p.responsible}</ td>

                <td><a href="/turdus/visits/${p.id}" class="nav-link px-2 text-truncate">
                            <i class="bi bi-card-text fs-5 me-2"></i>
                    </a>
                </ td>
                </tr>
            `
            datalist += li;
        })
        document.getElementById('visits-table-tbody').innerHTML = datalist;
    }

    const handleClean = (e) => {
        e.preventDefault();

        customer = '';
        patient = '';
        userId = '';
        sterilised = '';
        document.getElementById("patient-picker").value = '';
        document.getElementById("customer-picker").value = '';
        document.getElementById("vet-picker").value = '';
        document.getElementById('visits-table-tbody').innerHTML = '';
        document.getElementById('visits-completed').checked = false;
        fetchVets();
        fetchPatients();
        fetchCustomers();
    }


    const captureUser = (e) => {
        e.preventDefault();
        userId = e.target.value;
        console.log(userId)
        fetchPatients()
        fetchCustomers()
    }

    const captureCustomer = (e) => {
        e.preventDefault();
        customer = e.target.value.split(' ')[0];
        console.log(customer)
        fetchPatients()
    }

    const capturePatient = (e) => {
        e.preventDefault();
        patient = e.target.value.split(' ')[0];
        console.log(patient)
        fetchPatients()
        fetchCustomers()
        fetchVets()
    }
    const captureSpecies = (e) => {
        e.preventDefault();
        species = e.target.value;
        console.log(species)
        fetchPatients()
        // FALTA MODIFICAR LISTAS DE VETERINARIOS Y CLIENTES SEGÚN LA ESPECIE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        fetchCustomers()
    }
    const captureSterilised = (e) => {
        e.preventDefault();
        sterilised = e.target.checked;
        fetchPatients();
    }
 

    return (
        <div className="container">
            <div className="d-flex flex-row justify-content-between">
                <form>
                    <div className="row">
                        <div className="mb-3 col-auto">
                            <label htmlFor="vet-picker" className="form-label">Veterinaria/o:</label>
                            <select type="text" id="vet-picker" className="form-select" onInput={captureUser}></select>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="customer-picker" className="form-label">Cliente:</label>
                            <input id="customer-picker" className="form-control" list="datalist-customers" placeholder="Buscar..." onInput={captureCustomer}></input>
                            <datalist id="datalist-customers"></datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-picker" className="form-label">Paciente:</label>
                            <input id="patient-picker" className="form-control" list="datalist-patients" placeholder="Buscar..." onInput={capturePatient}></input>
                            <datalist id="datalist-patients"></datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="species-picker" className="form-label">Especie:</label>
                            <select type="text" id="species-picker" className="form-select" onInput={captureSpecies}>
                                <option>Canis Familiaris</option>
                                <option>Felis Catus</option>
                                <option>Pogona Vitticeps</option>
                                <option>Nymphicus Hollandicus</option>
                            </select>
                        </div>
                        <div className="mb-3 col-auto d-flex flex-column">
                            <div>
                                <label htmlFor="visit-completed" className="form-label row">Esterilizado: </label>
                            </div>
                            <div className=" my-auto d-flex flex-row justify-content-center">
                                <input type="checkbox" id="visits-completed" name="completed" className="form-check-input row" onInput={captureSterilised} />
                            </div>
                        </div>
                        <div className="mb-3 col-auto flex-column d-flex justify-content-end">
                            <button type="button" className="btn btn-light" onClick={handleClean}>Limpiar...</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="visits-table">
                    <thead>
                        <tr>
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
                    <tbody id="visits-table-tbody">

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Visits;