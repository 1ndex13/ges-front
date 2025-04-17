import React, { useState } from "react";
import axiosInstance from "../../../api/axiosConfig";
import style from './MyServices.module.css';
import { Modal } from "react-bootstrap";

export const ModalOrder = ({ isOpen, onClose, serviceTitle }) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
    general: "",
  });

  const validateForm = () => {
    const newErrors = {
      lastName: "",
      firstName: "",
      phone: "",
      email: "",
      general: "",
    };
    let isValid = true;

    // Валидация фамилии
    if (!lastName.trim()) {
      newErrors.lastName = "Фамилия обязательна";
      isValid = false;
    } else if (!/^[а-яА-Яa-zA-Z\s-]{2,}$/.test(lastName.trim())) {
      newErrors.lastName = "Фамилия должна содержать только буквы и быть не короче 2 символов";
      isValid = false;
    }

    // Валидация имени
    if (!firstName.trim()) {
      newErrors.firstName = "Имя обязательно";
      isValid = false;
    } else if (!/^[а-яА-Яa-zA-Z\s-]{2,}$/.test(firstName.trim())) {
      newErrors.firstName = "Имя должно содержать только буквы и быть не короче 2 символов";
      isValid = false;
    }

    // Валидация телефона
    if (!phone.trim()) {
      newErrors.phone = "Телефон обязателен";
      isValid = false;
    } else if (!/^\+?[78][-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/.test(phone.trim())) {
      newErrors.phone = "Введите корректный номер телефона (например, +7 (XXX) XXX-XX-XX)";
      isValid = false;
    }

    // Валидация email
    if (!email.trim()) {
      newErrors.email = "Email обязателен";
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.trim())) {
      newErrors.email = "Введите корректный email";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const orderData = {
      lastName: lastName.trim(),
      firstName: firstName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      service: serviceTitle,
    };

    try {
      console.log("Отправка заказа:", orderData);
      const response = await axiosInstance.post("/api/orders", orderData);
      console.log("Ответ от сервера:", response.data);
      alert("Заказ успешно отправлен!");
      setLastName("");
      setFirstName("");
      setPhone("");
      setEmail("");
      setErrors({ lastName: "", firstName: "", phone: "", email: "", general: "" });
      onClose();
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error.response?.data || error.message);
      setErrors({
        ...errors,
        general: error.response?.data?.message || "Ошибка при отправке заказа",
      });
    }
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      backdropClassName={style.modalBackdrop}
      dialogClassName={style.modalDialog}
      contentClassName={style.modalContent}
    >
      <Modal.Header closeButton className={style.modalOrderHeader}>
        <Modal.Title className={style.modalOrderTitle}>
          Оформить заказ: {serviceTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={style.modalOrderBody}>
        {errors.general && <p className={style.error}>{errors.general}</p>}
        <form className={style.formModalOrder} onSubmit={handleSubmit}>
          <div className={style.inputGroup}>
            <input
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setErrors({ ...errors, lastName: "" });
              }}
              placeholder="Фамилия"
              required
              className={`${style.edit_form_input} ${errors.lastName ? style.inputError : ""}`}
              aria-label="Фамилия"
            />
            {errors.lastName && <span className={style.errorMessage}>{errors.lastName}</span>}
          </div>
          <div className={style.inputGroup}>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setErrors({ ...errors, firstName: "" });
              }}
              placeholder="Имя"
              required
              className={`${style.edit_form_input} ${errors.firstName ? style.inputError : ""}`}
              aria-label="Имя"
            />
            {errors.firstName && <span className={style.errorMessage}>{errors.firstName}</span>}
          </div>
          <div className={style.inputGroup}>
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrors({ ...errors, phone: "" });
              }}
              placeholder="Телефон"
              required
              className={`${style.edit_form_input} ${errors.phone ? style.inputError : ""}`}
              aria-label="Телефон"
            />
            {errors.phone && <span className={style.errorMessage}>{errors.phone}</span>}
          </div>
          <div className={style.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
              placeholder="Email"
              required
              className={`${style.edit_form_input} ${errors.email ? style.inputError : ""}`}
              aria-label="Email"
            />
            {errors.email && <span className={style.errorMessage}>{errors.email}</span>}
          </div>
          <div className={style.modalActions}>
            <button type="submit" className={style.submitButton}>
              Отправить
            </button>
            <button type="button" onClick={onClose} className={style.cancelButton}>
              Отмена
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};