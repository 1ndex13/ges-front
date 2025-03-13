import { makeAutoObservable } from "mobx";
import axios from "axios";

class UserStore {
  username = "";
  email = "";
  password = "";
  confirmPassword = "";
  error = "";
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
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

  async login(navigate) {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username: this.username,
        password: this.password,
      });
      console.log("Успешная авторизация:", response.data);

      localStorage.setItem("user", JSON.stringify(response.data));
      this.setIsAuthenticated(true);
      navigate("/profile"); // Навигация после успешного входа
    } catch (err) {
      this.setError("Неверный логин или пароль");
      console.error("Ошибка авторизации:", err);
    }
  }

  async register(navigate) { // Принимаем navigate как параметр
    if (!this.validateForm()) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      });
      console.log("Успешная регистрация:", response.data);
      navigate("/login"); // Навигация после успешной регистрации
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          this.setError("Пользователь с таким именем или email уже существует");
        } else {
          this.setError("Ошибка регистрации");
        }
      } else {
        this.setError("Ошибка сети или сервер недоступен");
      }
      console.error("Ошибка регистрации:", err);
    }
  }

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

  logout(navigate) { // Принимаем navigate как параметр
    localStorage.removeItem("user");
    this.setIsAuthenticated(false);
    navigate("/login"); // Навигация после выхода
  }
}

export const userStore = new UserStore();