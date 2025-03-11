import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ isAuthenticated, userRole }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!isAuthenticated || userRole !== 'ADMIN') {
      alert('Требуется авторизация администратора');
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`, {
        auth: {
          username: 'admin',
          password: 'admin123',
        },
      });
      fetchProducts();
    } catch (error) {
      console.error('Ошибка при удалении товара:', error);
    }
  };

  return (
    <div>
      <h2>Список товаров</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} руб.
            {isAuthenticated && userRole === 'ADMIN' && (
              <button onClick={() => handleDelete(product.id)}>Удалить</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;