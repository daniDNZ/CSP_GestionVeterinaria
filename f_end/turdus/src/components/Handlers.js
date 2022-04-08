import { datalistGenerator } from "./FormController";

// const handleDatalist = (data, id) => {
//     let arr = [];
//     let value;
//     data.forEach(e => {

//         if (e.username) {
//             value = e.username;
//         } else if (e.email) {
//             value = e.email;
//         } else {
//             value = e.name;
//         }
//         arr.push({value: value, text: e.name})
//     });
//     const datalist = datalistGenerator(id, arr);
//     document.getElementById(`${id}-datalist`).innerHTML = datalist;
// }
const handleDatalist = (data, id) => {
    let arr = [];
    let value;
    data.forEach(e => {

        arr.push({value: e, text: e})
    });
    const datalist = datalistGenerator(id, arr);
    document.getElementById(`${id}-datalist`).innerHTML = datalist;
}

export { handleDatalist };