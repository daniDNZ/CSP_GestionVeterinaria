import { useEffect } from "react";

function CustomersList() {
    let patient = '';
    let userId = '';
    let customer = '';
    let species = '';
    let sterilised = '';
    let arrCustomers;
    let arrVets;
    let arrPatients;

    useEffect(() => {

        fetchSpecies();
        fetchVets();
        fetchPatients();
        fetchCustomers();

    }, [])

    const fetchSpecies = () => {

        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }
        const request = new Request("http://192.168.1.81:8888/api/species", config);
        fetch(request)
            .then(response => response.json())
            .then(data => { handleSpecies(data) })
            .catch(e => {
                console.log(e)
                // localStorage.clear();
            });
    }

    const fetchVets = () => {
        const bodyData = {
            patient: patient,
            sterilised: sterilised,
            species: species,
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
            .then(data => { 
            console.log(data)    
                handleVets(data) 
            })
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
            .then(data => { handlePatients(data) })
            .catch(e => {
                console.log(e)
                // localStorage.clear();
      
            })
    }

    const fetchCustomers = () => {
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
        const request = new Request(`http://192.168.1.81:8888/api/customers`, config);
        fetch(request)
            .then(response => response.json())
            .then(data => { handleData(data); handleCustomers(data)})
            .catch(e => {
                console.log(e)
                // localStorage.clear();
            });
    }

    const handleSpecies = (data) => {
        
        let datalist = '<option value="" selected>Select...</option>';
        data.forEach(s => {
            const op =
                `
                    <option id="spe-${s.id}" value="${s.id}">${s.name}</ option>
                `
            datalist += op;
        });
        document.getElementById("species-picker").innerHTML = datalist;

    }

    const handleVets = (data) => {
        arrVets = data;
        let datalist = `<option value="" selected>Select...</option>`;
        arrVets.forEach(vet => {
            const option =
                `
                <option value="${vet.id}">${vet.name}</ option>
            `
            datalist += option;
        });
        document.getElementById("vet-picker").innerHTML = datalist;

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

    const handleCustomers = (data) => {
        console.log(data)
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

    const handleData = (data) => {
        arrCustomers = data;
        let datalist = '<tr>';
        let i = 1;
        arrCustomers.forEach(c => {
            const li =
                `
                <td>${i}</ td>
                <td>${c.name}</ td>
                <td>${c.lastname}</ td>
                <td>${c.phone}</ td>
                <td>${c.email}</ td>
                <td>
                    <a href="/turdus/customers/${c.id}" class="nav-link px-2 text-truncate">
                        <i class="bi bi-card-text fs-5 me-2"></i>
                    </a>
                </ td>
                </tr>
            `
            datalist += li;
            i++;
        })
        document.getElementById('customers-table-tbody').innerHTML = datalist;
    }

    const handleClean = (e) => {
        e.preventDefault();

        customer = '';
        patient = '';
        userId = '';
        sterilised = '';
        species = '';
        document.getElementById("patient-picker").value = '';
        document.getElementById("customer-picker").value = '';
        document.getElementById("vet-picker").value = '';
        document.getElementById('customers-table-tbody').innerHTML = '';
        document.getElementById('species-picker').value = '';
        fetchVets();
        fetchPatients();
        fetchSpecies();
        fetchCustomers();
    }

    const captureUser = (e) => {
        e.preventDefault();
        userId = e.target.value;
        fetchPatients()
        fetchCustomers()
    }

    const captureCustomer = (e) => {
        e.preventDefault();
        customer = e.target.value.split(' ')[0];
        console.log(customer)
        fetchCustomers()
    }

    const capturePatient = (e) => {
        e.preventDefault();
        patient = e.target.value.split(' ')[0];
        fetchPatients()
        fetchCustomers()
        fetchVets()
    }
    const captureSpecies = (e) => {
        e.preventDefault();
        species = e.target.value;
        fetchPatients()
        fetchCustomers()
        fetchVets()
    }

    return (
        <div className="container">
            <div className="d-flex flex-row justify-content-between">
                <form>
                    <div className="row">
                        
                        <div className="mb-3 col-auto">
                            <label htmlFor="customer-picker" className="form-label">Cliente:</label>
                            <input id="customer-picker" className="form-control" list="datalist-customers" placeholder="Buscar..." onInput={captureCustomer}></input>
                            <datalist id="datalist-customers"></datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="vet-picker" className="form-label">Veterinaria/o:</label>
                            <select type="text" id="vet-picker" className="form-select" onInput={captureUser}></select>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-picker" className="form-label">Paciente:</label>
                            <input id="patient-picker" className="form-control" list="datalist-patients" placeholder="Buscar..." onInput={capturePatient}></input>
                            <datalist id="datalist-patients"></datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="species-picker" className="form-label">Especie:</label>
                            <select type="text" id="species-picker" className="form-select" onInput={captureSpecies}>
                            </select>
                        </div>
                        <div className="mb-3 col-auto flex-column d-flex justify-content-end">
                            <button type="button" className="btn btn-light" onClick={handleClean}>Limpiar...</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="customers-table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">e-mail</th>
                            <th scope="col">Vista</th>
                        </tr>
                    </thead>
                    <tbody id="customers-table-tbody">

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default CustomersList;