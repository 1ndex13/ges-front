import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { FullCard } from "./components/Main/CatalogCard/FullCard";
import { MainContent } from "./components/Main/MainContent/MainContent";
import { Register } from "./components/Main/Register/Register";
import { Footer } from "./components/Footer/Footer";
import { AboutUs } from "./components/Main/AboutUs/AboutUs";
import { Catalog } from "./components/Main/Catalog/Catalog";
import { Contacts } from "./components/Main/Contacts/Contacts";
import { Login } from "./components/Main/Login/Login";
import { Profile } from "./components/Main/Profile/Profile";
import { ForgotPassword } from "./components/Main/ForgotPassword/ForgotPassword";
import { MyServices } from "./components/Main/MyServices/MyServices";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Состояние для роли пользователя
  const [myServices, setMyServices] = useState([]);

  // Проверяем, авторизован ли пользователь при загрузке приложения
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAuthenticated(true);
      setUserRole(user.role); // Устанавливаем роль пользователя
    }
  }, []);

  // Функция для обновления состояния авторизации
  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUserRole(userData.role); // Устанавливаем роль пользователя
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserRole(null); // Сбрасываем роль пользователя
  };

  // Функция для добавления услуги в "Мои услуги"
  const addService = (service) => {
    setMyServices([...myServices, service]);
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<FullCard />} />
        <Route path="/" element={<MainContent />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={<Profile isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/my-services"
          element={<MyServices services={myServices} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;