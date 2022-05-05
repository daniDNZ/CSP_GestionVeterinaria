import Table from "./Table";

export default function Services() {
    return (
        <>
            <div className="d-flex flex-row justify-content-between">
                <h3>Servicios</h3>
                <button className="btn btn-outline-secondary py-0 px-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
                    <i className="bi bi-filter-left fs-3 text-secondary"></i>
                </button>
            </div>
            <hr />
            <Table selector='services' />
        </>
    )
}