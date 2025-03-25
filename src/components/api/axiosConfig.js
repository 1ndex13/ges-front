import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Убедитесь, что URL совпадает с вашим бэкендом
  withCredentials: true, // Включает отправку cookie
});

export default axiosInstance;