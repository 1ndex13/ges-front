// src/components/Header/Header.js
import style from "./Header.module.css";
import { Link } from 'react-router-dom'; // Import Link

export const Header = () => {
  return (
    <header>
      <div className={style.container}>
        <nav id="navMenu" className={style.navigation}>
          <Link to="/about">О нас</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/contacts">Корзина</Link>
          <Link to="/">Global Energy Solution</Link>
          <Link to="/contacts">Контакты</Link>
          <Link to="/login">Вход</Link>
        </nav>
      </div>
    </header>
  );
};