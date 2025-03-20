import { useState } from "react";
import style from "./Catalog.module.css";
import { addProduct, updateProduct } from "../../api/api";// Импортируем функции API

export const EditProductForm = ({ product, onSave, onCancel, onAddProduct }) => {
  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [imgSrc, setImgSrc] = useState(product?.imgSrc || "");
  const [targetUrl, setTargetUrl] = useState(product?.targetUrl || "");

  const handleSave = async () => {
    const updatedProduct = { title, description, imgSrc, targetUrl };
    try {
      if (product) {
        console.log("Product ID:", product.id);
        await updateProduct(product.id, updatedProduct);
        onSave(updatedProduct);
      } else {
        const newProduct = await addProduct(updatedProduct);
        onAddProduct(newProduct);
      }
    } catch (error) {
      console.error("Ошибка при сохранении товара:", error);
    }
  };

  return (
    <div className={style.edit_form_container}>
      <h2>{product ? "Редактирование карточки" : "Добавление карточки"}</h2>
      <form className="edit-form">
        <label className={style.edit_form_label}>
          Название:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={style.edit_form_input}
          />
        </label>
        <label className={style.edit_form_label}>
          Описание:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={style.edit_form_textarea}
          />
        </label>
        <label className={style.edit_form_label}>
          Ссылка на изображение:
          <input
            type="text"
            value={imgSrc}
            onChange={(e) => setImgSrc(e.target.value)}
            className={style.edit_form_input}
          />
        </label>
        <label className={style.edit_form_label}>
          Ссылка на страницу:
          <input
            type="text"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            className={style.edit_form_input}
          />
        </label>
        <div className={style.edit_form_buttons}>
          <button type="button" onClick={handleSave} className={style.edit_form_save}>
            Сохранить
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className={style.edit_form_cancel}>
              Отмена
            </button>
          )}
        </div>
      </form>
    </div>
  );
};