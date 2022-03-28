import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function Visits() {
    let day = getDay();
    let userId = '';
    let customer = '';
    let patient = '';
    let arrVets;
    let arrCustomers;
    let arrPatients;
    let arrVisits;

    useEffect(() => {

        fetchVets();
        fetchCustomers();
        fetchPatients();
        fetchVisit();

        day = '';
    
    },[])

    const fetchVisit = () => {
        const bodyData = {
            day: day,
            userid: userId,
            customer: customer,
            patient: patient
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
        const request = new Request("http://192.168.1.81:8888/api/day_schedule", config);
        console.log(bodyData)
        fetch(request)
            .then(response => response.json())
            .then(data => { handleVisits(data) } )
            .catch(e => {
                console.log(e)
                // localStorage.clear();
                // window.location = '/turdus/login'
            })
    }

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
            .then(data => { handleVets(data)} )
            .catch(e => {
                console.log(e)
                // localStorage.clear();
            });
    }

    const fetchCustomers = () => {
        const bodyData = {
            patient: patient,
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
            .then(data => { handleCustomers(data)} )
            .catch(e => {
                console.log(e)
                // localStorage.clear();
            });
    }

    const fetchPatients = () => {
        const bodyData = {
            userid: userId,
            customer: customer,
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
            .then(data => { handlePatients(data)} )
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

    const handleVisits = (data) => {
        arrVisits = data;
        arrVisits.sort(function (a, b) {
            if (a.date_time.date > b.date_time.date){
                return 1;
            }
            if (a.date_time.date < b.date_time.date){
                return -1;
            }
            return 0;
        })
        console.log(arrVisits)
        let datalist = '<tr>';
        arrVisits.forEach(v => {
            const li = 
            `
                <td>${v.date_time.date.split('.')[0]}</ td>
                <td>${v.category}</ td>
                <td>${v.patient}</ td>
                <td>${v.vet}</ td>
                <td>${v.customer}</ td>
                <td><a href="/turdus/visits/${v.id}" class="nav-link px-2 text-truncate">
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

        day = '';
        customer = '';
        patient = '';
        userId = '';
        document.getElementById("patient-picker").value = '';
        document.getElementById("customer-picker").value = '';
        document.getElementById("vet-picker").value = '';
        document.getElementById("date-picker").value = '';
        document.getElementById('visits-table-tbody').innerHTML = '';
        fetchVets();
        fetchPatients();
        fetchCustomers();
    }

    const captureDate = (e) => {
        e.preventDefault();
        day = e.target.value;
        console.log(day)
        fetchPatients()
        fetchCustomers()
        fetchVisit()
    }

    const captureUser = (e) => {
        e.preventDefault();
        userId = e.target.value;
        console.log(userId)
        fetchPatients()
        fetchCustomers()
        fetchVisit()
    }

    const captureCustomer = (e) => {
        e.preventDefault();
        customer = e.target.value.split(' ')[0];
        console.log(customer)
        fetchPatients()
        fetchVisit()
    }

    const capturePatient = (e) => {
        e.preventDefault();
        patient = e.target.value.split(' ')[0];
        console.log(patient)
        fetchCustomers()
        fetchVets()
        fetchVisit()
    }

    // Obtenemos el día actual
    function getDay() {
        let curr = new Date
        let first = 0
        first = curr.getDate()
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)

        return day;
    }

    return (
        <div className="container">
            <div className="d-flex flex-row justify-content-between">
                <form>
                    <div className="row">
                        <div className="mb-3 col-auto">
                            <label htmlFor="date-picker" className="form-label">Día:</label>
                            <input type="date" id="date-picker" className="form-control date-input" onInput={captureDate} />
                        </div>
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
                            <th scope="col">Fecha</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Paciente</th>
                            <th scope="col">Veterinari@</th>
                            <th scope="col">Cliente</th>
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