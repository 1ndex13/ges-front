import React, { useState } from "react";
import style from "./Register.module.css";
import { Link } from 'react-router-dom';
import axios from "axios";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("Все поля обязательны для заполнения");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return false;
    }
    if (password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Введите корректный email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username,
        email,
        password,
        confirmPassword,
      });
      console.log("Успешная регистрация:", response.data);
      // Перенаправляем пользователя на страницу авторизации
      window.location.href = "/login";
    } catch (err) {
      if (err.response) {
        // Обработка ошибок от сервера
        if (err.response.status === 400) {
          setError("Пользователь с таким именем или email уже существует");
        } else {
          setError("Ошибка регистрации");
        }
      } else {
        setError("Ошибка сети или сервер недоступен");
      }
      console.error("Ошибка регистрации:", err);
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
          <h2>Регистрация</h2>
          <p><Link to="/login">Уже есть аккаунт?</Link></p>
        </div>
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Повторите пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};