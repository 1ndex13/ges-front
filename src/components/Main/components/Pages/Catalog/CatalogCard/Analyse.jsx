import React from "react";
import style from "./CatalogCard.module.css";
import { useNavigate } from "react-router-dom";

export const Analyse = ({ isAuthenticated, addService }) => {
  const navigate = useNavigate();

  const handleOrder = () => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, перенаправляем на страницу регистрации
      navigate("/login");
    } else {
      // Если авторизован, добавляем услугу в "Мои услуги"
      const service = {
        title: "Анализ проектов",
        description: "Комплексный анализ проектов от геологии до финансово-налоговых аспектов",
        imgSrc: "./money.png",
      };
      addService(service); // Передаем услугу в функцию добавления
      navigate("/my-services"); // Перенаправляем на страницу "Мои услуги"
    }
  };

  return (
    <>
      <div className={style.productContainer}>
        <div className={style.productImage}>
          <img src="./money.png" alt="Анализ проектов" />
        </div>
        <div className={style.productDetails}>
          <h1 className={style.productTitle}>Анализ проектов</h1>
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