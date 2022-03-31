import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/visits.css';

function Patient() {
    const { id } = useParams();
    let arrData;


    useEffect(() => {

        fetchVets();
        fetchSpecies();


    }, [])

    const handlePatient = (e) => {
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

    const handleData = (data) => {
    
        document.getElementById("patient-customer").value = data.responsible;
        document.getElementById("patient-name").value = data.name;
        document.getElementById("race-picker").value = data.race;
        let weight;
        data.weight === null ? weight = '0' : weight = data.weight;
        document.getElementById("patient-weight").value = weight;
        document.getElementById("patient-info").value = data.info;

        document.getElementById(`vet${data.vet}`).selected = true;       
        document.getElementById(`spe${data.species}`).selected = true;


    }

    const handleVets = (data) => {
        
        let datalist = '<option>Select...</option>';
        data.forEach(v => {
            const op =
                `
                <option id="vet${v.id}" value="${v.id}">${v.name}</ option>

            `
            datalist += op;
        });
        document.getElementById("vet-picker").innerHTML = datalist;
        fetchPatient();


    }
// SELECCIONAR LA ESPECIE A PARTIR DEL PACIENTE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const handleSpecies = (data) => {
        
        let datalist = '<option>Select...</option>';
        data.forEach(s => {
            const op =
                `
                <option id="spe${s.id}" value="${s.name}">${s.name}</ option>

            `
            datalist += op;
        });
        document.getElementById("species-picker").innerHTML = datalist;

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
            <div className="alert alert-success alert-dismissible fade d-none show" tabIndex="-1" id="completedAlert" role="alert" aria-hidden="true">

                <strong>Visita actualizada</strong>
                <button type="button" className="btn-close" onClick={handleAlert} aria-label="Close"></button>

            </div>
            <div className="d-flex flex-row justify-content-between">
                <form onSubmit={handlePatient}>
                    <div className="row">
                        <div className="mb-3 col-auto">
                            <label htmlFor="vet-picker" className="form-label">Veterinaria/o:</label>
                            <select type="text" id="vet-picker" name="vet" className="form-select" ></select>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="species-picker" className="form-label">Especie:</label>
                            <select type="text" id="species-picker" name="species" className="form-select" >
                            </select>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="race-picker" className="form-label">Raza:</label>
                            <select type="text" id="race-picker" name="race" className="form-select" ></select>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="gender-picker" className="form-label">Género:</label>
                            <select type="text" id="gender-picker" name="gender" className="form-select" ></select>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-sterilised-picker" className="form-label">Esterilizad@:</label>
                            <select type="text" id="race-picker" name="sterilised" className="form-select" ></select>
                        </div>
                    </div>
                    <hr /> 
                    <div className="row">

                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-name" className="form-label">Nombre:</label>
                            <input type="text" id="patient-name" name="patientName" className="form-control"/>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-customer" className="form-label">Cliente:</label>
                            <input type="text" id="patient-customer" name="customer" className="form-control"/>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-age" className="form-label">Edad:</label>
                            <input type="text" id="patient-age" name="age" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-weight" className="form-label">Peso:</label>
                            <input type="text" id="patient-weight" name="patientWeight" className="form-control"/>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-chip" className="form-label">CHIP:</label>
                            <input type="text" id="patient-chip" name="patientChip" className="form-control"/>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-chip" className="form-label">Color:</label>
                            <input type="text" id="patient-chip" name="patientChip" className="form-control"/>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-chip" className="form-label">Ojos:</label>
                            <input type="text" id="patient-chip" name="patientChip" className="form-control"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="patient-info" className="form-label">Información:</label>
                            <textarea rows="5" id="patient-info" name="info" className="form-control" />
                        </div>
                    </div>
                    {/* Button trigger modal  */}
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#warningModal">Actualizar</button>
                    {/* Modal  */}
                    <div className="modal fade" id="warningModal" tabIndex="-1" aria-labelledby="warningModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="warningModalLabel">¿Actualizar la visita?</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Esta acción no se puede deshacer
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Actualizar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}
export default Patient;