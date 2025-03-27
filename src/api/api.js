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

export const addProduct = async (formData) => {
  try {
    const response = await axiosInstance.post("/api/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении товара:", error);
    throw error;
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`/api/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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