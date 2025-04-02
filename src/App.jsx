import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import { userStore } from "./api/UserStore";
import { ServicesProvider } from "./components/Main/Catalog/ServicesContext";
import { AdminUsers } from "./components/Main/Admin/AdminUsers";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Проверяем аутентификацию
        await userStore.checkAuthStatus();
        
        // Если пользователь аутентифицирован, загружаем полный профиль
        if (userStore.isAuthenticated) {
          await userStore.loadFullProfile();
        }
      } catch (error) {
        console.error("Ошибка инициализации приложения:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleLogout = () => {
    userStore.logout(navigate);
  };

  if (isLoading) {
    return <div className="loading-screen">Загрузка...</div>;
  }

  return (
    <ServicesProvider>
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
          path="/admin/users"
          element={
            userStore.roles.includes("ADMIN") ? <AdminUsers /> : <Navigate to="/" />
          }
        />
        <Route
          path="/catalog/:id"
          element={<FullCard isAuthenticated={userStore.isAuthenticated} />}
        />
        <Route path="/" element={<MainContent />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={<Profile isAuthenticated={userStore.isAuthenticated} />}
        />
        <Route path="/my-services" element={<MyServices />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </ServicesProvider>
  );
}

export default App;