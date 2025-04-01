import { createContext, useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite'; // Добавляем observer для MobX
import { userStore } from '../../../api/UserStore';

const ServicesContext = createContext();

export const ServicesProvider = observer(({ children }) => {
  const getStorageKey = () => {
    const username = userStore.username || 'guest';
    return `myServices_${username}`;
  };

  const [services, setServices] = useState(() => {
    const savedServices = localStorage.getItem(getStorageKey());
    return savedServices ? JSON.parse(savedServices) : [];
  });

  // Синхронизация с localStorage при изменении services
  useEffect(() => {
    localStorage.setItem(getStorageKey(), JSON.stringify(services));
  }, [services]);

  // Синхронизация с username из userStore
  useEffect(() => {
    const savedServices = localStorage.getItem(getStorageKey());
    setServices(savedServices ? JSON.parse(savedServices) : []);
  }, [userStore.username]); // Оставляем, но теперь с observer это будет работать лучше

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
});

export const useServices = () => useContext(ServicesContext);