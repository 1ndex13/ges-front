import axios from "axios";

const API_URL = "/api/products"; // Используем относительный путь

// Добавление товара
export const addProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product, {
      auth: {
        username: "admin", // Логин администратора
        password: "admin123", // Пароль администратора
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении товара:", error);
    throw error;
  }
};

// Обновление товара
export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${"/api/products"}/${id}`, product, {
      auth: {
        username: "admin",
        password: "admin123",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении товара:", error);
    throw error;
  }
};