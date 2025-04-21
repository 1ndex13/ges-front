import React from "react";
import { observer } from "mobx-react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import  oliman  from "../../../assets/img/oliman.png"
import { userStore } from "../../../api/UserStore";


export const Login = observer(() => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userStore.login(navigate);
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
          <h2>Авторизация</h2>
          <p>
            <Link to="/register">У вас еще нет аккаунта?</Link>
          </p>
        </div>
        <input
          type="text"
          placeholder="Логин"
          value={userStore.username}
          onChange={(e) => userStore.setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={userStore.password}
          onChange={(e) => userStore.setPassword(e.target.value)}
          required
        />
        {userStore.error && <p style={{ color: "red" }}>{userStore.error}</p>}
        <button type="submit">Войти</button>
        <div className={style.forgetPassword}>
          <p>
            <Link to="/forgot-password">Забыли пароль?</Link>
          </p>
        </div>
      </form>
    </div>
  );
});