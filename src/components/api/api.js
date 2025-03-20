import axios from "axios";

// Добавление товара
export const addProduct = async (product) => {
  try {
    const response = await axios.post("http://localhost:8080/api/products", product, {
      auth: {
        username: "admin",
        password: "admin123",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении товара:", error);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/products/${id}`, product, {
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