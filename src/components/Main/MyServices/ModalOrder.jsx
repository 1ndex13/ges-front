import React, { useState } from "react";
import axiosInstance from "../../../api/axiosConfig";
import style from './MyServices.module.css';
import { Modal } from "react-bootstrap";

export const ModalOrder = ({ isOpen, onClose, serviceTitle }) => {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const orderData = {
        lastName,
        firstName,
        phone,
        email,
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
        setError("");
        onClose();
      } catch (error) {
        console.error("Ошибка при отправке заказа:", error.response?.data || error.message);
        setError(error.response?.data || "Ошибка при отправке заказа");
      }
    };
  
    return (
      <Modal 
        show={isOpen} 
        onHide={onClose} 
        centered // Это свойство центрирует модальное окно
        backdropClassName={style.modalBackdrop}
        dialogClassName={style.modalDialog}
        contentClassName={style.modalContent}
        closeButton={false}
      >
        <Modal.Header closeButton className={style.modalOrderHeader}>
          <Modal.Title className={style.modalOrderTitle}>
            Оформить заказ: {serviceTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.modalOrderBody}>
          {error && <p className={style.error}>{error}</p>}
          <form className={style.formModalOrder} onSubmit={handleSubmit}>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Фамилия"
              required
              className={style.edit_form_input}
            />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Имя"
              required
              className={style.edit_form_input}
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Телефон"
              required
              className={style.edit_form_input}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className={style.edit_form_input}
            />
            <div className={style.modalActions}>
              <button type="submit" className={style.submitButton}>Отправить</button>
              <button type="button" onClick={onClose} className={style.cancelButton}>Отмена</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
};