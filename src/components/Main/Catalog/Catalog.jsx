import { useState, useEffect } from "react";
import style from "./Catalog.module.css";
import { EditProductForm } from "./EditProductForm";
import { useNavigate, Link } from "react-router-dom";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../../api/api"; // Импортируем функции API

export const Catalog = ({ isAuthenticated, userRole }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState([]); // Используем пустой массив вместо cardsData
  const [editingIndex, setEditingIndex] = useState(null);
  const cardsPerPage = 6;

  // Загрузка данных с бэкенда
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setCards(data);
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const addedProduct = await addProduct(newProduct); // Отправляем запрос на бэкенд
      setCards((prev) => [...prev, addedProduct]); // Обновляем локальное состояние
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
    }
  };

  const handleDeleteProduct = async (index) => {
    const productId = cards[index].id; // Предполагаем, что у карточки есть уникальный id
    try {
      await deleteProduct(productId); // Отправляем запрос на удаление на бэкенд
      setCards((prev) => prev.filter((_, i) => i !== index)); // Обновляем локальное состояние
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    }
  };

  const handleEditProduct = async (index, updatedProduct) => {
    const productId = cards[index].id; // Предполагаем, что у карточки есть уникальный id
    try {
      await updateProduct(productId, updatedProduct); // Отправляем запрос на обновление на бэкенд
      setCards((prev) =>
        prev.map((card, i) => (i === index ? { ...card, ...updatedProduct } : card))
      ); // Обновляем локальное состояние
      setEditingIndex(null);
    } catch (error) {
      console.error("Ошибка при обновлении товара:", error);
    }
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <main>
        <div className={style.container}>
          <div className={style.Actually}>Наша продукция</div>

          {isAuthenticated && userRole?.includes("ADMIN") && (
            <EditProductForm onAddProduct={handleAddProduct} />
          )}

          <div className={style.cards}>
            {currentCards.map((card, index) => (
              <div
                key={card.id} // Используем уникальный id карточки
                className={`${style.card} ${hoveredIndex === index ? style.flipped : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={style.front}>
                  <img src={card.imgSrc} alt={card.title} />
                </div>
                <div className={style.back}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <Link to={card.to}>Подробнее</Link>
                  {isAuthenticated && userRole?.includes("ADMIN") && (
                    <div className={style.adminControls}>
                      <button onClick={() => setEditingIndex(index)}>Редактировать</button>
                      <button onClick={() => handleDeleteProduct(index)}>Удалить</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={style.pagination}>
            {Array.from({ length: Math.ceil(cards.length / cardsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? style.active : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </main>

      {editingIndex !== null && (
        <EditProductForm
          product={cards[editingIndex]}
          onSave={(updatedProduct) => handleEditProduct(editingIndex, updatedProduct)}
          onCancel={() => setEditingIndex(null)}
        />
      )}
    </>
  );
};