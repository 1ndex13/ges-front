import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { userStore } from "../../../api/UserStore";
import axiosInstance from "../../../api/axiosConfig";
import style from "./Profile.module.css";

export const Profile = observer(() => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userData, setUserData] = useState({
    nickname: "",
    email: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    avatar: null,
    previewAvatar: "",
  });

  useEffect(() => {
    if (!userStore.isAuthenticated) {
      navigate("/login");
    } else {
      // Загружаем данные из UserStore
      setUserData({
        nickname: userStore.nickname,
        email: userStore.email,
        firstName: userStore.firstName,
        lastName: userStore.lastName,
        birthDate: userStore.birthDate,
        avatar: null,
        previewAvatar: userStore.avatar || "/default-avatar.png",
      });
      
      // Загружаем свежие данные с сервера
      userStore.loadFullProfile();
    }
  }, [userStore.isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Размер файла не должен превышать 2MB");
        return;
      }
      if (!file.type.match("image.*")) {
        setError("Пожалуйста, выберите изображение");
        return;
      }
      setError("");
      setUserData((prev) => ({
        ...prev,
        avatar: file,
        previewAvatar: URL.createObjectURL(file),
      }));
    }
  };

  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const response = await axiosInstance.post("/users/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.avatarUrl;
    } catch (err) {
      console.error("Avatar upload error:", err);
      throw new Error("Не удалось загрузить аватар");
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axiosInstance.put("/users/profile", profileData);
      return response.data;
    } catch (err) {
      console.error("Profile update error:", err);
      throw new Error("Не удалось обновить профиль");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let avatarUrl = userData.previewAvatar;
      if (userData.avatar instanceof File) {
        avatarUrl = await uploadAvatar(userData.avatar);
      }

      const profileData = {
        nickname: userData.nickname,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        birthDate: userData.birthDate,
        avatar: avatarUrl,
      };

      const updatedUser = await updateProfile(profileData);
      
      // Обновляем данные в UserStore
      userStore.setUser({
        ...updatedUser,
        success: true
      });

      // Сохраняем в localStorage
      localStorage.setItem("user", JSON.stringify({
        success: true,
        username: updatedUser.username || userStore.username,
        email: updatedUser.email || userData.email,
        roles: updatedUser.roles || userStore.roles,
        nickname: updatedUser.nickname || userData.nickname,
        firstName: updatedUser.firstName || userData.firstName,
        lastName: updatedUser.lastName || userData.lastName,
        birthDate: updatedUser.birthDate || userData.birthDate,
        avatar: updatedUser.avatar || avatarUrl,
      }));

      setSuccess("Профиль успешно обновлен!");
      setTimeout(() => setSuccess(""), 3000);
      setEditMode(false);
    } catch (err) {
      setError(err.message || "Произошла ошибка при сохранении");
    } finally {
      setLoading(false);
    }
  };

  if (!userStore.isAuthenticated) {
    return null;
  }

  return (
    <div className={style.profilePage}>
      <div className={style.profileHeader}>
        <h1>Мой профиль</h1>
        {!editMode && (
          <Button
            variant="outline-primary"
            onClick={() => setEditMode(true)}
            className={style.editButton}
          >
            <FaEdit /> Редактировать
          </Button>
        )}
      </div>

      {error && <Alert variant="danger" className={style.alert}>{error}</Alert>}
      {success && <Alert variant="success" className={style.alert}>{success}</Alert>}

      <div className={style.profileContainer}>
        {editMode ? (
          <Form onSubmit={handleSubmit} className={style.profileForm}>
            <div className={style.avatarSection}>
              <div className={style.avatarWrapper}>
                <img
                  src={userData.previewAvatar}
                  alt="Аватар"
                  className={style.avatar}
                />
                <label htmlFor="avatar-upload" className={style.avatarUploadLabel}>
                  <span>Сменить фото</span>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className={style.avatarInput}
                  />
                </label>
              </div>
            </div>

            <Form.Group className={style.formGroup}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="nickname"
                value={userData.nickname}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className={style.formGroup}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className={style.formGroup}>
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                placeholder="Не указано"
              />
            </Form.Group>

            <Form.Group className={style.formGroup}>
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                placeholder="Не указана"
              />
            </Form.Group>

            <Form.Group className={style.formGroup}>
              <Form.Label>Дата рождения</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={userData.birthDate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <div className={style.formActions}>
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className={style.saveButton}
              >
                {loading ? "Сохранение..." : <><FaSave /> Сохранить</>}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setEditMode(false);
                  setError("");
                  // Восстанавливаем данные из UserStore
                  setUserData({
                    nickname: userStore.nickname,
                    email: userStore.email,
                    firstName: userStore.firstName,
                    lastName: userStore.lastName,
                    birthDate: userStore.birthDate,
                    avatar: null,
                    previewAvatar: userStore.avatar || "/default-avatar.png",
                  });
                }}
                disabled={loading}
                className={style.cancelButton}
              >
                <FaTimes /> Отмена
              </Button>
            </div>
          </Form>
        ) : (
          <div className={style.profileView}>
            <div className={style.avatarSection}>
              <img
                src={userStore.avatar || "/default-avatar.png"}
                alt="Аватар"
                className={style.avatar}
              />
            </div>

            <div className={style.userInfo}>
              <h2 className={style.username}>{userStore.nickname}</h2>
              <p className={style.userEmail}>{userStore.email}</p>

              {(userStore.firstName || userStore.lastName) && (
                <div className={style.infoBlock}>
                  <h4>Имя</h4>
                  <p>
                    {userStore.firstName} {userStore.lastName}
                  </p>
                </div>
              )}

              {userStore.birthDate && (
                <div className={style.infoBlock}>
                  <h4>Дата рождения</h4>
                  <p>{new Date(userStore.birthDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});