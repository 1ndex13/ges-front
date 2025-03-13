import React from "react";
import { observer } from "mobx-react"; // Добавьте observer
import style from "./Header.module.css";
import { Link } from "react-router-dom";
import { userStore } from "../../api/UserStore";

export const Header = observer(() => { // Оберните в observer
  return (
    <header>
      <div className={style.container}>
        <nav id="navMenu" className={style.navigation}>
          <Link to="/about">О нас</Link>
          <Link to="/catalog">Каталог</Link>
          {userStore.isAuthenticated && (
            <>
              <Link to="/my-services">Мои услуги</Link>
            </>
          )}
          <Link to="/">Global Energy Solution</Link>
          <Link to="/contacts">Контакты</Link>
          {userStore.isAuthenticated ? (
            <>
              <Link to="/profile">Профиль</Link>
              <Link onClick={() => userStore.logout(navigate)}>Выход</Link> 
            </>
          ) : (
            <Link to="/login">Вход</Link>
          )}
        </nav>
      </div>
    </header>
  );
});