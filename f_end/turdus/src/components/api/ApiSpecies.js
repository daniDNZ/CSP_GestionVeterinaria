import { handleErrors, handleAuth } from "./ApiFetch";
import global from "../../global";

export const getSpecies = (callback, id = '') => {


    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request(`${global.apiUri}/api/species`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data, id))
        .catch(e => handleAuth(e));

}

export const getPaginateSpecies = (callback, currentPage = 1) => {


    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request(`${global.apiUri}/api/species/paginate/${currentPage}`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const getOneSpecies = (callback, id) => {


    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request(`${global.apiUri}/api/species/${id}`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const findSpecies = (callback, bodyData = {}, id) => {
    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    }
    const request = new Request(`${global.apiUri}/api/species`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data, id))
        .catch(e => handleAuth(e))
}

export const addUpdateSpecies = (fData, action, id = '') => {

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
        request = new Request(`${global.apiUri}/api/species/add`, config);
    } else {
        request = new Request(`${global.apiUri}/api/species/update`, config);
    }


    fetch(request)
        .then(response => handleErrors(response))
        .then(data => {})
        .catch(e => console.log(e))

}

export const removeSpecies = (id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }
    
    const request = new Request(`${global.apiUri}/api/species/${id}/remove`, config);
    
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { window.location.assign('/turdus/search'); })
        .catch(e => console.log(e))

}