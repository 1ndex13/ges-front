import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CatalogCard } from "../CatalogCard/CatalogCard";
import { cardsData } from "../../../Scripts/cardsData"; // Импортируем данные карточек

export const FullCard = ({ isAuthenticated, addService }) => {
  const { id } = useParams(); // Получаем id карточки из URL
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    // Находим карточку по id
    const card = cardsData.find((card) => card.id === parseInt(id));
    if (card) {
      setCardData(card);
    }
  }, [id]);

  if (!cardData) {
    return <div>Карточка не найдена</div>;
  }

  return (
    <div>
      <CatalogCard
        isAuthenticated={isAuthenticated}
        addService={addService}
        cardData={cardData}
        isFullView={true} // Передаем флаг для отображения полной карточки
      />
    </div>
  );
};