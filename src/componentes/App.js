import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Cadastro from "./Cadastro";
import Home from "./Home";
import Subscriptions from "./Subscriptions";
import UserContext from "./UserContext";

function App() {
  const [userData, setUserData] = useState(null);
  
  return (
    <UserContext.Provider value={{userData, setUserData}}>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;