import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import Chat from "./chat/Chat.jsx";
import "./App.css";
import api,{token} from "./api/axios.jsx";
import { useEffect, useState } from "react";
export default function App() {
  const [tokenCorrect, setTokenCorrect] = useState(false);

  useEffect(() => {
    if(!token){
      () =>setTokenCorrect(false);
      return
    }
    api
      .get("User/CheckToken")
      .then(() => setTokenCorrect(true))
      .catch(() => {
        setTokenCorrect(false);
      });
  }, []);
  return (
    <div className="body">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="Chat" element={tokenCorrect ? <Chat /> : <Login />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
