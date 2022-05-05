import { useParams } from "react-router-dom";
import { addUpdateUser, getOneUser, changePswd } from "../api/ApiUser";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/context";

function UserProfile() {
    const { user } = useContext(UserContext);

    const { id } = useParams();
    let name, lastName;

    // Manejador datos del formulario
    const handleFData = (e) => {
        e.preventDefault();

        const fData = new FormData(e.target);
        addUpdateUser(fData, 'update', id);   // Llamamos a la petición indicando la acción (add | update)
    }

    const handlePswd = (e) => {
        e.preventDefault();

        const fData = new FormData(e.target);

        if(fData.get('password') === fData.get('passwordRepeat')) {
            changePswd(fData, id);
        }
    }

    const handleUser = (data) => {

        name = data.name;
        lastName = data.lastName;

        document.getElementById("userName").value = data.name;
        document.getElementById("userLastname").value = data.lastName;
        document.getElementById("userCollegiate").value = data.collegiate;
        document.getElementById("userUsername").value = data.username;
        document.getElementById("userPhone").value = data.phone;
        document.getElementById("userEmail").value = data.email;
        document.getElementById("userDni").value = data.dni;

    }

    const addEvents = () => {
        const formProfile = document.querySelector('#auto-form');
        formProfile.addEventListener('submit', handleFData);

        const formPswd = document.querySelector('#change-pswd');
        formPswd.addEventListener('submit', handlePswd);
    }

    useEffect(() => {

        getOneUser(handleUser, id);
        addEvents(handleFData);

    }, [])

    return (
        <>
        <h3>Perfil de {user.name}</h3>
            <form id="auto-form">
                <div id="form-row-1" className="row">
                    <div className="d-flex flex-row justify-content-between" id="form-title">
                        <div className="d-flex flex-row">
                            <h3 className="col-auto" id="userViewPage"> </h3>
                        </div>
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userName" className="form-label">Nombre:</label>
                        <input type="text" id="userName" name="name" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userLastname" className="form-label" >Apellidos:</label>
                        <input type="text" id="userLastname" name="last_name" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userCollegiate" className="form-label" >Colegiado Nº:</label>
                        <input type="text" id="userCollegiate" name="collegiate" className="form-control" />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userUsername" className="form-label" >Usuario:</label>
                        <input type="text" id="userUsername" name="username" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userPhone" className="form-label">Teléfono:</label>
                        <input type="text" id="userPhone" name="phone" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userEmail" className="form-label">Email:</label>
                        <input type="email" id="userEmail" name="email" className="form-control" required />
                    </div>
                    <div className="mb-3 col-auto">
                        <label htmlFor="userDni" className="form-label">DNI:</label>
                        <input type="text" id="userDni" name="dni" className="form-control" />
                    </div>
                </div>
                <div id="form-row-2" className="row">
                    <div className="mb-3 col-auto">
                        <label htmlFor="userPic" className="form-label" >Foto:</label>
                        <input type="file" id="userPic" name="pic" className="form-control" />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
            <hr />
            <h3>Cambiar Contraseña</h3>
            <form id="change-pswd">
                <div id="form-row-2" className="row">
                    <div className="mb-3 col-auto">
                        <label htmlFor="userPassword" className="form-label" >Nueva contraseña:</label>
                        <input type="password" id="userPassword" name="password" className="form-control" />
                        <label htmlFor="userPasswordRepeat" className="form-label" >Repetir contraseña:</label>
                        <input type="password" id="userPasswordRepeat" name="passwordRepeat" className="form-control" />
                    </div>
                </div>
                <button type="submit" className="btn btn-secondary"> Actualizar </button>

            </form>


        </>
    )
}

export default UserProfile;