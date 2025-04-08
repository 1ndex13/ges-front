import React, { useState } from "react";
import { observer } from "mobx-react";
import style from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { userStore } from "../../api/UserStore";

export const Header = observer(() => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    userStore.logout(navigate);
  };

  const isAdmin = userStore.roles.includes("ADMIN");

  return (
    <header>
      <div className={style.container}>
        <nav id="navMenu" className={`${style.navigation} ${isMenuOpen ? style.open : ""}`}>
          <Link to="/about">О нас</Link>
          <Link to="/catalog">Каталог</Link>
          {userStore.isAuthenticated && (
            <>
              {isAdmin ? (
                <Link to="/admin/services">Заказы</Link>
              ) : (
                <Link to="/my-services">Мои услуги</Link>
              )}
            </>
          )}
          <Link to="/">Global Energy Solution</Link>
          <Link to="/contacts">Контакты</Link>
          {userStore.isAuthenticated ? (
            <>
              {isAdmin ? (
                <Link to="/admin/users">Пользователи</Link>
              ) : (
                <Link to="/profile">Профиль</Link>
              )}
              <Link onClick={handleLogout}>Выход</Link>
            </>
          ) : (
            <Link to="/login">Вход</Link>
          )}
        </nav>
        <div className={style.burger} onClick={toggleMenu}>
          <div className={style.burgerLine}></div>
          <div className={style.burgerLine}></div>
          <div className={style.burgerLine}></div>
        </div>
      </div>
    </header>
  );
});