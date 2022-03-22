import jwt_decode from "jwt-decode";

function Logout() {
    if (localStorage.getItem("token")) localStorage.removeItem("token");


    return window.location = "/";
}

// Manejador del Login
const HandleLogin = (e) => {
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

                if (jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF")) window.location = "/turdus/dashboard";
                else if (jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_USER")) window.location = "/";

            }

        )
        .catch(e => console.log('Error: ', e))

    e.target.username.value = '';
    e.target.password.value = '';
}


export { Logout, HandleLogin };
