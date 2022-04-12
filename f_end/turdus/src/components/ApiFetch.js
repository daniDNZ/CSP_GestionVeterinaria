import bcrypt from "bcryptjs/dist/bcrypt";
import { handleAlert, handleClean } from "./FormController";

const fetchPatient = (id = '', userId = '', customer = '', species = '', sterilised = '') => {
    let arrPatients;
    const bodyData = {
        id: id,
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
    const request = new Request("http://192.168.1.81:8888/api/patients", config);
    fetch(request)
        .then(response => response.json())
        .then(data => { arrPatients = data })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
            // window.location = '/turdus/login'
        })

    return arrPatients;
}

const getVisits = (callback, id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request("http://192.168.1.81:8888/api/1/visits", config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data.data, id) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });

}

const getPatients = (callback, id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request("http://192.168.1.81:8888/api/patients", config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data, id) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });

}

const getVets = (callback, id) => {


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
        .then(data => { callback(data, id) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });

}

const getSpecies = (callback, id) => {


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
        .then(data => { callback(data, id) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
    
}

const getRaces = (callback, id) => {

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
        .then(data => { callback(data, id) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
    
}


const getCustomers = (callback, id, currentPage = 1) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/${currentPage}/customers`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data, id) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
}

const findVisits = (callback, bodyData = {}, id) => {

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request("http://192.168.1.81:8888/api/visits", config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data, id) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
  
}

const findPatients = (callback, bodyData = {}, id) => {

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request("http://192.168.1.81:8888/api/patients", config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data, id) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
  
}

const findCustomers = (callback, bodyData = {}, id) => {

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
        .then(data => { callback(data, id) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
  
}

const findVets = (callback, bodyData = {}, id) => {

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
        .then(data => { callback(data, id) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
  
}

const findSpecies = (callback, bodyData = {}, id) => {
    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request("http://192.168.1.81:8888/api/species", config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data, id) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
}

const findRaces = (callback, id, value) => {
    const bodyData = {
        species: value
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
    const request = new Request("http://192.168.1.81:8888/api/races", config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data, id) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
}



// INSERTS / UPDATES

const addUpdateCustomer = (fData, action, id = '') => {

    const bodyData = {
        id: id,
        email: fData.customerEmail.value,
        dni: fData.customerDni.value,
        name: fData.customerName.value,
        last_name: fData.customerLastname.value,
        postal_code: fData.customerPc.value,
        address: fData.customerAddress.value,
        phone: fData.customerPhone.value,
        info: fData.customerInfo.value,
        password: bcrypt.hashSync(fData.customerName.value)
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
    let request;
    if (action == 'add') {
        request = new Request("http://192.168.1.81:8888/api/customer/add", config);
    } else {
        request = new Request("http://192.168.1.81:8888/api/customer/update", config);
    }

  
    fetch(request)
        .then(response => response.json())
        .then(data => {
            handleAlert(true);
        })
        .catch(e => {
            handleAlert(false);
            console.log(e, 'Esto es un error')
            // localStorage.clear();
            // window.location = '/turdus/login'
        })
    
}

const addUpdatePatient = (fData, action, id = '') => {

    const birthday = `${fData.patientBirthday.value.split('T')[0]}`;
    
    const bodyData = {
            patientId: id,
            name: fData.patientName.value,
            info: fData.patientInfo.value,
            chip: fData.patientChip.value,
            eyes: fData.patientEyes.value,
            color: fData.patientColor.value,
            weight: fData.patientWeight.value,
            gender: fData.genderPicker.value,
            sterilised: fData.sterilisedPicker.value,
            vet: fData.vetPicker.value,
            race: fData.racePicker.value,
            species: fData.speciesPicker.value,
            customer: fData.customerPicker.value,
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
    let request;
    if (action == 'add') {
        request = new Request("http://192.168.1.81:8888/api/patient/add", config);
    } else {
        request = new Request("http://192.168.1.81:8888/api/patient/update", config);
    }

  
    fetch(request)
        .then(response => response.json())
        .then(data => {
            handleAlert(true);
        })
        .catch(e => {
            handleAlert(false);
            console.log(e, 'Esto es un error')
            // localStorage.clear();
            // window.location = '/turdus/login'
        })
    
}



export { 
    fetchPatient, 
    getVets, 
    getSpecies, 
    getRaces, 
    getVisits,
    getCustomers, 
    getPatients, 
    findVisits,
    findPatients, 
    findVets,
    findSpecies,
    findRaces, 
    findCustomers, 
    addUpdateCustomer, 
    addUpdatePatient 
}