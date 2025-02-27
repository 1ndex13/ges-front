// App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Register } from './components/Main/components/Pages/Register/Register';
import { Footer } from './components/Footer/Footer';
import { AboutUs } from './components/Main/components/Pages/AboutUs/AboutUs'; // Импортируйте AboutUs
import { Catalog } from './components/Main/components/Pages/Catalog/Catalog'; // Добавим Catalog
import { Contacts } from './components/Main/components/Pages/Contacts/Contacts'; // Добавим Contacts
import { Login } from './components/Main/components/Pages/Login/Login'; // Добавим Login
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/about" element={<AboutUs />} /> {/* Страница "О нас" */}
        <Route path="/catalog" element={<Catalog />} /> {/* Страница "Каталог" */}
        <Route path="/" element={<Main />} /> {/* Главная страница */}
        <Route path="/contacts" element={<Contacts />} /> {/* Страница "Контакты" */}
        <Route path="/login" element={<Login />} /> {/* Страница "Вход" */}
        <Route path="/register" element={<Register />} /> {/* Страница "Авторизации" */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;