import { useEffect } from "react";
import { useParams } from "react-router-dom";
import global from "../global";
import { findOneVisit, getDebt } from "./ApiFetch";
import { ViewVisitsList } from "./Modals";

function PayDebt() {
    const { id } = useParams();
    let debt = 0;

    const fillList = (bills) => {
        const list = document.querySelector('#billsList');

        list.innerHTML = '';

        bills.forEach(bill => {
            const a = document.createElement('a');
            a.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between', 'align-items-center');
            const span = document.createElement('span');
            span.innerHTML = ` <b>Ref:</b> #${bill.visit} | <b>Total:</b> ${bill.amount} | <b>Pagado:</b> ${bill.paid} | <b>Deuda:</b> ${bill.debt}`;

            a.setAttribute('href', '#');
            a.setAttribute('data-bs-toggle', 'modal');
            a.setAttribute('data-bs-target', '#viewVisitsListModal');
            a.dataset.id = bill.visit;
            a.addEventListener('click', e => findOneVisit(fillModal, bill.visit));

            a.append(span);

            list.append(a);

            debt += parseFloat(bill.debt);
        });

        const debtInput = document.querySelector('#debt-amount');
        debtInput.value = debt;
    }

    const fillModal = (v) => {
        console.log(v)

        const mTitle = document.querySelector('.modal-title');
        const mList = document.querySelector('.modal-body ul');
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
        closeBtn.classList.add('d-none');

    }

    const giveChange = e => {
        e.preventDefault();
    }

    const completePay = e => {
        e.preventDefault();
    }

    useEffect(() => {
        getDebt(fillList, id);
    }, [])

    return (
        <>
            <h3>Pendientes de Pago</h3>
            <hr />
            <div className="container my-4">
                <div id="billsList" className="list-group overflow-scroll" style={{ maxHeight: "20em" }} />
            </div>
            <hr />
            <div className="input-group col-auto mb-3">
                <span className="input-group-text">Deuda</span>
                <input id="debt-amount" type="text" className="form-control" placeholder="Deuda" disabled></input>
                <span className="input-group-text">€</span>
            </div>
            <div className="input-group col-auto mb-3">
                <span className="input-group-text">Abonado</span>
                <input id="cash-amount" type="text" className="form-control" placeholder="Cantidad abonada" onChange={giveChange}></input>
                <span className="input-group-text">€</span>
            </div>
            <div className="input-group col-auto mb-3">
                <span className="input-group-text">Cambio</span>
                <input id="cash-change" type="text" className="form-control" placeholder="A devolver"></input>
                <span className="input-group-text">€</span>
            </div>
            <div className="col-auto">
                <button type="button" className="btn btn-primary" onClick={completePay}>Efectuar cobro</button>
            </div>

            <ViewVisitsList />

        </>
    )
}

export default PayDebt;