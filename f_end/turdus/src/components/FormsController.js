import { useEffect } from "react";
import { fetchVets } from "./ApiFetch"

function FormModal() {
    return (
        <>
            {/* Button trigger modal  */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#warningModal">Añadir</button>
            {/* Modal  */}
            <div className="modal fade" id="warningModal" tabIndex="-1" aria-labelledby="warningModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="warningModalLabel">¿Quieres actualizar?</h5>
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
        </>
    )
}

function FormAlerts() {
    const closeAlert = (e) => {
        e.preventDefault();
    
        const alert = e.target.parentElement;
        alert.classList.contains('d-none') ? alert.classList.remove('d-none') : alert.classList.add('d-none');
    
    }
    useEffect(() => {
        document.getElementById('alert-success-close').addEventListener('click', closeAlert);
        document.getElementById('alert-danger-close').addEventListener('click', closeAlert);
    }, [])
    
    return (
        <>
            <div className="alert alert-success alert-dismissible fade d-none show" tabIndex="-1" id="completedAlert" role="alert" aria-hidden="true">

                <strong>Creado con éxito!</strong>
                <button type="button" id="alert-success-close" className="btn-close" aria-label="Close"></button>

            </div>
            <div className="alert alert-danger alert-dismissible fade d-none show" tabIndex="-1" id="failedAlert" role="alert" aria-hidden="true">

                <strong>Error al crear, compruebe los campos</strong>
                <button type="button" id="alert-danger-close" className="btn-close" aria-label="Close"></button>

            </div>
        </>
    )
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

const handleClean = (fData) => {
    let elements = fData.elements;
    // console.log(elements)
    [...elements].forEach(e => {
        e.value = '';
    });
}


function CustomerForm() {
    return (
        <>
            <div className="row">
                <div className="mb-3 col-auto">
                    <label htmlFor="customer-name" className="form-label">Nombre:</label>
                    <input type="text" id="customer-name" name="cName" className="form-control" />
                </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="customer-lastname" className="form-label">Apellidos:</label>
                    <input type="text" id="customer-lastname" name="cLastName" className="form-control" />
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
            </div>
            <div className="row">
                <div className="mb-3">
                    <label htmlFor="customer-info" className="form-label">Info:</label>
                    <textarea rows="5" id="customer-info" name="cInfo" className="form-control" />
                </div>
            </div>
        </>
    )
}

function PatientForm() {
    
    return (
        <>
            <div className="row">

                <div className="mb-3 col-auto">
                    <label htmlFor="vet-picker" className="form-label">Veterinaria/o:</label>
                    <input type="search" list="vet-picker-list" id="vet-picker" name="vet" className="form-control" ></input>
                    <datalist id="vet-picker-list"></datalist>
               </div>
                <div className="mb-3 col-auto">
                    <label htmlFor="customer-picker" className="form-label">Cliente:</label>
                    <select type="text" id="customer-picker" name="customer" className="form-select"></select>
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
        </>
    )
}

function FormArray 
( 
    selector, 
    { 
        cName = '', 
        cLastname = '', 
        cPhone = '', 
        cEmail = '', 
        cDni = '',
        cPc = '',
        cAddress = '',
        cInfo = '',
        pVet = '',
        cId = '',
        pName = '',
        pSpecies = '',
        pRace = '',
        pGender = '',
        pSterilised = '',
        pBirthday = '',
        pWeight = '',
        pChip = '',
        pColor = '',
        pEyes = '',
        pInfo = '',
    } = {},
) {
    let arrSpecies = ['Perro', 'Gato', 'ninfa', 'Pogona', 'tortuga', 'erizo', 'camaleón'];
    let arrGender = ['Female', 'Male'];
    let arrVets = ['Vet1', 'Vet2', 'Vet3'];
    let arrCustomers = ['Customer1', 'Customer2', 'Customer3'];
    let arrRaces = ['Race1', 'Race2', 'Race3'];

   
    
    let arrForm;

    
    const patientForm = [
        {
            label: '',
            id: '',
            tag: 'h3',
            type: '',
            value: 'Paciente',
        },
        {
            label: 'Veterinaria/o',
            id: 'vetPicker',
            tag: 'input',
            type: 'search',
            value: pVet,
            datalist: arrVets
        },
        {
            label: 'Cliente',
            id: 'customerPicker',
            tag: 'input',
            type: 'search',
            value: cId,
            datalist: arrCustomers
        },
        {
            label: 'Nombre paciente',
            id: 'patientName',
            tag: 'input',
            type: 'text',
            value: pName
        },
        {
            label: 'Especie',
            id: 'speciesPicker',
            tag: 'input',
            type: 'search',
            value: pSpecies,
            datalist: arrSpecies
        },
        {
            label: 'Raza',
            id: 'racePicker',
            tag: 'input',
            type: 'search',
            value: pRace,
            datalist: arrRaces
        },
        {
            label: 'Género',
            id: 'genderPicker',
            tag: 'input',
            type: 'search',
            value: pGender,
            datalist: [{username: "Male", name: "Macho"}, {username: "Female", name: "Hembra"}]
        },
        {
            label: 'Esterilizad@',
            id: 'sterilisedPicker',
            tag: 'input',
            type: 'search',
            value: pSterilised,
            datalist: [{username: "false", name:"No"}, {username: "true", name: "Sí"}]
        },
        {
            label: 'Cumpleaños',
            id: 'patientBirthday',
            tag: 'input',
            type: 'date',
            value: pBirthday
        },
        {
            label: 'Peso',
            id: 'patientWeight',
            tag: 'input',
            type: 'text',
            value: pWeight
        },
        {
            label: 'CHIP',
            id: 'patientChip',
            tag: 'input',
            type: 'text',
            value: pChip
        },
        {
            label: 'Color',
            id: 'patientColor',
            tag: 'input',
            type: 'text',
            value: pColor
        },
        {
            label: 'Ojos',
            id: 'patientEyes',
            tag: 'input',
            type: 'text',
            value: pEyes
        },
        {
            label: 'Información paciente',
            id: 'patientInfo',
            tag: 'textarea',
            type: '',
            value: pInfo,
        },
    ]

    const customerForm = [
        {
            label: '',
            id: '',
            tag: 'h3',
            type: '',
            value: 'Cliente'
        },
        {
            label: 'Nombre cliente',
            id: 'customerName',
            tag: 'input',
            type: 'text',
            value: cName
        },
        {
            label: 'Apellidos cliente',
            id: 'customerLastname',
            tag: 'input',
            type: 'text',
            value: cLastname
        },
        {
            label: 'Teléfono cliente',
            id: 'customerPhone',
            tag: 'input',
            type: 'text',
            value: cPhone
        },
        {
            label: 'Email',
            id: 'customerEmail',
            tag: 'input',
            type: 'email',
            value: cEmail
        },
        {
            label: 'DNI',
            id: 'customerDni',
            tag: 'input',
            type: 'text',
            value: cDni
        },
        {
            label: 'CP',
            id: 'customerPc',
            tag: 'input',
            type: 'text',
            value: cPc
        },
        {
            label: 'Dirección',
            id: 'customerAddress',
            tag: 'input',
            type: 'text',
            value: cAddress
        },
        {
            label: 'Información cliente',
            id: 'customerInfo',
            tag: 'textarea',
            type: '',
            value: cInfo,
        },
    ]

    let separator = [
        {
            label: '',
            id: '',
            tag: 'hr',
            type: '',
            value: '',
        }
    ]


    switch (selector) {
        case 'patient':
            arrForm = patientForm;
            break;
        case 'customer':
            arrForm = customerForm;
            break;
        default:
            arrForm = patientForm;
            arrForm = arrForm.concat(separator).concat(customerForm);
            console.log(arrForm)
            break;
    }
    return arrForm;

}

function datalistGenerator (id, data) {
    let datalist;
    data.forEach(v => {

        datalist += 
        `
            <option id="${id.slice(0,2)}-${v.username}" value='${v.username}'>${v.name}</option> 
        `;

    });
    return datalist;
}

function FormGenerator ({ arrForm }) {
    useEffect( () => {
        dataWalker();
    }, [])

    const dataWalker = () => {
        arrForm.forEach(e => {
            let cell = '';
            let input = '';
            let datalist = '';
            let attributes = '';
            
            if (e.tag !== 'hr' && e.tag !== 'h3') attributes = `type="${e.type}" id="${e.id}" class="form-control" value="${e.value}"`;

            if (e.type == 'search') {

                
                datalist = `<datalist id="${e.id}-datalist">`;
                datalist += datalistGenerator(e.id, e.datalist);
                datalist += `</datalist>`;
                attributes += `list="${e.id}-datalist" placeholder="Buscar..."`;
                
            } else if (e.tag == 'textarea'){
                attributes += `rows="5"`;
            }

            input = 
            `
                <${e.tag} ${attributes}>
            `;

            if (datalist) input += datalist;

            if (e.tag == 'textarea') {
                
                cell += 
                `
                    <div class=row>
                        <div class="mb-3">
                        <label htmlFor="${e.id}" class="form-label">${e.label}:</label>
                        ${input}</${e.tag}>
                    </div> 
                `;

            } else if (e.tag == 'hr' || e.tag == 'h3') {

                cell += `${input}${e.value}</${e.tag}>`;

            } else {

                cell += 
                `
                    <div class="mb-3 col-auto">
                        <label htmlFor="${e.id}" class="form-label">${e.label}:</label>
                        ${input}</${e.tag}>
                    </div> 
                `;

            }
            
            document.getElementById('form-row-1').insertAdjacentHTML('beforeend', cell);
        
        });
    }

    return (
        <>
            <FormAlerts />
            <form id="auto-form">
                <div id="form-row-1" className="row">


                </div>
                <FormModal />
            </form>
        </>
    )
}
export { FormModal, FormAlerts, handleAlert, handleClean, CustomerForm, PatientForm, FormGenerator, FormArray, datalistGenerator };