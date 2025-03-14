import { useState } from "react";
import style from "./Catalog.module.css";
import { ProductForm } from "./ProductForm";
import { useNavigate, Link } from "react-router-dom";
import { cardsData } from "../../../Scripts/cardsData"; // Импортируем данные карточек// Импортируем универсальный компонент

export const Catalog = ({ isAuthenticated, userRole }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState(cardsData); // Используем состояние для карточек
  const cardsPerPage = 6;

  // Функция для добавления новой карточки
  const handleAddProduct = (newProduct) => {
    setCards([...cards, newProduct]); // Добавляем новую карточку в состояние
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

          {isAuthenticated && userRole === "ADMIN" && (
            <ProductForm onAddProduct={handleAddProduct} />
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
    </>
  );
};