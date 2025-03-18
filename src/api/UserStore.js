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

  async login(navigate) {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username: this.username,
        password: this.password,
      });
      const data = response.data;
      if (data.success) {
        this.setIsAuthenticated(true);
        this.setRoles(data.roles || []);
        localStorage.setItem("user", JSON.stringify(data));
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
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
      navigate("/login");
    } catch (err) {
      this.setError(
        err.response?.status === 400
          ? "Пользователь с таким именем или email уже существует"
          : "Ошибка регистрации"
      );
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

  logout(navigate) {
    localStorage.removeItem("user");
    this.setIsAuthenticated(false);
    this.setRoles([]);
    this.username = "";
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
    this.error = "";
    navigate("/login"); // Перенаправление на страницу логина
  }
}

export const userStore = new UserStore();