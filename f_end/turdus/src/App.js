import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import { TokenContext } from "./context/Context.js"
import { Login, Logout } from "./pages/Login";
import Home from "./pages/Home";

function App() {

  const [tokenDecrypt, setTokenDecrypt] = useState({});

  return (
    <TokenContext.Provider value={{ tokenDecrypt, setTokenDecrypt }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="turdus/" element={localStorage.token ? <Navigate to="dashboard" /> : <Navigate to="login" />} />
          <Route path="turdus/login" element={<Login />} />
          <Route path="turdus/logout" element={<Logout />} />
          <Route path="turdus/dashboard" element={localStorage.token ? <Home /> : <Navigate to="/turdus/login" />} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}

export default App;