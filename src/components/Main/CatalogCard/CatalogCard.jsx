import React from "react";
import style from "./CatalogCard.module.css"; // Импортируем стили
import { useNavigate, Link } from "react-router-dom";

export const CatalogCard = ({ isAuthenticated, addService, cardData, isFullView = false }) => {
  const navigate = useNavigate();

  const handleOrder = async () => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, перенаправляем на страницу регистрации
      navigate("/login");
    } else {
      // Если авторизован, добавляем услугу в "Мои услуги"
      const service = {
        title: cardData.title,
        description: cardData.description,
        price: cardData.price, // Добавляем цену
        category: cardData.category, // Добавляем категорию
        imgSrc: cardData.imgSrc,
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
    <div className={style.productContainer}>
      <div className={style.productImage}>
        <img src={cardData.imgSrc} alt={cardData.title} />
      </div>
      <div className={style.productDetails}>
        <h1 className={style.productTitle}>{cardData.title}</h1>
        <p className={style.productDescription}>{cardData.description}</p>
        <div className={style.productPrice}>
          <span>Стоимость работ:</span>
          <strong>от {cardData.price} ₽</strong>
        </div>
        {isFullView && (
          <ul className={style.productBenefits}>
            {cardData.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        )}
        {isFullView ? (
          <button className={style.orderButton} onClick={handleOrder}>
            Заказать услугу
          </button>
        ) : (
          <Link to={`/catalog/${cardData.id}`} className={style.detailsButton}>
            Подробнее
          </Link>
        )}
      </div>
    </div>
  );
};