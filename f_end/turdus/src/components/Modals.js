import { useEffect } from "react";
import { addUpdatePatient, addUpdateVisit, findProducts, findServices } from "./ApiFetch";
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
    let filter = {
        category: '',
        name: '',
        species: ''
    }

    let item = 'Products';
    let cartItems = {
        products: [],
        services: []
    }

    const handleCartItems = () => {

        callback(cartItems);
    }

    const addItem = (e) => {
        e.preventDefault();
        const i = e.target;
        if (i.checked == true) {
            item == 'Products' ?
                cartItems.products.push(i.value) :
                cartItems.services.push(i.value)
        }

    }

    const listeners = () => {
        // CheckBox listeners
        const chBox = document.querySelectorAll('input[type=checkbox]');
        for (const i of chBox) {
            i.addEventListener('input', addItem);
        }
    }

    const fillProducts = (data) => {

        // Recogemos la tabla
        const tbody = document.querySelector('#auto-table-modal tbody');
        const thead = document.querySelector('#auto-table-modal thead');

        thead.innerHTML = 
            `
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Subcategoría</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Ref.</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Añadir</th>
                </tr>
            `;
        tbody.innerHTML = '';

        data.forEach(p => {
            // Llenamos la tabla
            const tr = document.createElement('tr');

            tr.innerHTML =
                `
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.subcategory}</td>
                <td class="text-end">${p.stock}</td>
                <td>${p.code}</td>
                <td class="text-end">${p.price}€</td>
                <td>
                    <input type="checkbox" class="form-check-input" value="${p.id}"/>
                </td>
            `
            tbody.append(tr);
            
        });
        listeners();
        
    }

    const fillServices = (data) => {
        
        // Recogemos la tabla
        const tbody = document.querySelector('#auto-table-modal tbody');
        const thead = document.querySelector('#auto-table-modal thead');

        thead.innerHTML = 
            `
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Añadir</th>
                </tr>
            `;
        tbody.innerHTML = '';

        data.forEach(s => {
            // Llenamos la tabla
            const tr = document.createElement('tr');

            tr.innerHTML =
                `
                <td>${s.name}</td>
                <td>${s.category}</td>
                <td class="text-end">${s.price}€</td>
                <td>
                    <input type="checkbox" class="form-check-input" value="${s.id}"/>
                </td>
            `
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
        if (item == 'Services') speSelect.setAttribute('disabled', 'true');

        let arrCat = [];
        let arrSpe = [];

        data.forEach(i => {
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

        item == 'Services' ? 
            fillServices(data) :
            fillProducts(data)
        
    }

    // Busca productos o servicios según toque
    const findItems = () => {

        item == 'Services' ? 
            findServices(fillServices, filter) :
            findProducts(fillProducts, filter)

    }

    // Cambia entre productos y servicios
    const changeItems = (e) => {
        e.preventDefault();

        for (const k in filter) {
            filter.k = '';
        }

        item = e.target.value;
        item == 'Services' ? 
            findServices(fillDatalist, filter) :
            findProducts(fillDatalist, filter)

    }

    // Establecemos filtros
    const capCategory = (e) => {
        e.preventDefault();
        filter.category = e.target.value;
        findItems();
    }

    const capSpecies = (e) => {
        e.preventDefault();
        filter.species = e.target.value;
        findItems();
    }

    const capName = (e) => {
        e.preventDefault();
        filter.name = e.target.value;
        findItems();
    }

    useEffect(() => {
        findProducts(fillDatalist, filter)
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
                                        <option value="Products">Productos</option>
                                        <option value="Services">Servicios</option>
                                    </select>
                                    <select className="form-select mx-2" id="category-select" onInput={capCategory}>
                                        <option value="">Categoría</option>
                                    </select>
                                    <select className="form-select" id="species-select" onInput={capSpecies}>
                                        <option value="">Especie</option>
                                    </select>
                                </div>
                                <div className="d-flex flex-row mb-3">
                                    <input className="form-control" type="search" placeholder="Buscar..." onInput={capName}/>
                                </div>

                            </div>

                            {/* LISTA PRODUCTOS */}
                            <div className="d-flex flex-row table-responsive">
                                <table className="table table-striped table-hover" id="auto-table-modal">
                                    <thead />
                                    <tbody />
                                </table>
                            </div>
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