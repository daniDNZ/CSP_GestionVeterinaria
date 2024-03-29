import { handleErrors, handleAuth } from "./ApiFetch";
import global from "../../global";

export const getSuppliers = (callback) => {


    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request(`${global.apiUri}/api/suppliers`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const getSuppliersPaginate = (callback, currentPage = 1) => {


    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request(`${global.apiUri}/api/suppliers/paginate/${currentPage}`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const findSupplier = (callback, id) => {


    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request(`${global.apiUri}/api/suppliers/${id}`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const addUpdateSupplier = (fData, action, id = '') => {

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
        request = new Request(`${global.apiUri}/api/supplier/add`, config);
    } else {
        request = new Request(`${global.apiUri}/api/supplier/update`, config);
    }


    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { })
        .catch(e => console.log(e))

}

export const removeSupplier = (id) => {

    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }
    
    const request = new Request(`${global.apiUri}/api/suppliers/${id}/remove`, config);
    
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { window.location.assign('/turdus/suppliers'); })
        .catch(e => console.log(e))

}