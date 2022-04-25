import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { findOneVisit, updateCart } from "./ApiFetch";
import global from "../global";

function Bill() {
    const { id } = useParams();
    let cart = [];
    let total = 0;

    const handleData = (data) => {
        if (data.cart) cart = data.cart;
        fillList();
    }

    const fillList = () => {
        const ul = document.querySelector('#billsList');
        ul.innerHTML = '';
        total = 0;

        const span_currency = document.createElement('span');
        span_currency.classList.add('ms-1');
        span_currency.textContent = global.currency;

        cart.forEach(p => {
            total += parseFloat(p.price * p.q);

            const span_currency_copy = span_currency.cloneNode(true);

            const li = document.createElement('li');
            const div_1 = document.createElement('div');
            const a_1 = document.createElement('a');
            const i_1 = document.createElement('i');
            const span_1 = document.createElement('span');
            const div_2 = document.createElement('div');
            const input_2 = document.createElement('input');
            const span_2 = document.createElement('span');

            li.classList.add('list-group-item','list-group-item-action', 'd-flex', 'justify-content-between', 'align-items-center');

            div_1.classList.add('d-flex', 'align-items-center');
            a_1.setAttribute('href', '#');
            a_1.dataset.id = p.id;
            a_1.dataset.type = p.type;
            a_1.addEventListener('click', removeItem);
            i_1.classList.add('bi', 'bi-x', 'fs-4', 'eliminate');

            div_2.classList.add('d-flex', 'flex-row', 'align-items-center');
            input_2.classList.add('form-control', 'col-auto', 'me-3');
            input_2.setAttribute('type', 'number');
            input_2.dataset.id = p.id;
            input_2.dataset.type = p.type;
            input_2.dataset.price = p.price;
            input_2.dataset.quantity = p.q;
            input_2.addEventListener('input', changeQ);
            span_2.classList.add('col-auto');
            span_2.id = 'product-price';

            span_1.textContent = p.name;
            input_2.value = p.q;
            span_2.textContent = parseFloat(p.price).toFixed(2);

            a_1.append(i_1);
            div_1.append(a_1, span_1);
            div_2.append(input_2, span_2, span_currency_copy);
            li.append(div_1, div_2);
            ul.append(li);

        });

        // Total
        const totalAmount = document.querySelector('#total-amount');
        totalAmount.innerHTML = '';
        const spanTotal = document.createElement('span');
        spanTotal.classList.add('ms-3', 'fs-3', 'fw-bold');
        spanTotal.textContent = total.toFixed(2);
        span_currency.classList.add('fw-bold', 'fs-3')
        
        totalAmount.append(spanTotal, span_currency);
    }

    // Cambiar cantidad de producto
    const changeQ = e => {
        const input = e.target;
        cart.forEach(p => {
            if (p.id === input.dataset.id && p.type === input.dataset.type) p.q = input.value;
        });
        updateCart(id, cart);
        fillList();
    }

    // Remueve el objeto
    const removeItem = e => {
        let input = e.currentTarget;
        cart = cart.filter(i => i.id !== input.dataset.id || i.type !== input.dataset.type);  // Filtra el carrito, dejando pasar solo los objetos distintos del eliminado.
        updateCart(id, cart);
        fillList(); // Volvemos a renderizar la lista
    }

    const giveChange = e => {
        e.preventDefault();
        const amount = parseFloat(e.target.value);
        const cashChange = document.querySelector('#cash-change');
        cashChange.value = (amount - total).toFixed(2);
    }

    const makeBill = e => {
        e.preventDefault();
        const datetime = new Date;
        let datetimeFormatted = `${datetime.toISOString().split('T')[0]} ${datetime.toISOString().split('T')[1].slice(0, 5)}`;
        // addBill()
    }

    useEffect(() => {
        findOneVisit(handleData, id)
    }, [])
    return (
        <>
            <h3>Ticket</h3>
            <hr />
            <ul id="billsList" className="list-group list-group-flush overflow-scroll" />
            <hr />
            <div className="d-flex justify-content-between">
                <button 
                    type="button" 
                    className="btn btn-outline-primary" 
                    data-bs-target="#pay-cash" 
                    data-bs-toggle="collapse" 
                    aria-expanded="false" 
                    aria-controls="#pay-cash">
                    Efectivo
                </button>
                <div id="total-amount" className="me-3">
                </div>
            </div>
            <div id="pay-cash" className="collapse mt-3">
                <div className="input-group col-auto mb-3">
                    <span className="input-group-text">Abonado</span>
                    <input id="cash-amount" type="text" className="form-control col-auto" placeholder="Cantidad abonada" onChange={giveChange}></input>
                    <span className="input-group-text">€</span>
                </div>
                <div className="input-group col-auto mb-3">
                    <span className="input-group-text">Cambio</span>
                    <input id="cash-change" type="text" className="form-control col-auto" placeholder="A devolver"></input>
                    <span className="input-group-text">€</span>
                </div>
                <div className="col-auto">
                <button type="button" className="btn btn-primary" onClick={makeBill}>Efectuar cobro</button>
                </div>
            </div>
        </>
    )
}

export default Bill;