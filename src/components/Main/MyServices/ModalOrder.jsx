import React from "react";
import style from "./MyServices.module.css";

export const ModalOrder = ({ isOpen, onClose, serviceTitle }) => {
  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <form className={style.formModalOrder}>
          <h2>Контактные данные</h2>
          <input
            type="text"
            placeholder="Фамилия"
            required
            className={style.edit_form_input}
          />
          <input
            type="text"
            placeholder="Имя"
            required
            className={style.edit_form_input}
          />
          <input
            type="text"
            placeholder="Номер телефона"
            required
            className={style.edit_form_input}
          />
          <input
            type="email"
            placeholder="Электронная почта"
            required
            className={style.edit_form_input}
          />
        </form>

        <div className={style.modalActions}>
          <button onClick={onClose}>Отмена</button>
          <button onClick={() => alert(`Услуга "${serviceTitle}" заказана!`)}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};