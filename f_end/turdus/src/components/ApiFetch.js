const fetchPatient = (id = '', userId = '', customer = '', species = '', sterilised = '') => {
    let arrPatients;
    const bodyData = {
        id: id,
        userid: userId,
        customer: customer,
        species: species,
        sterilised: sterilised
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
    const request = new Request("http://192.168.1.81:8888/api/patients", config);
    fetch(request)
        .then(response => response.json())
        .then(data => { arrPatients = data })
        .catch(e => {
            console.log(e)
            // localStorage.clear();
            // window.location = '/turdus/login'
        })

    return arrPatients;
}

export { fetchPatient }