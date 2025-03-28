import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import style from "./Catalog.module.css";
import { addProduct, updateProduct } from "../../../api/api";

export const EditProductForm = ({ product, onSave, onCancel, onAddProduct }) => {
  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(product?.imgSrc || "");
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    console.log("Image selected: ", file.name);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    maxFiles: 1,
  });

  const handleSave = async () => {
    if (!title || !description) {
      setError("Название и описание обязательны для заполнения");
      return;
    }

    const newProductData = {
      title,
      description,
      image: imageFile,
    };

    try {
      if (product) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (imageFile) {
          formData.append("image", imageFile);
        }
        await updateProduct(product.id, formData);
        onSave({ title, description, imgSrc: imageFile ? previewUrl : product.imgSrc });
      } else {
        // Добавление
        await onAddProduct(newProductData); // Вызываем только onAddProduct
      }
      setTitle("");
      setDescription("");
      setImageFile(null);
      setPreviewUrl("");
      setError(null);
    } catch (error) {
      console.error("Ошибка при сохранении товара:", error);
      setError("Произошла ошибка при сохранении");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.edit_form_container}>
        <h2>{product ? "Редактирование карточки" : "Добавление карточки"}</h2>
        {error && <p className={style.error}>{error}</p>}
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
            Изображение:
            <div
              {...getRootProps()}
              className={`${style.dropzone} ${isDragActive ? style.active : ''}`}
            >
              <input {...getInputProps()} />
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className={style.previewImage} />
              ) : (
                <p>Перетащите изображение сюда или кликните для выбора</p>
              )}
            </div>
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
    </div>
  );
};