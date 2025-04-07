import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosConfig";
import style from "./Contacts.module.css";

export const ReviewModal = ({ isOpen, onClose, fetchReviews, setSelectedProductId }) => {
  const [comment, setComment] = useState("");
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/products", {
          headers: { "Cache-Control": "no-cache" },
        });
        setProducts(response.data);
      } catch (err) {
        setError("Ошибка загрузки услуг");
      }
    };
    if (isOpen) {
      fetchProducts();
      setError("");
      setSuccess("");
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId || !comment) {
      setError("Выберите услугу и введите отзыв");
      return;
    }

    try {
      await axiosInstance.post(`/api/reviews/product/${productId}`, { comment });
      setSuccess("Отзыв успешно отправлен!");
      setComment("");
      setSelectedProductId(productId);
      setProductId("");
      await fetchReviews();
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка отправки отзыва");
    }
  };

  if (!isOpen) return null; // Если модалка не открыта, ничего не рендерим

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <div className={style.modalHeader}>
          <h2>Оставить отзыв</h2>
          <button onClick={onClose} className={style.closeButton}>×</button>
        </div>
        <div className={style.modalBody}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className={style.formGroup}>
              <label>Выберите услугу:</label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className={style.edit_form_input}
              >
                <option value="">Выберите услугу</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.title}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.formGroup}>
              <label>Ваш отзыв:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Введите ваш отзыв"
                required
                className={style.edit_form_input}
                rows="4"
              />
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
        </div>
      </div>
    </div>
  );
};