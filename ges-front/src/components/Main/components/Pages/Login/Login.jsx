import React, { useState } from "react";
import style from "./Login.module.css";
import { Link } from 'react-router-dom';
import axios from "axios";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("im here");
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username: username,
        password: password
      });
      console.log("Успешная авторизация:", response.data);
      // Сохраните токен или данные пользователя в localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      // Перенаправьте пользователя на главную страницу
      window.location.href = "/";
    } catch (err) {
      setError("Неверный email или пароль");
      console.error("Ошибка авторизации:", err);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.textForm}>
        <img src="/a-clean-oilman-at-work.png" alt="" />
        <ul>
          <li>Бурение скважин</li>
          <li>Добыча нефти и газа</li>
          <li>Транспортировка и хранение</li>
        </ul>
      </div>
      <form className={style.authForm} onSubmit={handleSubmit}>
        <div className={style.authText}>
          <h2>Авторизация</h2>
          <p><Link to="/register">У вас еще нет аккаунта?</Link></p>
        </div>
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};