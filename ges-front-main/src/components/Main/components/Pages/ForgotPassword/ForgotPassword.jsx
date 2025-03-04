import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./ForgotPassword.module.css";


export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/forgot-password", {
        email,
      });
      console.log("Успешно:", response.data);
      setSuccess("Письмо для сброса пароля отправлено на ваш email.");
      setError("");
    } catch (err) {
        const errorMessage = err.response?.data?.message || "Не удалось отправить запрос";
        setError("Ошибка: " + errorMessage);
        setSuccess("");
        console.error("Ошибка:", err);
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
          <h2>Восстановление пароля</h2>
          <p>
            <Link to="/login">Вернуться к авторизации</Link>
          </p>
        </div>
        <input
          type="email"
          placeholder="Введите ваш email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};