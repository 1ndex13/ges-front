import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./CatalogCard.module.css";

export const Bur = ({ isAuthenticated, addService }) => {
  const navigate = useNavigate();

  const handleOrder = () => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, перенаправляем на страницу регистрации
      navigate("/register");
    } else {
      // Если авторизован, добавляем услугу в "Мои услуги"
      const service = {
        title: "Бурение скважин",
        description: "«Global Energy Solution» является лидером в области бурения скважин для извлечения нефти и газа, используя передовые технологии и оборудование.",
        imgSrc: "./oilgas.png",
      };
      addService(service); // Передаем услугу в функцию добавления
      navigate("/my-services"); // Перенаправляем на страницу "Мои услуги"
    }
  };

  return (
    <>
      <div className={style.productContainer}>
        <div className={style.productImage}>
          <img src="./oilgas.png" alt="Бурение скважин" />
        </div>
        <div className={style.productDetails}>
          <h1 className={style.productTitle}>Бурение скважин</h1>
          <p className={style.productDescription}>
            «Global Energy Solution» является лидером в области бурения скважин для извлечения нефти и газа, используя передовые технологии и оборудование.
          </p>
          <div className={style.productPrice}>
            <span>Стоимость работ:</span>
            <strong>от 2 500 000 ₽</strong>
          </div>
          <ul className={style.productBenefits}>
            <li>Использование современных буровых установок</li>
            <li>Высокая скорость выполнения работ</li>
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