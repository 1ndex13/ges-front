import { useState } from "react";

export const ProductForm = ({ onAddProduct }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [to, setTo] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      title,
      description,
      imgSrc,
      to,
      price: parseFloat(price), // Преобразуем в число
      category,
    };
    onAddProduct(newProduct);
    setTitle("");
    setDescription("");
    setImgSrc("");
    setTo("");
    setPrice("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h3>Добавить новую карточку</h3>
      <div>
        <label>Название:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Описание:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Ссылка на изображение:</label>
        <input
          type="text"
          value={imgSrc}
          onChange={(e) => setImgSrc(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Ссылка на страницу:</label>
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Цена:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Категория:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <button type="submit">Добавить</button>
    </form>
  );
};