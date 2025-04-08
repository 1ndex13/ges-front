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
import { AdminServices } from "./components/Main/Admin/AdminServices"; // Новый компонент
import { userStore } from "./api/UserStore";
import { ServicesProvider } from "./components/Main/Catalog/ServicesContext";
import { AdminUsers } from "./components/Main/Admin/AdminUsers";

function App() {
  const navigate = useNavigate();
  const isAdmin = userStore.roles.includes("ADMIN");

  const handleLogout = () => {
    userStore.logout(navigate);
  };

  return (
    <ServicesProvider>
      <Header isAuthenticated={userStore.isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/catalog"
          element={<Catalog isAuthenticated={userStore.isAuthenticated} userRole={userStore.roles} />}
        />
        <Route
          path="/admin/users"
          element={isAdmin ? <AdminUsers /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/services"
          element={isAdmin ? <AdminServices /> : <Navigate to="/" />}
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