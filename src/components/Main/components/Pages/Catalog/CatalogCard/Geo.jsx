import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./CatalogCard.module.css";

export const Geo = ({ isAuthenticated, addService }) => {
  const navigate = useNavigate();

  const handleOrder = () => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, перенаправляем на страницу регистрации
      navigate("/register");
    } else {
      // Если авторизован, добавляем услугу в "Мои услуги"
      const service = {
        title: "Геологоразведка",
        description: "Геофизическое исследование для оценки месторождений полезных ископаемых",
        imgSrc: "./geo.png",
      };
      addService(service); // Передаем услугу в функцию добавления
      navigate("/my-services"); // Перенаправляем на страницу "Мои услуги"
    }
  };

  return (
    <>
      <div className={style.productContainer}>
        <div className={style.productImage}>
          <img src="./geo.png" alt="Геологоразведка" />
        </div>
        <div className={style.productDetails}>
          <h1 className={style.productTitle}>Геологоразведка</h1>
          <p className={style.productDescription}>
            «Global Energy Solution» предоставляет комплексные услуги по геологоразведке, включая сейсмические исследования и оценку месторождений полезных ископаемых.
          </p>
          <div className={style.productPrice}>
            <span>Стоимость работ:</span>
            <strong>от 1 000 000 ₽</strong>
          </div>
          <ul className={style.productBenefits}>
                      <li>Точные расчеты</li>
                      <li>Эффективная работа</li>
                      <li>Минимизация воздействия на окружающую среду</li>
                    </ul>
          <button className={style.orderButton} onClick={handleOrder}>
            Заказать услугу
          </button>
        </div>
      </div>
    </>
  );
};