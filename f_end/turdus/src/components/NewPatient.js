import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/visits.css';
import { addUpdatePatient, getVets, getCustomers, getSpecies, getRaces, findRaces } from "./ApiFetch";
import { handleDatalist } from "./Handlers";
import { FormGenerator, FormArray, CustomerForm, FormAlerts, FormModal, PatientForm, handleClean } from "./FormsController";

function NewPatient() {

    // useEffect(() => {

    //     fetchSpecies();
    //     fetchRaces();
    //     fetchVets();
    //     fetchCustomers();

    //     // Cargamos los listeners después de cargar los componentes
    //     document.getElementById('customer-picker').addEventListener('input', captureCustomer);

    // }, [])
    useEffect(() => {
        getVets(handleDatalist, 'vetPicker');
        getCustomers(handleDatalist, 'customerPicker');
        getSpecies(handleDatalist, 'speciesPicker');
        getRaces(handleDatalist, 'racePicker');
        document.getElementById('auto-form').addEventListener('submit', handleData);
        document.getElementById('speciesPicker').addEventListener('input', filterRaces);
        document.getElementById('selectForm').addEventListener('input', changeForm);

    }, []);

    const handleData = (e) => {
        e.preventDefault();
        const fData = e.target;
        addUpdatePatient(fData, 'add');
        handleClean(fData);
    }

    const filterRaces = (e) => {
        e.preventDefault();
        findRaces(handleDatalist, 'racePicker', e.target.value);
    }

    // const handlePatient = (e) => {
    //     e.preventDefault();
    //     const fData = e.target;
    //     let data;

    //     fData.customer.value == "new" ? addCustomer(fData) : addPatient(fData, data);

    // }

    // const addPatient = (fData, id) => {
    //     let customer;
    //     const birthday = `${fData.birthday.value.split('T')[0]}`

    //     id ? customer = id : customer = fData.customer.value.split(' ')[0]

    //     const bodyData = {
    //         id: id,
    //         name: fData.name.value,
    //         info: fData.info.value,
    //         chip: fData.chip.value,
    //         eyes: fData.eyes.value,
    //         color: fData.color.value,
    //         weight: fData.weight.value,
    //         gender: fData.gender.value,
    //         sterilised: fData.sterilised.value,
    //         vet: fData.vet.value,
    //         race: fData.race.value,
    //         species: fData.species.value,
    //         customer: customer,
    //         birthday: birthday
    //     }
    //     const config = {
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(bodyData)
    //     }
    //     const request = new Request("http://192.168.1.81:8888/api/patient/add", config);
    //     fetch(request)
    //         .then(response => response.json())
    //         .then(data => {
    //             handleAlert(true)
    //             handleClean(fData);
    //         })
    //         .catch(e => {
    //             handleAlert(false)
    //             console.log(e, 'Esto es un error')
    //             // localStorage.clear();
    //             // window.location = '/turdus/login'
    //         })
    // }

    // const addCustomer = (fData) => {
    //     const bodyData = {
    //         email: fData.cEmail.value,
    //         dni: fData.cDni.value,
    //         name: fData.cName.value,
    //         last_name: fData.cLastName.value,
    //         postal_code: fData.cPc.value,
    //         address: fData.cAddress.value,
    //         phone: fData.cPhone.value,
    //         info: fData.cInfo.value

    //     }
    //     console.log(bodyData)
    //     const config = {
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(bodyData)
    //     }
    //     const request = new Request("http://192.168.1.81:8888/api/customer/add", config);
    //     fetch(request)
    //         .then(response => response.json())
    //         .then(data => {
    //             addPatient(fData, data.id)
    //         })
    //         .catch(e => {
    //             handleAlert(false);
    //             console.log(e, 'Esto es un error')
    //             // localStorage.clear();
    //             // window.location = '/turdus/login'
    //         })
    // }

    // const fetchVets = () => {

    //     const config = {
    //         method: 'GET',
    //         mode: 'cors',
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     const request = new Request("http://192.168.1.81:8888/api/vets", config);
    //     fetch(request)
    //         .then(response => response.json())
    //         .then(data => { handleVets(data) })
    //         .catch(e => {
    //             console.log(e)
    //             // localStorage.clear();
    //         });
    // }

    // const fetchCustomers = () => {

    //     const config = {
    //         method: 'GET',
    //         mode: 'cors',
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     const request = new Request("http://192.168.1.81:8888/api/customers_all", config);
    //     fetch(request)
    //         .then(response => response.json())
    //         .then(data => { handleCustomers(data) })
    //         .catch(e => {
    //             console.log(e)
    //             // localStorage.clear();
    //         });
    // }

    // const fetchSpecies = () => {

    //     const config = {
    //         method: 'GET',
    //         mode: 'cors',
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     const request = new Request("http://192.168.1.81:8888/api/species", config);
    //     fetch(request)
    //         .then(response => response.json())
    //         .then(data => { handleSpecies(data) })
    //         .catch(e => {
    //             console.log(e)
    //             // localStorage.clear();
    //         });
    // }

    // const fetchRaces = () => {

    //     const config = {
    //         method: 'GET',
    //         mode: 'cors',
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     const request = new Request("http://192.168.1.81:8888/api/races", config);
    //     fetch(request)
    //         .then(response => response.json())
    //         .then(data => { handleRaces(data) })
    //         .catch(e => {
    //             console.log(e)
    //             // localStorage.clear();
    //         });
    // }

    // const handleVets = (data) => {

    //     let datalist = '<option selected>Select...</option>';
    //     data.forEach(v => {
    //         const op =
    //             `
    //                 <option id="vet-${v.id}" value="${v.id}">${v.name}</ option>
    //             `
    //         datalist += op;
    //     });
    //     document.getElementById("vet-picker-list").innerHTML = datalist;
    // }

    // const handleCustomers = (data) => {

    //     let datalist =
    //         `
    //             <option selected>Select...</option>
    //             <option id="cus-new" value="new" class="fw-bold bg-light">Nuevo Cliente</option>
    //         `;
    //     data.forEach(c => {
    //         const op =
    //             `
    //                 <option id="cus-${c.id}" value="${c.id}">${c.name}</ option>
    //             `
    //         datalist += op;
    //     });
    //     document.getElementById("customer-picker").innerHTML = datalist;

    // }

    // const handleSpecies = (data) => {

    //     let datalist = '<option>Select...</option>';
    //     data.forEach(s => {
    //         const op =
    //             `
    //                 <option id="spe-${s.id}" value="${s.id}">${s.name}</ option>
    //             `
    //         datalist += op;
    //     });
    //     document.getElementById("species-picker").innerHTML = datalist;

    // }

    // const handleRaces = (data) => {

    //     let datalist = '<option selected>Select...</option>';
    //     data.forEach(r => {
    //         const op =
    //             `
    //                 <option id="race-${r.id}" value="${r.id}">${r.name}</ option>
    //             `
    //         datalist += op;
    //     });
    //     document.getElementById("race-picker").innerHTML = datalist;

    // }

    // const handleAlert = (success) => {

    //     let alert;
    //     if (success) {
    //         alert = document.getElementById("completedAlert");
    //     } else {
    //         alert = document.getElementById("failedAlert");
    //     }
    //     alert.classList.contains('d-none') ? alert.classList.remove('d-none') : alert.classList.add('d-none')

    // }

    // const handleClean = (fData) => {
    //     let elements = fData.elements;
    //     // console.log(elements)
    //     [...elements].forEach(e => {
    //         e.value = '';
    //         console.log(e.value)
    //     });
    // }

    // const captureCustomer = (e) => {
    //     e.preventDefault();

    //     if (e.target.value == "new") {
    //         document.getElementById("newCustomerForm").classList.remove('d-none');
    //     } else {
    //         document.getElementById("newCustomerForm").classList.add('d-none');
    //     }
    // }

    const changeForm = (e) => {
        e.preventDefault();
        console.log(e.target.value)

        arrForm = FormArray(e.target.value, {});

        generateForm();
    }
    // HAY QUE GENERAR EL FORMULARIO SEGÚN EL SELECT. ESTO NO FUNCIONA MUY BIEN.
    const generateForm = () => {
        document.getElementById('formGeneratorContainer').innerHTML = <FormGenerator arrForm={arrForm} />;
    }

    let arrForm = FormArray('patient', {});

    return (
        <>
            <select id="selectForm" className="form-select">
                <option value="patient">Nuevo Paciente</option>
                <option value="customer">Nuevo Cliente</option>
                <option value="both" >Nuevo Paciente + Cliente</option>
            </select>
            <hr />
            <div id="formGeneratorContainer">
                <FormGenerator arrForm={arrForm} />
            </div>
        </>
    )
}
export default NewPatient;