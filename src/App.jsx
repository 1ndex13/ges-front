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
import { Kar } from "./components/Main/components/Pages/Catalog/CatalogCard/Kar";
import { Bur } from "./components/Main/components/Pages/Catalog/CatalogCard/Bur";
import { Cor } from "./components/Main/components/Pages/Catalog/CatalogCard/Cor";
import { Geo } from "./components/Main/components/Pages/Catalog/CatalogCard/Geo";
import { Storage } from "./components/Main/components/Pages/Catalog/CatalogCard/Storage";
import { Rast } from "./components/Main/components/Pages/Catalog/CatalogCard/Rast";
import { Peno } from "./components/Main/components/Pages/Catalog/CatalogCard/Peno";
import { Bunk } from "./components/Main/components/Pages/Catalog/CatalogCard/Bunk";
import { Bit } from "./components/Main/components/Pages/Catalog/CatalogCard/Bit";
import { Transport } from "./components/Main/components/Pages/Catalog/CatalogCard/Transport";
import { Analyse } from "./components/Main/components/Pages/Catalog/CatalogCard/Analyse";
import { Auto } from "./components/Main/components/Pages/Catalog/CatalogCard/Auto";
import { ForgotPassword } from "./components/Main/components/Pages/ForgotPassword/ForgotPassword";
import { MyServices } from "./components/Main/components/Pages/MyServices/MyServices";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [myServices, setMyServices] = useState([]); // Состояние для хранения заказанных услуг

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
        <Route path="/" element={<Main />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={<Profile isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/my-services"
          element={<MyServices services={myServices} />} // Передаем список услуг
        />
        <Route
          path="/geo"
          element={<Geo isAuthenticated={isAuthenticated} addService={addService} />}
        />
        <Route
          path="/kar"
          element={<Kar isAuthenticated={isAuthenticated} addService={addService} />}
        />
        <Route
          path="/bur"
          element={<Bur isAuthenticated={isAuthenticated} addService={addService} />}
        />
        <Route
          path="/rast"
          element={<Rast isAuthenticated={isAuthenticated} addService={addService} />}
        />
        <Route
          path="/cor"
          element={<Cor isAuthenticated={isAuthenticated} addService={addService} />}
        />
        <Route
          path="/peno"
          element={<Peno isAuthenticated={isAuthenticated} addService={addService} />}
        />
        <Route
          path="/storage"
          element={<Storage isAuthenticated={isAuthenticated} addService={addService} />}
        />
        <Route
          path="/bunk"
          element={<Bunk isAuthenticated={isAuthenticated} addService={addService} />}
        />
        <Route
          path="/bit"
          element={<Bit isAuthenticated={isAuthenticated} addService={addService} />}
        />
        <Route
          path="/analyse"
          element={<Analyse isAuthenticated={isAuthenticated} addService={addService} />}
        />
        <Route
          path="/auto"
          element={<Auto isAuthenticated={isAuthenticated} addService={addService} />}
        />
        <Route
          path="/transport"
          element={<Transport isAuthenticated={isAuthenticated} addService={addService} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;