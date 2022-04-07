import { datalistGenerator } from "./FormController";

const handleDatalist = (data, id) => {
    let arr = [];
    let username;
    data.forEach(e => {

        if (e.username) {
            username = e.username;
        } else if (e.email) {
            username = e.email;
        } else {
            username = e.name;
        }
        arr.push({username: username, name: e.name})
    });
    const datalist = datalistGenerator(id, arr);
    document.getElementById(`${id}-datalist`).innerHTML = datalist;
}

export { handleDatalist };