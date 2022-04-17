import bcrypt from "bcryptjs/dist/bcrypt";
import { assignData } from "./TableController";
import { getDataDatalist } from "./Datalist";
import { handleAlert } from "./FormController";
import { activePagination } from "./TablePagination";

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

const getVisits = ( callback, currentPage = 1 ) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request(`http://192.168.1.81:8888/api/${currentPage}/visits`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => {  callback(data, getVisits)
            // assignData( data, arr ); getDataDatalist( data, arr.ids ); activePagination( data, arr, getVisits ) 
        })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });

}

const getPatients = ( callback, currentPage = 1 ) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request(`http://192.168.1.81:8888/api/${currentPage}/patients`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => {  callback(data, getPatients)
            // assignData( data, arr ); getDataDatalist( data, arr.ids ); activePagination( data, arr, getPatients ) 
        })
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


const getCustomers = ( callback, currentPage = 1 ) => {

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
        .then(data => { callback(data, getCustomers)
            // assignData( data, arr ); getDataDatalist( data, arr.ids ); activePagination( data, arr, getCustomers ) 
        })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
}

const getAllCustomers = ( callback, id ) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/1/customers`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data.allData, id) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
}

const findVisits = ( callback, currentPage = 1, bodyData = {} ) => {

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request(`http://192.168.1.81:8888/api/${currentPage}/visits`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => {
            callback(data, findVisits)
            //  assignData(data, arr); getDataDatalist(data, arr.ids); activePagination( data, arr, findVisits, bodyData ) 
            })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
  
}

const findPatients = ( callback, currentPage = 1, bodyData = {} ) => {

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request(`http://192.168.1.81:8888/api/${currentPage}/patients`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => { 
            callback(data, findPatients)
            // assignData(data, arr); getDataDatalist(data, arr.ids); activePagination( data, arr, findPatients, bodyData ) 
        })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
  
}

const findCustomers = ( callback, currentPage = 1, bodyData = {}) => {

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request(`http://192.168.1.81:8888/api/${currentPage}/customers`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data, findCustomers)
            // assignData(data, arr); getDataDatalist(data, arr.ids); activePagination( data, arr, findCustomers, bodyData )
         })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
  
}

const findVets = ( callback, bodyData = {} ) => {

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request(`http://192.168.1.81:8888/api/vets`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data) })
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

const findRaces = (callback, value, id = '') => {
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

// FIND ONE

const findOneCustomer = (callback, id ) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/customers/${id}`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data) })
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
            window.location = `/turdus/customers/${data.id}`;
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
            window.location = `/turdus/patients/${data.id}`;
        })
        .catch(e => {
            handleAlert(false);
            console.log(e, 'Esto es un error')
            // localStorage.clear();
            // window.location = '/turdus/login'
        })
    
}

const addUpdateVisit = (fData, action, id = '') => {

    const dateTime = `${fData.dateTimePicker.value.split('T')[0]} ${fData.dateTimePicker.value.split('T')[1]}`;
    
    const bodyData = {
            patientId: id,
            done: fData.completedPicker.value,
            category: fData.category.value,
            treatment: fData.treatment.value,
            patientWeight: fData.patientWeight.value,
            description: fData.description.value,
            patient: fData.patientPicker.value.split(' #')[1],
            vet: fData.vetPicker.value.split(' @')[1],
            duration: parseInt(fData.duration.value) / 15,
            date_time: dateTime
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
        request = new Request("http://192.168.1.81:8888/api/visit/add", config);
    } else {
        request = new Request("http://192.168.1.81:8888/api/visit/update", config);
    }

  
    fetch(request)
        .then(response => response.json())
        .then(data => {
            window.location = `/turdus/visits/${data.id}`;
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
    getAllCustomers,
    getPatients, 
    findVisits,
    findPatients, 
    findVets,
    findSpecies,
    findRaces, 
    findCustomers, 
    findOneCustomer,
    addUpdateCustomer, 
    addUpdatePatient,
    addUpdateVisit 
}