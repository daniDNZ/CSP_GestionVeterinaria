import { handleErrors, handleAuth } from "./ApiFetch";


export const findServices = (callback, data) => {
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
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));
}