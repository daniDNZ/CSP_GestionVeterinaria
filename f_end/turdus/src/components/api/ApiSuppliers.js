import { handleErrors, handleAuth } from "./ApiFetch";

export const getSuppliers = (callback) => {


    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request("http://192.168.1.81:8888/api/suppliers", config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}