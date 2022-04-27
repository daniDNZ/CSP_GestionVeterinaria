import bcrypt from "bcryptjs/dist/bcrypt";
import { handleAlert } from "./FormController";

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

const findTime = (callback, filter) => {
    const bodyData = filter;
    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request("http://192.168.1.81:8888/api/visits/time", config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
}

const findProducts = (callback, data) => {
    const bodyData = {
        category: data.category,
        name: data.name,
        species: data.species
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
    const request = new Request("http://192.168.1.81:8888/api/products", config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
}

const findServices = (callback, data) => {
    const bodyData = {
        category: data.category,
        name: data.name
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
    const request = new Request("http://192.168.1.81:8888/api/services", config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data) })
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

const findOnePatient = (callback, id ) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/patients/${id}`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
  
}

const findOneVisit = (callback, id ) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/visits/${id}`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => { callback(data) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
  
}

const findBill = (callback, bData) => {
    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bData)
    }
    const request = new Request(`http://192.168.1.81:8888/api/bill/find`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => callback(data) )
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
  
}

// UTILITIES

const findCustomerPatients = ( callback, id ) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/customers/${id}/patients`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => { 
            callback(data)
        })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
  
}

const findPatientVisits = ( callback, id ) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/patients/${id}/visits`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => { 
            callback(data)
            // assignData(data, arr); getDataDatalist(data, arr.ids); activePagination( data, arr, findPatients, bodyData ) 
        })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
  
}

const findTodayVisits = ( callback, date ) => {
    const bodyData = {
        datePicker: date
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
    const request = new Request(`http://192.168.1.81:8888/api/visits/today`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => {
            callback(data)
            })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
  
}

const getDebt = ( callback, id ) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
    }
    const request = new Request(`http://192.168.1.81:8888/api/customer/${id}/debt`, config);
    fetch(request)
        .then(response => response.json())
        .then(data => {
            callback(data)
            })
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

    let birthday = `${fData.patientBirthday.value}`;
    if (birthday.length == 0) birthday = '1111-11-1';

    const bodyData = {
            id: id,
            name: fData.patientName.value,
            info: fData.patientInfo.value,
            chip: fData.patientChip.value,
            eyes: fData.patientEyes.value,
            color: fData.patientColor.value,
            weight: fData.patientWeight.value,
            gender: fData.genderPicker.value,
            sterilised: fData.sterilisedPicker.value,
            vet: fData.vetPicker.value.split(' - ')[1],
            race: fData.racePicker.value,
            species: fData.speciesPicker.value,
            customer: fData.responsiblePicker.value.split(' - ')[1],
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

const addBill = (callback, data) => {
    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    let request;

    request = new Request("http://192.168.1.81:8888/api/bill/add", config);
  
    fetch(request)
        .then(response => response.json())
        .then(data => {
            callback(data)
        })
        .catch(e => {
            console.log(e, 'Esto es un error')
            // localStorage.clear();
            // window.location = '/turdus/login'
        })
    
}

const payBill = (data, location) => {
    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    let request;

    request = new Request("http://192.168.1.81:8888/api/bill/update", config);
  
    fetch(request)
        .then(response => response.json())
        .then(data => {
            window.location = location;
        })
        .catch(e => {
            console.log(e, 'Esto es un error')
            // localStorage.clear();
            // window.location = '/turdus/login'
        })
    
}

const addProductsLog = (bodyData) => {
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

    request = new Request("http://192.168.1.81:8888/api/products_log/add", config);
  
    fetch(request)
        .then(response => response.json())
        .then(data => {
        })
        .catch(e => {
            console.log(e, 'Esto es un error')
            // localStorage.clear();
            // window.location = '/turdus/login'
        })
    
}

const addServicesLog = (bodyData) => {
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

    request = new Request("http://192.168.1.81:8888/api/services/log/add", config);
  
    fetch(request)
        .then(response => response.json())
        .then(data => {
        })
        .catch(e => {
            console.log(e, 'Esto es un error')
            // localStorage.clear();
            // window.location = '/turdus/login'
        })
    
}

const addUpdateVisit = (fData, action, id = '') => {
    const dateTime = `${fData.datePicker.value} ${fData.timePicker.value}`;
    
    const bodyData = {
            id: id,
            done: fData.completedPicker.value,
            category: fData.category.value,
            treatment: fData.treatment.value,
            patientWeight: fData.patientWeight.value,
            description: fData.description.value,
            patient: fData.patientPicker.value.split('#')[1],
            vet: fData.userPicker.value.split(' - ')[1],
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
        request = new Request("http://192.168.1.81:8888/api/visits/add", config);
    } else {
        request = new Request("http://192.168.1.81:8888/api/visits/update", config);
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

const closeVisit = (fData, id, location) => {
    const dateTime = `${fData.datePicker.value} ${fData.timePicker.value}`;
    
    const bodyData = {
            id: id,
            done: fData.completedPicker.value,
            category: fData.category.value,
            treatment: fData.treatment.value,
            patientWeight: fData.patientWeight.value,
            description: fData.description.value,
            patient: fData.patientPicker.value.split('#')[1],
            vet: fData.userPicker.value.split(' - ')[1],
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
    let request = new Request("http://192.168.1.81:8888/api/visits/update", config);

    fetch(request)
        .then(response => response.json())
        .then(data => {
            window.location = location;
        })
        .catch(e => {
            handleAlert(false);
            console.log(e, 'Esto es un error')
            // localStorage.clear();
        })
    
}

const closeVisitFast = (id, location) => { 

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }

    let request = new Request(`http://192.168.1.81:8888/api/visits/${id}/close`, config);

    fetch(request)
        .then(response => response.json())
        .then(data => {
            window.location = location;
        })
        .catch(e => {
            console.log(e, 'Esto es un error')
            // localStorage.clear();
        })
    
}

const updateCart = (id, cart) => { 

    const bodyData = {
        cart: cart
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

    let request = new Request(`http://192.168.1.81:8888/api/visits/${id}/cart`, config);

    fetch(request)
        .then(response => response.json())
        .then(data => {
            
        })
        .catch(e => {
            handleAlert(false);
            console.log(e, 'Esto es un error')
            // localStorage.clear();
        })
    
}



export { 
    getVets, 
    getSpecies, 
    getRaces, 
    getVisits,
    getCustomers, 
    getAllCustomers,
    getPatients, 
    getDebt,
    findVisits,
    findPatients, 
    findVets,
    findSpecies,
    findRaces, 
    findTime,
    findCustomers, 
    findProducts,
    findServices,
    findOneCustomer,
    findOnePatient,
    findOneVisit,
    findBill,
    findCustomerPatients,
    findPatientVisits,
    findTodayVisits,
    closeVisit,
    closeVisitFast,
    addUpdateCustomer, 
    addUpdatePatient,
    addUpdateVisit,
    addBill,
    payBill,
    addProductsLog,
    addServicesLog,
    updateCart 
}