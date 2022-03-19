import { HandleLogin } from "../components/UserValidation";
import jwt_decode from "jwt-decode";
import "../css/login.css";


function Login() {
  // Comprobamos si el usuario tiene sesión y le redirigimos

  if (localStorage.getItem('token')) {
    if (jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF")) window.location = "/turdus/dashboard";
    else if (jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_USER")) window.location = "/";
  }

  // Añadimos clases al body y html

  document.body.classList.add("body-signin", "text-center");
  document.getElementById("root").classList.add("form-signin");

  return (
    <>
      <form onSubmit={HandleLogin}>
        <h1 className="h3 mb-3 fw-normal">Bienvenid@</h1>
        <div className="form-floating">
          <input type='text' id="floatingInput" name='username' placeholder='Username' className='form-control'></input>
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating">
          <input type='password' id="floatingPassword" name='password' placeholder='Password' className='form-control' required></input>
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button type='submit' className='w-100 btn btn-lg btn-primary'>Login</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2022 Turdus</p>
      </form>
    </>

  );
}

export default Login;
