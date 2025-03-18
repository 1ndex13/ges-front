import { useState } from "react";
import style from "./Catalog.module.css";
import { EditProductForm } from "./EditProductForm";
import { useNavigate, Link } from "react-router-dom";
import { cardsData } from "../../../Scripts/cardsData";

export const Catalog = ({ isAuthenticated, userRole }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState(cardsData);
  const [editingIndex, setEditingIndex] = useState(null);
  const cardsPerPage = 6;

  const handleAddProduct = (newProduct) => {
    setCards((prev) => [...prev, newProduct]); // Добавляем карточку с id от бэкенда
  };

  const handleDeleteProduct = (index) => {
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditProduct = (index, updatedProduct) => {
    setCards((prev) =>
      prev.map((card, i) => (i === index ? { ...card, ...updatedProduct } : card))
    );
    setEditingIndex(null);
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
                key={index}
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