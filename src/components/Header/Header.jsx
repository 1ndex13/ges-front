import React from "react";
import style from "./Header.module.css";
import { Link } from "react-router-dom";

export const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header>
      <div className={style.container}>
        <nav id="navMenu" className={style.navigation}>
          <Link to="/about">О нас</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/">Global Energy Solution</Link>
          <Link to="/contacts">Контакты</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile">Профиль</Link>
              <button onClick={onLogout} className={style.logoutButton}>
                Выйти
              </button>
            </>
          ) : (
            <Link to="/login">Вход</Link>
          )}
        </nav>
      </div>
    </header>
  );
};