import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./CatalogCard.module.css";

export const Kar = ({ isAuthenticated, addService }) => {
  const navigate = useNavigate();

  const handleOrder = () => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, перенаправляем на страницу регистрации
      navigate("/register");
    } else {
      // Если авторизован, добавляем услугу в "Мои услуги"
      const service = {
        title: "Каротажные исследования",
        description: "«Global Energy Solution» проводит каротажные исследования для оптимизации добычи и повышения эффективности разработки месторождений.",
        imgSrc: "./kar.png",
      };
      addService(service); // Передаем услугу в функцию добавления
      navigate("/my-services"); // Перенаправляем на страницу "Мои услуги"
    }
  };

  return (
    <>
      <div className={style.productContainer}>
        <div className={style.productImage}>
          <img src="./kar.png" alt="Каротажные исследования" />
        </div>
        <div className={style.productDetails}>
          <h1 className={style.productTitle}>Каротажные исследования</h1>
          <p className={style.productDescription}>
            «Global Energy Solution» проводит каротажные исследования для оптимизации добычи и повышения эффективности разработки месторождений.
          </p>
          <div className={style.productPrice}>
            <span>Стоимость работ:</span>
            <strong>от 1 800 000 ₽</strong>
          </div>
          <ul className={style.productBenefits}>
            <li>Точный анализ пластов</li>
            <li>Использование современного оборудования</li>
            <li>Оперативное предоставление отчетов</li>
          </ul>
          <button className={style.orderButton} onClick={handleOrder}>
            Заказать услугу
          </button>
        </div>
      </div>
    </>
  );
};