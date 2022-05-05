import { handleErrors, handleAuth } from "./ApiFetch";


// export const findProducts = (callback, data) => {
//     const bodyData = {
//         category: data.category,
//         name: data.name,
//         species: data.species
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
//     const request = new Request("http://192.168.1.81:8888/api/products", config);
//     fetch(request)
//         .then(response => handleErrors(response))
//         .then(data => callback(data))
//         .catch(e => handleAuth(e));
// }

export const getProducts = (callback, filter, currentPage = 1) => {
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
    const request = new Request(`http://192.168.1.81:8888/api/products/${currentPage}/filter`, config);
    fetch(request)
        .then(response => handleErrors(response))
        .then(data => callback(data))
        .catch(e => console.log(e));
}