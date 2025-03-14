import React from "react";
import style from "./MyServices.module.css";

export const MyServices = ({ services, removeService }) => {
  const handlePayment = (serviceTitle) => {
    // Логика для оплаты услуги
    alert(`Оплата услуги: ${serviceTitle}`);
  };

  const handleDelete = (serviceTitle) => {
    // Логика для удаления услуги
    removeService(serviceTitle); // Удаляем услугу по названию
    alert(`Услуга "${serviceTitle}" удалена`);
  };

  return (
    <div className={style.container}>
      <h1>Мои услуги</h1>
      {services.length === 0 ? (
        <p>У вас пока нет заказанных услуг.</p>
      ) : (
        <ul className={style.serviceList}>
          {services.map((service, index) => (
            <li key={index} className={style.serviceItem}>
              <img src={service.imgSrc} alt={service.title} />
              <div className={style.serviceContent}>
                <h1>{service.title}</h1>
              </div>
              <div className={style.serviceActions}>
                <button
                  className={style.payButton}
                  onClick={() => handlePayment(service.title)}
                >
                  Оплатить
                </button>
                <button
                  className={style.deleteButton}
                  onClick={() => handleDelete(service.title)}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};