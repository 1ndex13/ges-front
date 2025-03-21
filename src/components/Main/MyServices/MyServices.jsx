import React from "react";
import style from "./MyServices.module.css";
import { useServices } from "../Catalog/ServicesContext";// Убедитесь, что путь правильный

export const MyServices = () => {
  const { services, removeService } = useServices();

  const handlePayment = (serviceTitle) => {
    alert(`Оплата услуги: ${serviceTitle}`);
  };

  const handleDelete = (serviceTitle) => {
    removeService(serviceTitle);
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