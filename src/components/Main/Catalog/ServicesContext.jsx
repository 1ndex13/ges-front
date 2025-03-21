// src/Scripts/ServicesContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ServicesContext = createContext();
const STORAGE_KEY = 'myServices'; // Ключ для localStorage

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState(() => {
    // При инициализации загружаем данные из localStorage
    const savedServices = localStorage.getItem(STORAGE_KEY);
    return savedServices ? JSON.parse(savedServices) : [];
  });

  // Сохраняем услуги в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  }, [services]);

  const addService = (service) => {
    setServices((prev) => {
      if (!prev.some((s) => s.title === service.title)) {
        return [...prev, service];
      }
      return prev;
    });
  };

  const removeService = (serviceTitle) => {
    setServices((prev) => prev.filter((service) => service.title !== serviceTitle));
  };

  return (
    <ServicesContext.Provider value={{ services, addService, removeService }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => useContext(ServicesContext);