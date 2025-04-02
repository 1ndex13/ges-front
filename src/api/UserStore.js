import { makeAutoObservable } from "mobx";
import axiosInstance from "./axiosConfig";

class UserStore {
  // Auth fields
  username = "";
  email = "";
  password = "";
  confirmPassword = "";
  error = "";
  isAuthenticated = false;
  roles = [];
  isLoading = false;

  // Profile fields
  nickname = "";
  firstName = "";
  lastName = "";
  birthDate = "";
  avatar = "";

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  // Core setters
  setUsername = (username) => (this.username = username);
  setEmail = (email) => (this.email = email);
  setPassword = (password) => (this.password = password);
  setConfirmPassword = (confirmPassword) => (this.confirmPassword = confirmPassword);
  setError = (error) => (this.error = error);
  setIsAuthenticated = (isAuthenticated) => (this.isAuthenticated = isAuthenticated);
  setRoles = (roles) => (this.roles = roles);
  setIsLoading = (isLoading) => (this.isLoading = isLoading);

  // Profile setters
  setNickname = (nickname) => (this.nickname = nickname);
  setFirstName = (firstName) => (this.firstName = firstName);
  setLastName = (lastName) => (this.lastName = lastName);
  setBirthDate = (birthDate) => (this.birthDate = birthDate);
  setAvatar = (avatar) => (this.avatar = avatar);

  // Unified user data setter
  setUser = (userData) => {
    this.username = userData.username || "";
    this.email = userData.email || "";
    this.roles = userData.roles || [];
    this.isAuthenticated = !!userData.success;
    this.nickname = userData.nickname || "";
    this.firstName = userData.firstName || "";
    this.lastName = userData.lastName || "";
    this.birthDate = userData.birthDate || "";
    this.avatar = userData.avatar || "";
    this.error = "";
  };

  // Auth methods
  login = async (navigate) => {
    this.setIsLoading(true);
    try {
      const { data } = await axiosInstance.post("/api/auth/login", {
        username: this.username,
        password: this.password,
      });

      if (data?.success) {
        this.setUser(data);
        localStorage.setItem("user", JSON.stringify({
          success: true,
          username: data.username,
          email: data.email,
          roles: data.roles,
          nickname: data.nickname,
          firstName: data.firstName,
          lastName: data.lastName,
          birthDate: data.birthDate,
          avatar: data.avatar
        }));
        navigate("/profile");
      } else {
        this.setError(data?.message || "Неверный логин или пароль");
      }
    } catch (err) {
      this.setError(err.response?.data?.message || "Ошибка авторизации");
    } finally {
      this.setIsLoading(false);
    }
  };

  logout = async (navigate) => {
    try {
      await axiosInstance.post("/api/auth/logout");
    } catch (err) {
      console.error("Ошибка выхода:", err);
    } finally {
      this.resetUserState();
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  // Profile methods
  loadFullProfile = async () => {
    try {
      const { data } = await axiosInstance.get("/users/profile");
      if (data) {
        this.setUser({
          ...data,
          success: true
        });
        localStorage.setItem("user", JSON.stringify({
          success: true,
          username: data.username,
          email: data.email,
          roles: data.roles,
          nickname: data.nickname,
          firstName: data.firstName,
          lastName: data.lastName,
          birthDate: data.birthDate,
          avatar: data.avatar
        }));
      }
    } catch (err) {
      console.error("Ошибка загрузки профиля:", err);
    }
  };

  // Storage methods
  loadFromLocalStorage = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        this.setUser(JSON.parse(userData));
      } catch (e) {
        console.error("Ошибка парсинга данных пользователя:", e);
      }
    }
  };

  // Reset methods
  resetUserState = () => {
    this.setIsAuthenticated(false);
    this.setRoles([]);
    this.setUsername("");
    this.setEmail("");
    this.setPassword("");
    this.setConfirmPassword("");
    this.setError("");
    this.setNickname("");
    this.setFirstName("");
    this.setLastName("");
    this.setBirthDate("");
    this.setAvatar("");
  };

  
}


export const userStore = new UserStore();