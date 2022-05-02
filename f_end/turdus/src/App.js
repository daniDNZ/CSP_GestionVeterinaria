import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/UserValidation";
import { Logout } from "./components/UserValidation.js";
import Dashboard from "./pages/Dashboard";
import LandPage from "./pages/LandPage.js";
import './css/dashboard.css';
import "./css/landPage.css";
import './css/schedule.css';
import { UserProvider } from "./context/context";


function App() {


  return (

    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route exact path="turdus/*" element={localStorage.getItem('token') ? <Dashboard /> : <Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>

  )

}

export default App;