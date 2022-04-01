import { useEffect } from "react";

function CustomersList() {
    

    useEffect(() => {

        


    }, [])


    const handleClean = (e) => {
        e.preventDefault();

        
    }


    const captureUser = (e) => {
        e.preventDefault();
        
    }

    const captureCustomer = (e) => {
        e.preventDefault();
       
    }

    const capturePatient = (e) => {
        e.preventDefault();
        
    }
    const captureSpecies = (e) => {
        e.preventDefault();
        
    }
    const captureSterilised = (e) => {
        e.preventDefault();
        
    }
    return (
        <div className="container">
            <div className="d-flex flex-row justify-content-between">
                <form>
                    <div className="row">
                        <div className="mb-3 col-auto">
                            <label htmlFor="vet-picker" className="form-label">Veterinaria/o:</label>
                            <select type="text" id="vet-picker" className="form-select" onInput={captureUser}></select>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="customer-picker" className="form-label">Cliente:</label>
                            <input id="customer-picker" className="form-control" list="datalist-customers" placeholder="Buscar..." onInput={captureCustomer}></input>
                            <datalist id="datalist-customers"></datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="patient-picker" className="form-label">Paciente:</label>
                            <input id="patient-picker" className="form-control" list="datalist-patients" placeholder="Buscar..." onInput={capturePatient}></input>
                            <datalist id="datalist-patients"></datalist>
                        </div>
                        <div className="mb-3 col-auto">
                            <label htmlFor="species-picker" className="form-label">Especie:</label>
                            <select type="text" id="species-picker" className="form-select" onInput={captureSpecies}>
                                <option value=''>Select...</option>
                                <option>Canis Familiaris</option>
                                <option>Felis Catus</option>
                                <option>Pogona Vitticeps</option>
                                <option>Nymphicus Hollandicus</option>
                            </select>
                        </div>
                        <div className="mb-3 col-auto d-flex flex-column">
                            <div>
                                <label htmlFor="checkbox-sterilised" className="form-label row">Esterilizado: </label>
                            </div>
                            <div className=" my-auto d-flex flex-row justify-content-center">
                                <input type="checkbox" id="checkbox-sterilised" name="completed" className="form-check-input row" onInput={captureSterilised} />
                            </div>
                        </div>
                        <div className="mb-3 col-auto flex-column d-flex justify-content-end">
                            <button type="button" className="btn btn-light" onClick={handleClean}>Limpiar...</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="d-flex flex-row table-responsive">
                <table className="table table-striped table-hover" id="patients-table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">e-mail</th>
                        </tr>
                    </thead>
                    <tbody id="patients-table-tbody">

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default CustomersList;