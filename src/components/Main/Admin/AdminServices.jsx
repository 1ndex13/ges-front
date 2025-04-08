import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../MyServices/MyServices.module.css";

export const AdminServices = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/orders", {
          withCredentials: true,
        });
        setOrders(response.data);
      } catch (err) {
        setError("Ошибка при загрузке заказов");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/orders/${orderId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      setError("Ошибка при обновлении статуса");
      console.error(err);
    }
  };

  if (loading) return <div className={style.container}>Загрузка...</div>;
  if (error) return <div className={style.container}>{error}</div>;

  return (
    <div className={style.container}>
      <h1>Статистика услуг</h1>
      {orders.length === 0 ? (
        <p>Нет заказанных услуг.</p>
      ) : (
        <ul className={style.serviceList}>
          {orders.map(order => (
            <li key={order.id} className={style.serviceItem}>
              <div className={style.serviceContent}>
                <h3>{order.service}</h3>
                <p>Пользователь: {order.userName}</p>
                <p>Дата заказа: {new Date(order.orderDate).toLocaleString()}</p>
              </div>
              <div className={style.serviceActions}>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="В обработке">В обработке</option>
                  <option value="Выполняется">Выполняется</option>
                  <option value="Завершено">Завершено</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

