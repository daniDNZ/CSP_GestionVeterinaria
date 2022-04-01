import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/visits.css';

function NewPatient() {
    const { id } = useParams();
    let arrData;


    useEffect(() => {

        fetchSpecies();
        fetchRaces();
        fetchVets();
        fetchCustomers();


    }, [])

    const handlePatient = (e) => {
        e.preventDefault();
        const fData = e.target;
        let data;

        fData.customer.value == "new" ? addCustomer(fData) : addPatient(fData, data);
        
    }
    
    const addPatient = (fData, id) => {
        let customer;
        const birthday = `${fData.birthday.value.split('T')[0]}`

        id ? customer = id : customer = fData.customer.value.split(' ')[0]

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
            customer: customer,
            birthday: birthday
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
        const request = new Request("http://192.168.1.81:8888/api/patient/add", config);
        fetch(request)
            .then(response => response.json())
            .then(data => { 
                handleAlert(true) 
                handleClean(fData);
            })
            .catch(e => {
                handleAlert(false)
                console.log(e, 'Esto es un error')
                // localStorage.clear();
                // window.location = '/turdus/login'
            })
    }

    const addCustomer = (fData) => {
        const bodyData = {
            email: fData.cEmail.value,
            dni: fData.cDni.value,
            name: fData.cName.value,
            last_name: fData.cLastName.value,
            postal_code: fData.cPc.value,
            address: fData.cAddress.value,
            phone: fData.cPhone.value,
            info: fData.cInfo.value

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
        const request = new Request("http://192.168.1.81:8888/api/customer/add", config);
        fetch(request)
            .then(response => response.json())
            .then(data => { 
                addPatient(fData, data.id) 
            })
            .catch(e => {
                handleAlert(false);
                console.log(e, 'Esto es un error')
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

    const handleAlert = (success) => {
        let alert;
        if (success) {
            alert = document.getElementById("completedAlert");
        } else {
            alert = document.getElementById("failedAlert");
        }
        alert.classList.contains('d-none') ? alert.classList.remove('d-none') : alert.classList.add('d-none')

        
    }

    const closeAlert = (e) => {
        e.preventDefault();
        
        // const alert = e.target.parentElement;
        // alert.classList.contains('d-none') ? alert.classList.remove('d-none') : alert.classList.add('d-none');

    }

    const handleClean = (fData) => {
        let elements = fData.elements;
        // console.log(elements)
        [...elements].forEach(e => {
            e.value = '';
            console.log(e.value)
        });
    }

    const captureCustomer = (e) => {
        e.preventDefault();

        if (e.target.value == "new") {
            document.getElementById("newCustomerForm").classList.remove('d-none');
        } else {
            document.getElementById("newCustomerForm").classList.add('d-none');
        }
    }

    return (
        <div className="container">
            <div className="alert alert-success alert-dismissible fade d-none show" tabIndex="-1" id="completedAlert" role="alert" aria-hidden="true">

                <strong>Creado con éxito!</strong>
                <button type="button" className="btn-close" onClick={closeAlert} aria-label="Close"></button>

            </div>
            <div className="alert alert-danger alert-dismissible fade d-none show" tabIndex="-1" id="failedAlert" role="alert" aria-hidden="true">

                <strong>Error al crear, compruebe los campos</strong>
                <button type="button" className="btn-close" onClick={closeAlert} aria-label="Close"></button>

            </div>
            <div className="d-flex flex-row justify-content-between">
                <form id="newPatientForm" onSubmit={handlePatient}>
                    <div className="row">
                        <h3>Nuevo Paciente</h3>
                        <div className="mb-3 col-auto">
                            <label htmlFor="vet-picker" className="form-label">Veterinaria/o:</label>
                            <select type="text" id="vet-picker" name="vet" className="form-select" ></select>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="customer-picker" className="form-label">Cliente:</label>
                            <select type="text" id="customer-picker" name="customer" className="form-select" onInput={captureCustomer}></select>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-name" className="form-label">Nombre:</label>
                            <input type="text" id="patient-name" name="name" className="form-control" />
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
                            <select type="text" id="gender-picker" name="gender" className="form-select" >
                                <option id="Female" value="Female">F</option>
                                <option id="Male" value="Male">M</option>
                            </select>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-sterilised-picker" className="form-label">Esterilizad@:</label>
                            <select type="text" id="sterilised-picker" name="sterilised" className="form-select" >
                                <option id="ste-false" value='0'>No</option>
                                <option id="ste-true" value='1'>Sí</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">


                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-birthday" className="form-label">Nacimiento:</label>
                            <input type="date" id="patient-birthday" name="birthday" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-weight" className="form-label">Peso:</label>
                            <input type="text" id="patient-weight" name="weight" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-chip" className="form-label">CHIP:</label>
                            <input type="text" id="patient-chip" name="chip" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-color" className="form-label">Color:</label>
                            <input type="text" id="patient-color" name="color" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-eyes" className="form-label">Ojos:</label>
                            <input type="text" id="patient-eyes" name="eyes" className="form-control" />
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label htmlFor="patient-info" className="form-label">Información:</label>
                            <textarea rows="5" id="patient-info" name="info" className="form-control" />
                        </div>
                    </div>
                    <hr />
                    <div id="newCustomerForm" className="row d-none">
                        <h3>Nuevo Cliente</h3>
                        <div className="mb-3 col-auto">
                            <label htmlFor="customer-name" className="form-label">Nombre:</label>
                            <input type="text" id="customer-name" name="cName" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="customer-lastname" className="form-label">Apellidos:</label>
                            <input type="text" id="customer-surname" name="cLastName" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="customer-phone" className="form-label">Teléfono:</label>
                            <input type="text" id="customer-phone" name="cPhone" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="customer-email" className="form-label">Email:</label>
                            <input type="email" id="customer-email" name="cEmail" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="customer-dni" className="form-label">DNI:</label>
                            <input type="text" id="customer-dni" name="cDni" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="customer-PC" className="form-label">CP:</label>
                            <input type="text" id="customer-PC" name="cPc" className="form-control" />
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="customer-address" className="form-label">Dirección:</label>
                            <input type="text" id="customer-address" name="cAddress" className="form-control" />
                        </div>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="customer-info" className="form-label">Info:</label>
                                <textarea rows="5" id="customer-info" name="cInfo" className="form-control" />
                            </div>
                        </div>
                    </div>
                    {/* Button trigger modal  */}
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#warningModal">Añadir</button>
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
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Añadir</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>


        </div>
    )
}
export default NewPatient;