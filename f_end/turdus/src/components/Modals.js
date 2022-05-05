import { useEffect } from "react";
import { addUpdatePatient } from "./api/ApiPatients";
import { addUpdateVisit } from "./api/ApiVisits";
import { getProducts } from "./api/ApiProducts";
import { getServices } from "./api/ApiServices";
import { Pagination } from "./TablePagination";
import { Form } from "./Form"

function AlertModal() {
    return (
        <>
            {/* Button trigger modal  */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#warningModal">Añadir</button>
            {/* Modal  */}
            <div className="modal fade" id="warningModal" tabIndex="-1" aria-labelledby="warningModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="warningModalLabel">¿Quieres actualizar?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Esta acción no se puede deshacer
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function NewPatient() {
    const handleData = (e) => {
        e.preventDefault();

        let fData = {};
        const form = document.querySelector('.modal-body form');
        for (const e of form) {
            Object.defineProperty(fData, e.id,                   // Creamos una propiedad del objeto filter con el string a buscar.
                {
                    value: { value: e.value },
                    enumerable: true,
                    configurable: true,
                    writable: true
                }
            )
        }
        addUpdatePatient(fData, 'add');
    }


    return (
        <>
            <div className="modal fade" id="newPatientModal" tabIndex="-1" aria-labelledby="newPatientModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newPatientModalLabel">Nuevo Paciente</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form selector='patient' action='add' />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={handleData}>Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function NewVisit() {
    const handleData = (e) => {
        e.preventDefault();

        let fData = {};
        const form = document.querySelector('.modal-body form');
        for (const e of form) {
            Object.defineProperty(fData, e.id,                   // Creamos una propiedad del objeto fData con el string a buscar.
                {
                    value: { value: e.value },
                    enumerable: true,
                    configurable: true,
                    writable: true
                }
            )
        }
        addUpdateVisit(fData, 'add');
    }


    return (
        <>
            <div className="modal fade" id="newVisitModal" tabIndex="-1" aria-labelledby="newVisitModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newVisitModalLabel">Nueva Visita</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form selector='visit' action='add' />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={handleData}>Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ViewVisitsList() {



    return (
        <>
            <div className="modal fade" id="viewVisitsListModal" tabIndex="-1" aria-labelledby="viewVisitsListModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="viewVisitsListModalLabel">Visita Ref</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group list-group-horizontal-lg"></ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                            <a href="#" target="_blank" role="button" id="view-visit" type="button" className="btn btn-light" >Ver Ficha</a>
                            <a href="#" role="button" id="close-visit" type="button" className="btn btn-primary" >Cerrar Visita</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function AddProducts({ callback }) {
    let filter = {      // Guardamos los valores de los inputs para enviarlo como filtro.
        category: '',
        name: '',
        species: ''
    }

    let item = 'products';  // Nos ayuda a distinguir entre productos y servicios.
    let cart = []           // Array del carrito.

    const handleCartItems = () => {

        const chBox = document.querySelectorAll('input[type=checkbox]');    // Quitamos los checks
        for (const i of chBox) {
            if (i.checked == true) {
                i.checked = false;
            }
        }
        callback(cart);
        cart = [];
    }

    const addItem = (e) => {
        e.preventDefault();
        const i = e.target;
        if (i.checked == true) {
            cart.push({
                id: i.dataset.id,
                type: i.dataset.type,
                name: i.dataset.name,
                price: i.dataset.price,
                q: 1
            });
        } else if (i.checked == false) {
            cart = cart.filter(item => item.id !== i.dataset.id || item.type !== i.dataset.type);
        }

    }

    const listeners = () => {
        // CheckBox listeners
        const chBox = document.querySelectorAll('input[type=checkbox]');
        for (const i of chBox) {
            i.addEventListener('input', addItem);
        }
    }

    const fillItems = (data) => {

        // Recogemos la tabla
        const tbody = document.querySelector('#auto-table-modal tbody');
        const thead = document.querySelector('#auto-table-modal thead');

        tbody.innerHTML = '';
        thead.innerHTML = '';

        const trHead = document.createElement('tr');
        const thName = document.createElement('th');
        const thCat = document.createElement('th');
        const thPrice = document.createElement('th');
        const thAdd = document.createElement('th');

        thPrice.classList.add('text-end');
        thAdd.classList.add('text-center');

        thName.textContent = 'Nombre';
        thCat.textContent = 'Categoría';
        thPrice.textContent = 'Precio';
        thAdd.textContent = 'Añadir';

        if (item == 'products') {
            const thSubcat = document.createElement('th');
            const thStock = document.createElement('th');
            const thRef = document.createElement('th');

            thSubcat.textContent = 'Subcategoría';
            thStock.textContent = 'Stock';
            thRef.textContent = 'Ref.';

            trHead.append(thName, thCat, thSubcat, thStock, thRef, thPrice, thAdd);
        } else {
            trHead.append(thName, thCat, thPrice, thAdd);
        }

        thead.append(trHead);


        data.data.forEach(p => {
            // Llenamos la tabla
            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdCat = document.createElement('td');
            const tdPrice = document.createElement('td');
            const tdCheck = document.createElement('td');
            const checkbox = document.createElement('input');

            tdPrice.classList.add('text-end');
            tdCheck.classList.add('text-center');
            checkbox.classList.add('form-check-input');

            checkbox.setAttribute('type', 'checkbox');
            checkbox.dataset.id = p.id;
            checkbox.dataset.type = item;
            checkbox.dataset.name = p.name;
            checkbox.dataset.price = p.price;

            tdName.textContent = p.name;
            tdCat.textContent = p.category;
            tdPrice.textContent = p.price;

            tdCheck.append(checkbox);

            if (item == 'products') {
                const tdSubcat = document.createElement('td');
                const tdStock = document.createElement('td');
                tdStock.classList.add('text-end');
                const tdCode = document.createElement('td');

                tdSubcat.textContent = p.subcategory;
                tdStock.textContent = p.stock;
                tdCode.textContent = p.code;

                tr.append(tdName, tdCat, tdSubcat, tdStock, tdCode, tdPrice, tdCheck);

            } else {
                tr.append(tdName, tdCat, tdPrice, tdCheck);
            }

            tbody.append(tr);

        });
        listeners();

    }

    const fillDatalist = (data) => {
        // Recogemos los selects para crear las options y los limpiamos
        const catSelect = document.querySelector('#category-select');
        const speSelect = document.querySelector('#species-select');
        catSelect.innerHTML = `<option value="">Categoría</option>`;
        speSelect.innerHTML = `<option value="">Especie</option>`;
        item == 'services' ?
            speSelect.setAttribute('disabled', 'true') :
            speSelect.removeAttribute('disabled');

        // Paginación
        Pagination(data, getProducts, fillDatalist, filter);

        let arrCat = [];
        let arrSpe = [];

        data.data.forEach(i => {
            // Llenamos un array con categorías y otro con especies para quitar los repetidos.
            if (i.species) {
                i.species.forEach(sp => {
                    arrSpe.push(sp);
                });
            }

            arrCat.push(i.category);
        });

        // Quitamos Repetidos
        arrSpe = [... new Set(arrSpe)];
        arrCat = [... new Set(arrCat)];

        // Creamos las options
        arrSpe.forEach(sp => {
            const speOp = document.createElement('option');
            speOp.value = sp;
            speOp.textContent = sp;
            speSelect.append(speOp);
        });

        arrCat.forEach(cat => {
            const catOp = document.createElement('option');
            catOp.value = cat;
            catOp.textContent = cat;
            catSelect.append(catOp);
        });

        fillItems(data)

    }

    // Busca productos o servicios según toque
    const findItems = () => {

        item == 'services' ?
            getServices(fillItems, filter) :
            getProducts(fillItems, filter)

    }

    // Cambia entre productos y servicios
    const changeItems = (e) => {
        e.preventDefault();

        for (const k in filter) {
            filter.k = '';
        }

        item = e.target.value;
        item == 'services' ?
            getServices(fillDatalist, filter) :
            getProducts(fillDatalist, filter)

    }

    // Establecemos filtros
    const capCategory = (e) => {
        e.preventDefault();
        filter.categoryPicker = e.target.value;
        findItems();
    }

    const capSpecies = (e) => {
        e.preventDefault();
        filter.speciesPicker = e.target.value;
        findItems();
    }

    const capName = (e) => {
        e.preventDefault();
        filter.namePicker = e.target.value;
        findItems();
    }

    useEffect(() => {
        getProducts(fillDatalist, filter);
    }, [])
    return (
        <>
            <div className="modal fade" id="addProductsModal" tabIndex="-1" aria-labelledby="addProductsModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addProductsModalLabel">Productos/Servicios</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* BÚSQUEDA */}
                            <div id="filter-form">
                                <div className="d-flex flex-row mb-3">
                                    <select className="form-select" onInput={changeItems}>
                                        <option value="products">Productos</option>
                                        <option value="services">Servicios</option>
                                    </select>
                                    <select className="form-select mx-2" id="category-select" onInput={capCategory}>
                                        <option value="">Categoría</option>
                                    </select>
                                    <select className="form-select" id="species-select" onInput={capSpecies}>
                                        <option value="">Especie</option>
                                    </select>
                                </div>
                                <div className="d-flex flex-row mb-3">
                                    <input className="form-control" type="search" placeholder="Buscar..." onInput={capName} />
                                </div>

                            </div>

                            {/* LISTA PRODUCTOS */}
                            <div className="d-flex flex-row table-responsive">
                                <table className="table table-striped table-hover" id="auto-table-modal">
                                    <thead />
                                    <tbody />
                                </table>

                            </div>
                            <nav aria-label="Table pagination">
                                <ul className="pagination" id="pagination">
                                </ul>
                            </nav>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-light"
                                data-bs-dismiss="modal"
                                aria-controls="offcanvas"
                                data-bs-target="#offcanvascart"
                                data-bs-toggle="offcanvas"
                            >
                                Cancelar
                            </button>
                            <a
                                href="#"
                                role="button"
                                id="add-products"
                                type="button"
                                className="btn btn-primary"
                                aria-controls="offcanvas"
                                data-bs-target="#offcanvascart"
                                data-bs-toggle="offcanvas"
                                data-bs-dismiss="modal"
                                onClick={handleCartItems}
                            >
                                Añadir
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export {
    AlertModal,
    NewPatient,
    NewVisit,
    ViewVisitsList,
    AddProducts
}