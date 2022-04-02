import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/visits.css';
import { CustomerForm, FormAlerts, FormModal } from "./FormsController";

function Customer() {
    const { id } = useParams();
    let arrData;


    useEffect(() => {

        fetchCustomer();

    }, [])

    const handleCustomer = (e) => {
        e.preventDefault();
        const fData = e.target;

        // Enviar datos y hacer update o insert
        const bodyData = {
            id: id,
            dni: fData.cDni.value,
            name: fData.cName.value,
            info: fData.cInfo.value,
            phone: fData.cPhone.value,
            email: fData.cEmail.value,
            address: fData.cAddress.value,
            last_name: fData.cLastName.value,
            postal_code: fData.cPc.value,
        }
        console.log(bodyData)
        const config = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        }
        const request = new Request("http://192.168.1.81:8888/api/customer/update", config);
        fetch(request)
            .then(response => response.json())
            .then(data => { handleAlert(true); })
            .catch(e => {
                handleAlert(false)
                // localStorage.clear();
                // window.location = '/turdus/login'
            })

    }

    const fetchCustomer = () => {
        const bodyData = {
            id: id
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
        const request = new Request("http://192.168.1.81:8888/api/customer", config);
        fetch(request)
            .then(response => response.json())
            .then(data => { handleData(data) })
            .catch(e => {
                console.log(e)
                // localStorage.clear();
                // window.location = '/turdus/login'
            })
    }

    const handleData = (data) => {

        document.getElementById("customer-dni").value = data.dni;
        document.getElementById("customer-name").value = data.name;
        document.getElementById("customer-info").value = data.info;
        document.getElementById("customer-phone").value = data.phone;
        document.getElementById("customer-email").value = data.email;
        document.getElementById("customer-PC").value = data.postalCode;
        document.getElementById("customer-address").value = data.address;
        document.getElementById("customer-lastname").value = data.lastName;

    }

    const handleAlert = (success) => {

        let alert;
        if (success) {
            alert = document.getElementById("completedAlert");
        } else {
            alert = document.getElementById("failedAlert");
        }
        alert.classList.contains('d-none') ? alert.classList.remove('d-none') : alert.classList.add('d-none')

    }

    return (
        <div className="container">
            <FormAlerts />
            <div className="d-flex flex-row justify-content-between">
                <form onSubmit={handleCustomer}>
                    <CustomerForm />
                    <FormModal />
                </form>
            </div>

        </div>
    )
}
export default Customer;