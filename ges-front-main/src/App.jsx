import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Register } from "./components/Main/components/Pages/Register/Register";
import { Footer } from "./components/Footer/Footer";
import { AboutUs } from "./components/Main/components/Pages/AboutUs/AboutUs";
import { Catalog } from "./components/Main/components/Pages/Catalog/Catalog";
import { Contacts } from "./components/Main/components/Pages/Contacts/Contacts";
import { Login } from "./components/Main/components/Pages/Login/Login";
import { Profile } from "./components/Main/components/Pages/Profile/Profile";
import { GasStation } from "./components/Main/components/Pages/Catalog/CatalogCard/GasStation";
import { ForgotPassword } from "./components/Main/components/Pages/ForgotPassword/ForgotPassword";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Проверяем, авторизован ли пользователь при загрузке приложения
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  // Функция для обновления состояния авторизации
  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true); // Обновляем состояние авторизации
  };


  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false); 
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/" element={<Main />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />} 
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={<Profile isAuthenticated={isAuthenticated} />}
        />
        <Route path="/gas-station"  element={<GasStation/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;