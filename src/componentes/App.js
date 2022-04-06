import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Cadastro from "./Cadastro";
import UserContext from "./UserContext";

function App() {
  const [userData, setUserData] = useState([null, null]);
  
  return (
    <UserContext.Provider value={{userData, setUserData}}>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;