import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Login from "./pages/Login";
import { Logout } from "./components/UserValidation.js";
import Dashboard from "./pages/Dashboard";
import LandPage from "./pages/LandPage.js";

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
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandPage />} />
          <Route exact path="turdus/" element={jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF") ? <Navigate to="dashboard" /> : <Navigate to="/" />} />
          <Route path="turdus/login" element={<Login />} />
          <Route path="turdus/logout" element={<Logout />} />
          <Route path="turdus/dashboard" element={jwt_decode(localStorage.getItem('token')).roles.includes("ROLE_STAFF") ? <Dashboard /> : <Navigate to="/turdus/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;