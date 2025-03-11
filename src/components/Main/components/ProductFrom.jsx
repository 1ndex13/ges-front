import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ isAuthenticated, fetchProducts }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Требуется авторизация');
      return;
    }
    try {
      await axios.post(
        'http://localhost:8080/api/products',
        { name, description, price, imageUrl },
        {
          auth: {
            username: 'admin',
            password: 'admin123',
          },
        }
      );
      fetchProducts();
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
    } catch (error) {
      console.error('Ошибка при добавлении товара:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить товар</h2>
      <input
        type="text"
        placeholder="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Ссылка на изображение"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default ProductForm;