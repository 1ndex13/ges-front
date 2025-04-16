import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../MyServices/MyServices.module.css";
import Chart from "chart.js/auto";

export const AdminServices = () => {
  const [orders, setOrders] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let chartInstance = null; // Переменная для хранения экземпляра диаграммы

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

    const fetchStatistics = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin/orders/statistics", {
          withCredentials: true,
        });
        setStatistics(response.data);
      } catch (err) {
        setError("Ошибка при загрузке статистики");
        console.error(err);
      }
    };

    fetchOrders();
    fetchStatistics();
  }, []);

  useEffect(() => {
    if (Object.keys(statistics).length > 0 && !loading) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = document.getElementById("orderChart").getContext("2d");
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(statistics),
          datasets: [
            {
              label: "Количество заказов",
              data: Object.values(statistics),
              backgroundColor: "#AAB9C9",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Количество заказов",
                font:{
                  family: "Oswald",
                  weight: 300,
                }
              },
            },
            x: {
              title: {
                display: true,
                text: "Услуги",
                font:{
                  family: "Oswald",
                  weight: 300,
                }
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Статистика заказов по услугам",
              font: {
                family: "Oswald",
                size: 18,
                weight: 300,
              },
            },
          },
        },
      });
    }

    // Очистка при размонтировании компонента
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [statistics, loading]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/orders/${orderId}/status`,
        newStatus,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      setOrders(orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      // Обновляем статистику после изменения статуса
      const response = await axios.get("http://localhost:8080/api/admin/orders/statistics", {
        withCredentials: true,
      });
      setStatistics(response.data);
    } catch (err) {
      setError("Ошибка при обновлении статуса");
      console.error(err);
    }
  };

  if (loading) return <div className={style.container}>Загрузка...</div>;
  if (error) return <div className={style.container}>{error}</div>;

  return (
    <div className={style.container}>
      <h1>Заказы</h1>

      {/* Диаграмма */}
      <div style={{ height: "400px", marginBottom: "40px" }}>
        <canvas id="orderChart"></canvas>
      </div>

      {/* Список заказов */}
      {orders.length === 0 ? (
        <p>Нет заказанных услуг.</p>
      ) : (
        <ul className={style.serviceList}>
          {orders.map((order) => (
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

export default AdminServices;