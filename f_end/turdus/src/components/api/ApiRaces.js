import { handleErrors, handleAuth } from "./ApiFetch";
import global from "../../global";

export const getRaces = (callback, id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request(`${global.apiUri}/api/races`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data, id))
        .catch(e => handleAuth(e));

}

export const getOneRace = (callback, id) => {


    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request(`${global.apiUri}/api/races/${id}`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => console.log(e));

}

export const getPaginateRaces = (callback, currentPage = 1) => {


    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request(`${global.apiUri}/api/races/paginate/${currentPage}`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const findRaces = (callback, value, id = '') => {
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
    const request = new Request(`${global.apiUri}/api/races`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data, id))
        .catch(e => handleAuth(e));
}

export const addUpdateRace = (fData, action, id = '') => {

    fData.append('id', id);

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: fData
    }
    let request;
    if (action == 'add') {
        request = new Request(`${global.apiUri}/api/race/add`, config);
    } else {
        request = new Request(`${global.apiUri}/api/race/update`, config);
    }


    fetch(request)
        .then(response => handleErrors(response))
        .then(data => {})
        .catch(e => console.log(e))

}

export const removeRace = (id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }
    
    const request = new Request(`${global.apiUri}/api/reaces/${id}/remove`, config);
    
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { window.location.assign('/turdus/search'); })
        .catch(e => console.log(e))

}