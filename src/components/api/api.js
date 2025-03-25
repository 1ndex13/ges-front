import axiosInstance from "./axiosConfig";

export const getProducts = async () => {
  try {
    console.log('Fetching products...');
    const response = await axiosInstance.get("/api/products");
    console.log('Products fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении товара:", error);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axiosInstance.post("/api/products", product);
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении товара:", error);
    throw error;
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axiosInstance.put(`/api/products/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении товара:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при удалении товара:", error);
    throw error;
  }
};