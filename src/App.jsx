import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // Добавляем useNavigate
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
import { userStore } from "./components/api/UserStore";
import "./App.css";

function App() {
  const [myServices, setMyServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Добавляем хук для навигации

  // Синхронизация с userStore
  useEffect(() => {
    const syncUserStore = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.success) {
        userStore.setIsAuthenticated(true);
        userStore.username = user.username;
        userStore.setRoles(user.roles || []);
      }
      setIsLoading(false); // Завершаем загрузку после синхронизации
    };
    syncUserStore();
  }, []);

  const handleLogout = () => {
    userStore.logout(navigate);
    setMyServices([]);
  };

  const addService = (service) => {
    setMyServices((prev) => [...prev, service]);
  };

  // Пока идет загрузка, показываем индикатор (или ничего)
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <Header isAuthenticated={userStore.isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/catalog"
          element={
            <Catalog
              isAuthenticated={userStore.isAuthenticated}
              userRole={userStore.roles}
            />
          }
        />
        <Route
          path="/catalog/:id"
          element={<FullCard isAuthenticated={userStore.isAuthenticated} addService={addService} />}
        />
        <Route path="/" element={<MainContent />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile isAuthenticated={userStore.isAuthenticated} />} />
        <Route path="/my-services" element={<MyServices services={myServices} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;