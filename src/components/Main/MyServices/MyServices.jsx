import React, { useState } from "react";
import style from "./MyServices.module.css";
import { useServices } from "../Catalog/ServicesContext"; // Убедитесь, что путь правильный
import { ModalOrder } from "./ModalOrder";
import { Modal } from "react-bootstrap";


export const MyServices = () => {
  const { services, removeService } = useServices();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handlePayment = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  const handleDelete = (serviceTitle) => {
    removeService(serviceTitle);
    alert(`Услуга "${serviceTitle}" удалена`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
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
              <img src={service.imageFile} alt={service.title} />
              <div className={style.serviceContent}>
                <h3>{service.title}</h3>
              </div>
              <div className={style.serviceActions}>
                <button
                  className={style.payButton}
                  onClick={() => handlePayment(service.title)}
                >
                  Оставить заявку
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

      <ModalOrder
        isOpen={isModalOpen}
        onClose={closeModal}
        serviceTitle={selectedService}
      />
    </div>
  );
};