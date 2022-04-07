import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/visits.css';
import { FormAlerts, FormModal, PatientForm } from "./FormController";

function Patient() {
    const { id } = useParams();
    let arrData;


    useEffect(() => {

        fetchSpecies();
        fetchRaces();
        fetchCustomers();
        fetchVets();

        // Listeners
        


    }, [])

    const handlePatient = (e) => {
        e.preventDefault();
        handleAlert();
        const fData = e.target;
        const birthday = `${fData.birthday.value.split('T')[0]}`

        // Enviar datos y hacer update o insert
        const bodyData = {
            id: id,
            name: fData.name.value,
            info: fData.info.value,
            chip: fData.chip.value,
            eyes: fData.eyes.value,
            color: fData.color.value,
            weight: fData.weight.value,
            gender: fData.gender.value,
            sterilised: fData.sterilised.value,
            vet: fData.vet.value,
            race: fData.race.value,
            species: fData.species.value,
            customer: fData.customer.value.split(' ')[0],
            birthday: birthday
        }
console.log(bodyData)
        const config = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        }
        const request = new Request("http://192.168.1.81:8888/api/patient/update", config);
        fetch(request)
            .then(response => response.json())
            .then(data => { console.log(data) })
            .catch(e => {
                console.log(e, 'Esto es un error')
                // localStorage.clear();
                // window.location = '/turdus/login'
            })

    }

    const fetchPatient = () => {
        const bodyData = {
            id: id
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
        const request = new Request("http://192.168.1.81:8888/api/patient", config);
        fetch(request)
            .then(response => response.json())
            .then(data => { handleData(data) })
            .catch(e => {
                console.log(e)
                // localStorage.clear();
                // window.location = '/turdus/login'
            })
    }

    const fetchVets = () => {

        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
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

    const fetchRaces = () => {

        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }
        const request = new Request("http://192.168.1.81:8888/api/races", config);
        fetch(request)
            .then(response => response.json())
            .then(data => { handleRaces(data) })
            .catch(e => {
                console.log(e)
                // localStorage.clear();
            });
    }

    const fetchCustomers = () => {

        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }
        const request = new Request("http://192.168.1.81:8888/api/customers_all", config);
        fetch(request)
            .then(response => response.json())
            .then(data => { handleCustomers(data) })
            .catch(e => {
                console.log(e)
                // localStorage.clear();
            });
    }
    
    const handleData = (data) => {
    
        document.getElementById("customer-picker").value = `${data.responsibleId}`;
        document.getElementById("patient-name").value = data.name;
        let weight;
        data.weight === null ? weight = '0' : weight = data.weight;
        document.getElementById("patient-weight").value = weight;
        document.getElementById("patient-info").value = data.info;
        document.getElementById("patient-birthday").value = data.birthday.date.split(' ')[0];
        document.getElementById("patient-chip").value = data.chip;
        document.getElementById("patient-color").value = data.color;
        document.getElementById("patient-eyes").value = data.eyes;

        document.getElementById(`${data.gender}`).selected = true;       
        document.getElementById(`vet-${data.vet}`).selected = true;       
        document.getElementById(`spe-${data.species}`).selected = true;
        document.getElementById(`ste-${data.sterilised}`).selected = true;
        if (data.race) document.getElementById(`race-${data.race}`).selected = true;

    }

    const handleVets = (data) => {
        
        let datalist = '<option selected>Select...</option>';
        data.forEach(v => {
            const op =
                `
                    <option id="vet-${v.id}" value="${v.id}">${v.name}</ option>
                `
            datalist += op;
        });
        document.getElementById("vet-picker").innerHTML = datalist;
        fetchPatient();


    }

    const handleSpecies = (data) => {
        
        let datalist = '<option>Select...</option>';
        data.forEach(s => {
            const op =
                `
                    <option id="spe-${s.id}" value="${s.id}">${s.name}</ option>
                `
            datalist += op;
        });
        document.getElementById("species-picker").innerHTML = datalist;

    }

    const handleRaces = (data) => {
        
        let datalist = '<option selected>Select...</option>';
        data.forEach(r => {
            const op =
                `
                    <option id="race-${r.id}" value="${r.id}">${r.name}</ option>
                `   
            datalist += op;
        });
        document.getElementById("race-picker").innerHTML = datalist;

    }

    const handleCustomers = (data) => {

        let datalist =
            `
                <option selected>Select...</option>
                <option id="cus-new" value="new" class="fw-bold bg-light">Nuevo Cliente</option>
            `;
        data.forEach(c => {
            const op =
                `
                    <option id="cus-${c.id}" value="${c.id}">${c.name}</ option>
                `
            datalist += op;
        });
        document.getElementById("customer-picker").innerHTML = datalist;

    }

    const handleAlert = () => {
      
        const alert = document.getElementById("completedAlert");
        alert.classList.contains('d-none') ? alert.classList.remove('d-none') : alert.classList.add('d-none')
        
    }

    return (
        <div className="container">
            <FormAlerts />
            <div className="d-flex flex-row justify-content-between">
                <form onSubmit={handlePatient}>
                    <PatientForm />
                    <FormModal />

                </form>
            </div>

        </div>
    )
}
export default Patient;