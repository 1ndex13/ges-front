import { makeAutoObservable } from "mobx";
import axiosInstance from "./axiosConfig"; 

class UserStore {
  username = "";
  email = "";
  password = "";
  confirmPassword = "";
  error = "";
  isAuthenticated = false;
  roles = [];

  constructor() {
    makeAutoObservable(this);
    this.loadUserFromLocalStorage(); // Восстановление состояния (будет обновлено ниже)
  }

  setUsername(username) {
    this.username = username;
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(password) {
    this.password = password;
  }

  setConfirmPassword(confirmPassword) {
    this.confirmPassword = confirmPassword;
  }

  setError(error) {
    this.error = error;
  }

  setIsAuthenticated(isAuthenticated) {
    this.isAuthenticated = isAuthenticated;
  }

  setRoles(roles) {
    this.roles = roles;
  }

  // Загрузка данных пользователя (теперь из cookie, а не localStorage)
  loadUserFromLocalStorage() {
    // Поскольку токен теперь в cookie (HttpOnly), мы не можем напрямую его прочитать
    // Вместо этого запросим статус авторизации у бэкенда
    this.checkAuthStatus();
  }

  // Проверка статуса авторизации
  async checkAuthStatus() {
    try {
      const response = await axiosInstance.get('/api/auth/check'); // Эндпоинт для проверки авторизации (нужен на бэкенде)
      if (response.data.success) {
        this.setIsAuthenticated(true);
        this.setRoles(response.data.roles || []);
        this.setUsername(response.data.username || "");
        this.setEmail(response.data.email || "");
      } else {
        this.setIsAuthenticated(false);
        this.setRoles([]);
        this.setUsername("");
        this.setEmail("");
      }
    } catch (err) {
      this.setIsAuthenticated(false);
      this.setRoles([]);
      this.setUsername("");
      this.setEmail("");
      console.error("Ошибка проверки авторизации:", err);
    }
  }

  async login(navigate) {
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        username: this.username,
        password: this.password,
      });
      const data = response.data;
  
      if (data && data.success) {
        this.setIsAuthenticated(true);
        this.setRoles(data.roles || []); // Важно сохранить роли
        this.setUsername(data.username || "");
        this.setEmail(data.email || "");
        navigate("/profile");
      } else {
        this.setError("Неверный логин или пароль");
      }
    } catch (err) {
      this.setError("Ошибка авторизации");
      console.error("Ошибка авторизации:", err);
    }
  }
  async register(navigate) {
    if (!this.validateForm()) return;

    try {
      const response = await axiosInstance.post("/api/auth/register", {
        username: this.username,
        email: this.email,
        password: this.password,
      });

      if (response.data && response.data.success) {
        this.setUsername("");
        this.setEmail("");
        this.setPassword("");
        this.setConfirmPassword("");
        this.setError("");
        navigate("/login");
      } else {
        this.setError("Ошибка регистрации");
      }
    } catch (err) {
      this.setError(
        err.response?.status === 400
          ? "Пользователь с таким именем или email уже существует"
          : "Ошибка регистрации"
      );
      console.error("Ошибка регистрации:", err);
    }
  }

  // Валидация формы
  validateForm() {
    if (!this.username || !this.password || !this.confirmPassword) {
      this.setError("Все поля обязательны для заполнения");
      return false;
    }
    if (this.password !== this.confirmPassword) {
      this.setError("Пароли не совпадают");
      return false;
    }
    if (this.password.length < 6) {
      this.setError("Пароль должен содержать минимум 6 символов");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(this.email)) {
      this.setError("Введите корректный email");
      return false;
    }
    return true;
  }
  logout(navigate) {
    // Очистка состояния, cookie удалит бэкенд

    this.setIsAuthenticated(false);
    this.setRoles([]);
    this.setUsername("");
    this.setEmail("");
    this.setPassword("");
    this.setConfirmPassword("");
    this.setError("");
    navigate("/login");
    // Запрос на logout на бэкенде (если реализован)
    axiosInstance.post('/api/auth/logout').catch(err => console.error("Ошибка выхода:", err));
  }
}

export const userStore = new UserStore();