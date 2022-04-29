import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Login from "./pages/Login";
import { Logout } from "./components/UserValidation.js";
import Dashboard from "./pages/Dashboard";
import LandPage from "./pages/LandPage.js";
import './css/dashboard.css';
import "./css/landPage.css"
import './css/schedule.css'


function App() {
  if (!localStorage.getItem('token')) {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandPage />} />
          <Route path="turdus/dashboard" element={<Navigate to="/turdus/login" />} />
          <Route path="turdus/" element={<Navigate to="/turdus/login" />} />
          <Route path="turdus/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

    );
  }
  else {
    return (
      <>

        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LandPage />} />
            <Route exact path="turdus/" element={jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF") ? <Navigate to="dashboard" /> : <Navigate to="/" />} />
            <Route path="turdus/login" element={<Login />} />
            <Route path="turdus/logout" element={<Logout />} />
            <Route path="turdus/dashboard" element={jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF") ? <Dashboard comp={1} /> : <Navigate to="/turdus/login" />} />
            <Route path="turdus/orders" element={jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF") ? <Dashboard comp={2} /> : <Navigate to="/turdus/login" />} />
            <Route path="turdus/schedule" element={jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF") ? <Dashboard comp={3} /> : <Navigate to="/turdus/login" />} />
            <Route path="turdus/visits/:id" element={jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF") ? <Dashboard comp={4} /> : <Navigate to="/turdus/login" />} />
            <Route path="turdus/search" element={jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF") ? <Dashboard comp={5} /> : <Navigate to="/turdus/login" />} />
            <Route path="turdus/patients/:id" element={jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF") ? <Dashboard comp={6} /> : <Navigate to="/turdus/login" />} />
            <Route path="turdus/customers/:id" element={jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF") ? <Dashboard comp={7} /> : <Navigate to="/turdus/login" />} />
            <Route path="turdus/registrations" element={jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF") ? <Dashboard comp={8} /> : <Navigate to="/turdus/login" />} />
            <Route path="turdus/registrations/:name" element={jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF") ? <Dashboard comp={8} /> : <Navigate to="/turdus/login" />} />
            <Route path="turdus/waiting_room" element={jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF") ? <Dashboard comp={9} /> : <Navigate to="/turdus/login" />} />
            <Route path="turdus/visits/:id/bill" element={jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF") ? <Dashboard comp={10} /> : <Navigate to="/turdus/login" />} />
            <Route path="turdus/customers/:id/pay_debt" element={jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF") ? <Dashboard comp={11} /> : <Navigate to="/turdus/login" />} />
          </Routes>
        </BrowserRouter>

      </>
    );
  }

}

export default App;