import jwt_decode from "jwt-decode";
import "../css/login.css";

function Logout() {
  localStorage.removeItem("token");

  return window.location = "/turdus/login";
}

function Login() {

  // Comprobamos si el usuario tiene sesión y le redirigimos
  if (localStorage.getItem("token")) window.location = "/turdus/dashboard";

  // Manejador del Login
  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    const config = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    const request = new Request("http://192.168.1.81:8888/api/login_check", config);
    fetch(request)
      .then(response => response.json())
      .then(
        response => {
          localStorage.setItem("token", response.token);

          const decoded = jwt_decode(response.token);
          if (localStorage.getItem("token")) window.location = "/turdus/dashboard";
        }

      )
      .catch(e => console.log('Error: ', e))

    e.target.username.value = '';
    e.target.password.value = '';

  }

  // Añadimos clases al body y html
  
  document.body.classList.add("body-signin", "text-center");
  document.getElementById("root").classList.add("form-signin");

  return (
    <>
        <form onSubmit={handleLogin}>
          <h1 class="h3 mb-3 fw-normal">Bienvenid@</h1>
          <div className="form-floating">
          <input type='text' id="floatingInput" name='username' placeholder='Username' className='form-control'></input>
          <label for="floatingInput">Username</label>
          </div>
          <div className="form-floating">
          <input type='password' id="floatingPassword" name='password' placeholder='Password' className='form-control' required></input>
          <label for="floatingPassword">Password</label>
          </div>
          <button type='submit' className='w-100 btn btn-lg btn-primary'>Login</button>
          <p class="mt-5 mb-3 text-muted">&copy; 2022 Turdus</p>
        </form>
    </>

  );
}

export { Login, Logout };
