import jwt_decode from "jwt-decode";

function Login() {

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

    const request = new Request('http://localhost:8888/api/login_check', config);
    fetch(request)
      .then(response => response.json())
      .then(
        response => {
          localStorage.setItem('token', response.token);

          const decoded = jwt_decode(response.token);
          console.log(decoded.roles);
        }
      )
      .catch(e => console.log('Error: ', e))

    e.target.username.value = "";
    e.target.password.value = "";
  }


  return (
    <>

      <div className="d-flex justify-content-around mx-5 mt-5">

        <form onSubmit={handleLogin} className='form-group'>
          <h3>Bienvenid@</h3>
          <br />
          <input type='text' name='username' placeholder="user" className="form-control"></input>
          <br />
          <input type='password' name='password' placeholder="password" className="form-control"></input>
          <br />
          <button type='submit' className="btn btn-primary btn-success">Login</button>
        </form>

      </div>
    </>

  );
}

export default Login;
