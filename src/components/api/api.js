import axios from "axios";

// Добавление товара
export const getProducts = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/products", {
      auth: {
        username: "admin",
        password: "admin123",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении товара:", error);
    throw error;
  }
};



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

export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/products/${id}`,updatedProduct, {
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

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/products/${productId}`, {
      auth: {
        username: "admin",
        password: "admin123",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при удалении товара:", error);
    throw error;
  }
};



