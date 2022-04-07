import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/visits.css';
import { FormAlerts, FormModal } from "./FormController";
function Visit() {
    const { id } = useParams();
    let arrData;


    useEffect(() => {

        fetchVets();


    }, [])

    const handleVisit = (e) => {
        e.preventDefault();
        handleAlert();
        const fData = e.target;
        const datetime = `${fData.datetime.value.split('T')[0]} ${fData.datetime.value.split('T')[1]}:00`

        // Enviar datos y hacer update o insert
        const bodyData = {
            id: id,
            vet: fData.vet.value,
            patientName: fData.patientName.value,
            patientSpecies: fData.patientSpecies.value,
            patientRace: fData.patientRace.value,
            patientWeight: fData.patientWeight.value,
            customer: fData.customer.value,
            category: fData.category.value,
            date_time: datetime,
            done: fData.completed.checked,
            description: fData.description.value,
            treatment: fData.treatment.value
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
        const request = new Request("http://192.168.1.81:8888/api/visit/update", config);
        fetch(request)
            .then(response => response.json())
            .then(data => { console.log(data) })
            .catch(e => {
                console.log(e, 'Esto es un error')
                // localStorage.clear();
                // window.location = '/turdus/login'
            })

    }

    const fetchVisit = () => {
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
        const request = new Request("http://192.168.1.81:8888/api/visit", config);
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

    const handleData = (data) => {
        let curr = data.date_time.date       
        let date = curr.slice(0, 16).replace(' ', 'T')
        document.getElementById("visit-datetime").value = date;

        const checkbox = document.getElementById("visit-completed")
        data.done == true ? checkbox.checked = true : checkbox.checked = false

        document.getElementById("visit-customer").value = data.customer;
        document.getElementById("visit-category").value = data.category;
        document.getElementById("visit-patient-name").value = data.patient;
        document.getElementById("visit-patient-species").value = data.species;
        document.getElementById("visit-patient-race").value = data.race;
        let weight;
        data.weight === null ? weight = '0' : weight = data.weight;
        document.getElementById("visit-patient-weight").value = weight;
        document.getElementById("visit-description").value = data.description;
        document.getElementById("visit-treatment").value = data.treatment;

        document.getElementById(`${data.vet}`).selected = true;

    }

    const handleVets = (data) => {
        
        let datalist = '<option>Select...</option>';
        data.forEach(v => {
            const op =
                `
                <option id="${v.id}" value="${v.id}">${v.name}</ option>

            `
            datalist += op;
        });
        document.getElementById("vet-picker").innerHTML = datalist;
        fetchVisit();


    }

    const captureDate = (e) => {
        e.preventDefault();
        console.log(e.target.value)
    }

    const captureCompleted = (e) => {
        e.preventDefault();
        console.log(e.target.checked)

    }

    const handleAlert = () => {
      
        const alert = document.getElementById("completedAlert");
        alert.classList.contains('d-none') ? alert.classList.remove('d-none') : alert.classList.add('d-none')
        
    }

    return (
        <div className="container">
            <FormAlerts />
            <div className="d-flex flex-row justify-content-between">
                <form onSubmit={handleVisit}>
                    <div className="row">
                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-datetime" className="form-label">Fecha/Hora:</label>
                            <input type="datetime-local" id="visit-datetime" name="datetime" className="form-control date-input" onChange={captureDate} />
                        </div>

                        <div className="mb-3 col-auto">
                            <label htmlFor="vet-picker" className="form-label">Veterinaria/o:</label>
                            <select type="text" id="vet-picker" name="vet" className="form-select" ></select>
                        </div>
                        <div className="mb-3 col-auto form-check-inline">
                            <div className="form-check my-auto">
                                <label htmlFor="visit-completed" className="form-check-label">Completada</label>
                                <input type="checkbox" id="visit-completed" name="completed" className="form-check-input" onInput={captureCompleted} />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">

                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-customer" className="form-label">Cliente:</label>
                            <input type="text" id="visit-customer" name="customer" className="form-control" disabled readOnly/>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-category" className="form-label">Categoría:</label>
                            <input type="text" id="visit-category" name="category" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-patient-name" className="form-label">Paciente:</label>
                            <input type="text" id="visit-patient-name" name="patientName" className="form-control" disabled readOnly/>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-patient-species" className="form-label">Especie:</label>
                            <input type="text" id="visit-patient-species" name="patientSpecies" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-patient-race" className="form-label">Raza:</label>
                            <input type="text" id="visit-patient-race" name="patientRace" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-patient-weight" className="form-label">Peso:</label>
                            <input type="text" id="visit-patient-weight" name="patientWeight" className="form-control"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="visit-description" className="form-label">Descripción:</label>
                            <textarea rows="5" id="visit-description" name="description" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="visit-treatment" className="form-label">Tratamiento:</label>
                            <textarea rows="5" id="visit-treatment" name="treatment" className="form-control" />
                        </div>
                    </div>
                    <FormModal />

                </form>
            </div>

        </div>
    )
}
export default Visit;