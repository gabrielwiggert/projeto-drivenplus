import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Login from "./Login";
import Cadastro from "./Cadastro";
import Home from "./Home";
import Subscriptions from "./Subscriptions";
import SubscriptionsId from "./SubscriptionsId";
import UserContext from "./UserContext";

function App() {
  const [userData, setUserData] = useState(null);
  const [userSubscription, setUserSubscription] = useState("");
  const [userName, setUserName] = useState("");
  
  return (
    <UserContext.Provider value={{userData, setUserData, userSubscription, setUserSubscription, userName, setUserName}}>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/subscriptions/:idPlano" element={<SubscriptionsId />} />
          <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;