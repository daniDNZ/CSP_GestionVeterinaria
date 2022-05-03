import { handleErrors, handleAuth } from "./ApiFetch";

// export const getCurUser = (callback, username) => {
//     const bodyData = {
//         username: username,
//     }
//     const config = {
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(bodyData)
//     }
//     const request = new Request(`http://192.168.1.81:8888/api/users/get_current`, config);
//     fetch(request)
//         .then(response => handleErrors(response))
//         .then(data => callback(data))
//         .catch(e => handleAuth(e));
// }

export async function getCurUser(callback, username) {
    const bodyData = {
        username: username,
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
    const request = new Request(`http://192.168.1.81:8888/api/users/get_current`, config);
    const response = await fetch(request);
    const data = await response.json();
    callback(data)
}

export const getOneUser = (callback, id) => {
    const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }
    const request = new Request(`http://192.168.1.81:8888/api/user/${id}`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));
}

export const getUsers = (callback, filter = {}, currentPage = 1) => {

    const config = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filter)
    }
    const request = new Request(`http://192.168.1.81:8888/api/${currentPage}/users`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}

export const getVets = (callback, id) => {


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
        .then(response => handleErrors(response))
        .then(data => callback(data, id))
        .catch(e => handleAuth(e));

}

export const findVets = (callback, bodyData = {}) => {

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
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => handleAuth(e));

}