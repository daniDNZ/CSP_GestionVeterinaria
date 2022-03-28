import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/visits.css';
function Visit() {
    const { id } = useParams();
    let arrData;


    useEffect(() => {

        fetchVisit();


    }, [])

    const handleVisit = (e) => {
        e.preventDefault();
        // Enviar datos y hacer update o insert
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

    const handleData = (data) => {
        let curr = new Date(data.date_time.date)
        let date = curr.toISOString().slice(0, 16)
        document.getElementById("visit-datetime").value = date;

        
        // document.getElementById("vet-picker").value = 'loreto';
        
        const checkbox = document.getElementById("visit-completed")
        data.done == true ? checkbox.checked = true : checkbox.checked = false

        document.getElementById("visit-customer").value = data.customer;
        document.getElementById("visit-category").value = data.category;
        document.getElementById("visit-patient-name").value = data.patient;
        document.getElementById("visit-patient-species").value = data.species;
        document.getElementById("visit-patient-race").value = data.race;
        document.getElementById("visit-patient-weight").value = data.weight;
        document.getElementById("visit-description").value = data.description;
        document.getElementById("visit-treatment").value = data.treatment;

    }

    const captureDate = (e) => {
        e.preventDefault();
        console.log(e.target.value)
    }

    const captureCompleted = (e) => {
        e.preventDefault();
        console.log(e.target.checked)
        
    }

    return (
        <div className="container">
            <div className="d-flex flex-row justify-content-between">
                <form onSubmit={handleVisit}>
                    <div className="row">
                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-datetime" className="form-label">Fecha/Hora:</label>
                            <input type="datetime-local" id="visit-datetime" className="form-control date-input" onInput={captureDate} />
                        </div>

                        <div className="mb-3 col-auto">
                            <label htmlFor="vet-picker" className="form-label">Veterinaria/o:</label>
                            <select type="text" id="vet-picker" className="form-select" ></select>
                        </div>
                        <div className="mb-3 col-auto form-check-inline">
                            <div className="form-check my-auto">
                                <label htmlFor="visit-completed" className="form-check-label">Completada</label>
                                <input type="checkbox" id="visit-completed" className="form-check-input" onInput={captureCompleted}/>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">

                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-customer" className="form-label">Cliente:</label>
                            <input type="text" id="visit-customer" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-category" className="form-label">Categoría:</label>
                            <input type="text" id="visit-category" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-patient-name" className="form-label">Paciente:</label>
                            <input type="text" id="visit-patient-name" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-patient-species" className="form-label">Especie:</label>
                            <input type="text" id="visit-patient-species" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-patient-race" className="form-label">Raza:</label>
                            <input type="text" id="visit-patient-race" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-patient-weight" className="form-label">Peso:</label>
                            <input type="text" id="visit-patient-weight" className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="visit-description" className="form-label">Descripción:</label>
                            <textarea rows="5" id="visit-description" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="visit-treatment" className="form-label">Tratamiento:</label>
                            <textarea rows="5" id="visit-treatment" className="form-control" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </div>
        </div>
    )
}
export default Visit;