import { useEffect } from "react";
import { closeVisitFast, findOneVisit, findTodayVisits } from "./ApiFetch";
import { ViewVisitsList } from "./Modals";

function WaitingRoom() {
    let date = new Date;
    date = date.toISOString().split('T')[0]

    const fillModal = (v) => {
        console.log(v)

        const mTitle = document.querySelector('.modal-title');
        const mList = document.querySelector('.modal-body>ul');
        const list = `
            <li class='list-group-item'><b>Hora:</b> ${v.time}</li>
            <li class='list-group-item'><b>Fecha:</b> ${v.date}</li>
            <li class='list-group-item'><b>Veterinari@:</b> ${v.vetName}</li>
            <li class='list-group-item'><b>Paciente:</b> ${v.patient}</li>
            <li class='list-group-item'><b>Propietario:</b> ${v.customer}</li>
            <li class='list-group-item'><b>Especie:</b> ${v.species}</li>
            <li class='list-group-item'><b>Raza:</b> ${v.race}</li>
            `;
        mList.innerHTML = list

        mTitle.textContent = v.category;
        
        // Listeners botones
        const viewBtn = document.querySelector('#view-visit');
        viewBtn.setAttribute('href', `/turdus/visits/${v.id}`);

        const closeBtn = document.querySelector('#close-visit');

        // viewBtn.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     viewBtn.setAttribute('href', `/turdus/visits/${v.id}`);
        //     viewBtn.click
        //     // window.location = `/turdus/visits/${v.id}`;
        // })

        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeVisitFast(v.id, '/turdus/waiting_room');
        })

    }

    const handleModal = (e) => {
        e.preventDefault();
        const id = parseInt(e.target.textContent.split('#')[1]);

        // RELLENAR EL MODAL, ORDENAR LA BÚSQUEDA POR HORA Y ARREGLAR COSITAS
        findOneVisit(fillModal, id);

    }

    const handleData = (data) => {
        const visits = data;
        const vList = document.querySelector('#visitsList');
        const bList = document.querySelector('#billsList');
        
        visits.forEach(v => {
            if (v.done == false) {
            const a = document.createElement('a');
            a.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between', 'align-items-center');
            a.setAttribute('href', '#');
            a.setAttribute('data-bs-toggle', 'modal');
            a.setAttribute('data-bs-target', '#viewVisitsListModal');
            a.addEventListener('click', handleModal);

            const span = document.createElement('span');
            span.innerHTML =`<b>${v.time}</b> | <b>Cat:</b> ${v.category} | <b>Vet:</b> ${v.vet} | <b>Pat:</b> ${v.patient} | <b>Prop:</b> ${v.customer} | <b>Ref:</b> #${v.id}`;

            a.append(span);
            vList.append(a);
            }
        });
    }
    useEffect(()=> {
        findTodayVisits( handleData, date)
    }, []);
    return (
        <>
            <h3>Recepción</h3>
            <hr />
            <div className="container my-4">
                <h5>Visitas pendientes</h5>
                <div id="visitsList" className="list-group overflow-scroll" style={{maxHeight: "20em"}}>
                    {/* <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                    </a> */}
                </div>
            </div>
            <div className="container">
                <h5>Tickets pendientes</h5>
                <div id="billsList" className="list-group overflow-scroll"  style={{maxHeight: "20em"}}>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                        <span className="badge bg-primary rounded-pill"><i className="bi bi-check fs-6"></i></span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                        <span className="badge bg-warning rounded-pill"><i className="bi bi-x fs-6"></i></span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                        <span className="badge bg-primary rounded-pill"><i className="bi bi-check fs-6"></i></span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                        <span className="badge bg-warning rounded-pill"><i className="bi bi-x fs-6"></i></span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                        <span className="badge bg-primary rounded-pill"><i className="bi bi-check fs-6"></i></span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                        <span className="badge bg-warning rounded-pill"><i className="bi bi-x fs-6"></i></span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                        <span className="badge bg-primary rounded-pill"><i className="bi bi-check fs-6"></i></span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span><b>18:45</b> | <b>Cat:</b> Consulta | <b>Vet:</b> Collette | <b>Pat:</b> Harry | <b>Prop:</b> Jose</span>
                        <span className="badge bg-warning rounded-pill"><i className="bi bi-x fs-6"></i></span>
                    </a>
                </div>
            </div>
            <ViewVisitsList />
        </>
    )
}

export default WaitingRoom;