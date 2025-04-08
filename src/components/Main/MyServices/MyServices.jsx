import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./MyServices.module.css";
import { useServices } from "../Catalog/ServicesContext";
import { ModalOrder } from "./ModalOrder";



export const MyServices = () => {
  const { services, removeService } = useServices();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка заказов с бэкенда
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders/my", {
        withCredentials: true,
      });
      setOrders(response.data);
    } catch (err) {
      setError("Не удалось загрузить статусы заказов.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
    fetchOrders(); // Обновляем список заказов после закрытия модального окна
  };

  // Получение статуса услуги
  const getServiceStatus = (serviceTitle) => {
    const order = orders.find((o) => o.service === serviceTitle);
    return order ? order.status : "Не заказана";
  };

  if (loading) {
    return <div className={style.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={style.error}>{error}</div>;
  }

  return (
    <div className={style.container}>
      <h1>Мои услуги</h1>
      {services.length === 0 ? (
        <p>У вас пока нет заказанных услуг.</p>
      ) : (
        <ul className={style.serviceList}>
          {services.map((service, index) => (
            <li key={index} className={style.serviceItem}>
              <img src={`http://localhost:8080${service.imgSrc}`} alt={service.title} />
              <div className={style.serviceContent}>
                <h3>{service.title}</h3>
                <p>Статус: {getServiceStatus(service.title)}</p>
              </div>
              <div className={style.serviceActions}>
                <button
                  className={style.payButton}
                  onClick={() => handlePayment(service.title)}
                  disabled={getServiceStatus(service.title) !== "Не заказана"}
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

export default MyServices;