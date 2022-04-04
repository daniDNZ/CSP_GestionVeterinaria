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

const fetchVets = (callback) => {

    let arrVets;

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
        .then(data => {callback(data) })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });

}
// async function fetchVets() {
//     let arrVets;

//     const config = {
//         method: 'GET',
//         mode: 'cors',
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//         }
//     }
//     const request = new Request("http://192.168.1.81:8888/api/vets", config);
//     const response = await fetch(request);
//     const response2 = await response.json();
//     arrVets = response2;
//     console.log(arrVets)
//     return arrVets;
// }

const fetchSpecies = () => {

    let arrSpecies;

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
        .then(data => { arrSpecies = data })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
    
        return arrSpecies;
}

const fetchRaces = () => {

    let arrRaces;

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
        .then(data => { arrRaces = data })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
    
    return arrRaces;
}

const fetchCustomers = () => {

    let arrCustomers;

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
        .then(data => { arrCustomers = data })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
        });
    
    return arrCustomers;
}

export { fetchPatient, fetchVets, fetchSpecies, fetchRaces, fetchCustomers }