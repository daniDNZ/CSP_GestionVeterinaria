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
    const datalistElement = document.getElementById(`${id}-datalist`);

    // Comprobamos si existe la datalist
    if (datalistElement) {
    const datalist = datalistGenerator(id, arr);
    datalistElement.innerHTML = datalist;
    }
}

const handlePagination = (e) => {
    e.preventDefault();
    console.log('funciona');
    const sumPage = 1;
    let currentPage;
    if ( e.target.ariaLabel == 'Previous') sumPage = -1
    else if (e.target.ariaLabel == 'Next') sumPage = 1
    else currentPage = e.target.textContent;

}

export { handleDatalist, handlePagination };