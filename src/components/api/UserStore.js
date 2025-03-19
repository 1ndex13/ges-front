import { makeAutoObservable } from "mobx";
import axios from "axios";

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
    this.loadUserFromLocalStorage(); // Восстановление состояния из localStorage
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

  // Загрузка данных пользователя из localStorage
  loadUserFromLocalStorage() {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      this.setIsAuthenticated(true);
      this.setRoles(parsedUser.roles || []);
      this.setUsername(parsedUser.username || "");
      this.setEmail(parsedUser.email || "");
    }
  }

  async login(navigate) {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username: this.username,
        password: this.password,
      });
      const data = response.data;

      if (data && data.success) {
        this.setIsAuthenticated(true);
        this.setRoles(data.roles || []); // Исправлено: добавлено значение по умолчанию
        localStorage.setItem("user", JSON.stringify(data)); // Сохранение данных в localStorage
        navigate("/profile"); // Перенаправление на страницу профиля
      } else {
        this.setError("Неверный логин или пароль");
      }
    } catch (err) {
      this.setError("Ошибка авторизации");
      console.error("Ошибка авторизации:", err);
    }
  }

  async register(navigate) {
    if (!this.validateForm()) return; // Валидация формы перед отправкой

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username: this.username,
        email: this.email,
        password: this.password,
      });

      if (response.data && response.data.success) {
        // Очистка полей после успешной регистрации
        this.setUsername("");
        this.setEmail("");
        this.setPassword("");
        this.setConfirmPassword("");
        this.setError("");
        navigate("/login"); // Перенаправление на страницу логина
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

  // Выход из системы
  logout(navigate) {
    localStorage.removeItem("user"); // Удаление данных из localStorage
    this.setIsAuthenticated(false);
    this.setRoles([]);
    this.setUsername("");
    this.setEmail("");
    this.setPassword("");
    this.setConfirmPassword("");
    this.setError("");
    navigate("/login"); // Перенаправление на страницу логина
  }
}

export const userStore = new UserStore();