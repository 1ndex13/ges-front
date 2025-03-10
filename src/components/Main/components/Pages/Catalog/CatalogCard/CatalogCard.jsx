import React from "react";
import style from "./CatalogCard.module.css";
import { useNavigate } from "react-router-dom";

export const Analyse = ({ isAuthenticated, addService, title, description }) => {
  const navigate = useNavigate();

  const handleOrder = async () => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, перенаправляем на страницу регистрации
      navigate("/login");
    } else {
      // Если авторизован, добавляем услугу в "Мои услуги"
      const service = {
        title: "Анализ проектов",
        description: "Комплексный анализ проектов от геологии до финансово-налоговых аспектов",
        price: 500000.0, // Добавляем цену
        category: "Аналитика", // Добавляем категорию
        imgSrc: "./money.png",
      };
      try {
        // Отправляем данные на бэкенд
        const response = await fetch("http://localhost:8080/api/services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(service),
        });

        if (response.ok) {
          const savedService = await response.json();
          addService(savedService); // Добавляем услугу в состояние фронтенда
          navigate("/my-services"); // Перенаправляем на страницу "Мои услуги"
        } else {
          console.error("Ошибка при сохранении услуги");
        }
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
      }
    }
  };





  return (
    <>
      <div className={style.productContainer}>
        <div className={style.productImage}>
          <img src="./money.png" alt="Анализ проектов" />
        </div>
        <div className={style.productDetails}>
          <h1 className={style.productTitle}>{title}</h1>
          <p className={style.productDescription}>
            «Global Energy Solution» проводит комплексный анализ проектов, от геологических исследований до финансово-налоговых аспектов.
          </p>
          <div className={style.productPrice}>
            <span>Стоимость работ:</span>
            <strong>от 500 000 ₽</strong>
          </div>
          <ul className={style.productBenefits}>
            <li>Комплексный подход</li>
            <li>Опытные аналитики</li>
            <li>Оптимизация затрат</li>
          </ul>
          <button className={style.orderButton} onClick={handleOrder}>
            Заказать услугу
          </button>
        </div>
      </div>
    </>
  );
};