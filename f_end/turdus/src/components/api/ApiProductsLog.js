import { handleErrors, handleAuth } from "./ApiFetch";
import global from "../../global";

export const addProductsLog = (bodyData) => {
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

    request = new Request(`${global.apiUri}/api/products_log/add`, config);

    fetch(request)
        .then(response => handleErrors(response))
        .catch(e => handleAuth(e));

}