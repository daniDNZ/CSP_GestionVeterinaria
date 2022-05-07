import { handleErrors, handleAuth } from "./ApiFetch";

// export const getSuppliers = (callback) => {


//     const config = {
//         method: 'GET',
//         mode: 'cors',
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//         }
//     }
//     const request = new Request("http://192.168.1.81:8888/api/suppliers", config);
//     fetch(request)
//         .then(response => handleErrors(response))
//         .then(data => callback(data))
//         .catch(e => handleAuth(e));

// }

export const addUpdatePostalCode = (fData, action, id = '') => {

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
        request = new Request("http://192.168.1.81:8888/api/postal_code/add", config);
    } else {
        request = new Request("http://192.168.1.81:8888/api/postal_code/update", config);
    }


    fetch(request)
        .then(response => handleErrors(response))
        .then(data => { window.location.reload(); })
        .catch(e => console.log(e))

}