import jwt_decode from "jwt-decode";
import '../css/visits.css';
function Visits() {
    let arrData;
    const handleVisit = (e) => {
        e.preventDefault();
        // Enviar datos y hacer update o insert
    }

    const handleData = (data) => {
        let datalist;
        arrData = data;
        data.forEach(visit => {
            const option = 
            `
                <option value="${visit.id} ${visit.patient}" />
            `
            datalist += option;
        });
        document.getElementById("visit-list-options").innerHTML = datalist;
    }

    const captureDate = (e) => {
        e.preventDefault();
        const day = e.target.value;
        const bodyData = {
            username: jwt_decode(localStorage.getItem('token')).username,
            day: day
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
        fetch(request)
            .then(response => response.json())
            .then(data => { handleData(data) } )
            .catch(e => {
                console.log(e)
                // localStorage.clear();
                // window.location = '/turdus/login'
            })

    }
    const handleVisitInfo = (e) => {
        e.preventDefault();
        let visit;
        arrData.forEach(v => {
            if (v.id == e.target.value.split(' ')[0]) visit = v;
        });
        document.getElementById("patient-vet").value = visit.vet;
        // CONTINUAR RELLENANDO CAMPOS
    }
    return (
        <div className="container">
            <div className="d-flex flex-row justify-content-between">
                <form onSubmit={handleVisit}>
                    <div className="row">
                        <div className="mb-3 col-auto">
                            <label htmlFor="date-picker" className="form-label">Día:</label>
                            <input type="date" id="" className="form-control date-input" onChange={captureDate}/>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-picker" className="form-label">Visita:</label>
                            <input list="visit-list-options" name="visit-picker" className="form-control" onChange={handleVisitInfo}></input>
                            <datalist id="visit-list-options">
                                {/* <option value="34 Romo" />
                                <option value="35 Palo" />
                                <option value="36 Pipo" />
                                <option value="37 pepo" />
                                <option value="38 yupu" /> */}
                            </datalist>
                        </div>
                        
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-vet" className="form-label">Veterinaria/o:</label>
                            <input type="text" id="patient-vet" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto form-check-inline">
                            <div className="form-check form-switch my-auto">
                                <label htmlFor="visit-completed" className="form-check-label">Completada</label>
                                <input type="checkbox" id="visit-completed" className="form-check-input form-control" />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-datetime" className="form-label">Fecha/Hora:</label>
                            <input type="datetime-local" name="visit-datetime" className="form-control date-input" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="customer-name" className="form-label">Cliente:</label>
                            <input type="text" name="customer-name" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="visit-category" className="form-label">Categoría:</label>
                            <input type="text" name="visit-category" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-name" className="form-label">Paciente:</label>
                            <input type="text" name="patient-name" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-species" className="form-label">Especie:</label>
                            <input type="text" name="patient-species" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-race" className="form-label">Raza:</label>
                            <input type="text" name="patient-race" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-weight" className="form-label">Peso:</label>
                            <input type="text" name="patient-weight" className="form-control" />
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
export default Visits;