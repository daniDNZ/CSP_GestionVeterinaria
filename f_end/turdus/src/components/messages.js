import { useEffect, useState } from "react"
import { Pagination } from "./TablePagination";

export default function Messages() {

    const [jsxElements, setJsxElements] = useState(['']);

    const handleData = (d) => {
        setJsxElements([])     // Limpiamos la lista para los re-renderizados

        Pagination(d, getMessages, handleData);

        const dateObj = new Date();

        d.data.forEach(m => {
            // Comparamos fechas
            const msgDate = new Date(m.date);
            const rest = +dateObj - +msgDate;
            const toDays = Math.floor(rest / 86400000);
            let smallPrint = '';
            toDays === 0
                ? smallPrint = 'Hoy'
                : smallPrint = `${toDays} días`;

            const li = <li key={m.id} className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">
                        <a href={`mailto:${m.email}`} className="text-decoration-none">{m.email}</a>
                    </h5>
                    <small>
                        {smallPrint}
                    </small>
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <p className="mb-1 text-truncate" style={{maxHeight: '2rem'}}>{m.message}</p>
                    <a role="button" data-id={`${m.id}`} onClick={removeMsg}>
                        <i className="bi bi-x-lg text-danger"></i>
                    </a>
                </div>
            </li>;

            setJsxElements(current => [...current, li])
        });
    }

    const removeMsg = (e) => {
        const id = e.currentTarget.dataset.id;
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        }

        const request = new Request(`http://192.168.1.81:8888/api/contact_form/remove/${id}`, config);

        fetch(request)
            .then(response => response.json())
            .then(data => getMessages(handleData))
            .catch(e => console.log(e));
    }

    const getMessages = (callback, currentPage = 1) => {
        const config = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        }

        const request = new Request(`http://192.168.1.81:8888/api/contact_form/${currentPage}`, config);

        fetch(request)
            .then(response => response.json())
            .then(data => callback(data))
            .catch(e => console.log(e));

    }

    useEffect(() => {
        getMessages(handleData);
    }, [])
    return (
        <>
            <div className="my-4 mx-2 fw-light" style={{ width: "19rem" }}>
                <h3 className="">Últimos mensajes</h3>
                <ul id="messagesList" className="list-group">
                    {jsxElements}
                </ul>
                <nav className="mt-2" aria-label="Table pagination">
                    <ul className="pagination" id="pagination">

                    </ul>
                </nav>
            </div>

        </>
    )
}