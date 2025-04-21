import React from "react";
import { observer } from "mobx-react";
import style from "./Register.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { userStore } from "../../../api/UserStore";
import  oliman  from "../../../assets/img/oliman.png"

export const Register = observer(() => {
  const navigate = useNavigate(); // Получаем функцию navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userStore.register(navigate); // Передаем navigate в userStore.register
  };

  return (
    <div className={style.container}>
      <div className={style.textForm}>
        <img src={oliman} alt="" />
        <ul>
          <li>Бурение скважин</li>
          <li>Добыча нефти и газа</li>
          <li>Транспортировка и хранение</li>
        </ul>
      </div>
      <form className={style.authForm} onSubmit={handleSubmit}>
        <div className={style.authText}>
          <h2>Регистрация</h2>
          <p><Link to="/login">Уже есть аккаунт?</Link></p>
        </div>
        <input
          type="text"
          placeholder="Логин"
          value={userStore.username}
          onChange={(e) => userStore.setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={userStore.email}
          onChange={(e) => userStore.setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={userStore.password}
          onChange={(e) => userStore.setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Повторите пароль"
          value={userStore.confirmPassword}
          onChange={(e) => userStore.setConfirmPassword(e.target.value)}
          required
        />
        {userStore.error && <p style={{ color: "red" }}>{userStore.error}</p>}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
});