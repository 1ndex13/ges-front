import { useParams } from "react-router-dom";
import { useServices } from "../Catalog/ServicesContext"; // Убедитесь, что путь правильный

export const FullCard = ({ isAuthenticated }) => {
  const { id } = useParams();
  const { addService } = useServices();

  // Пример логики для FullCard
  const card = { id, title: "Пример", description: "Описание", imgSrc: "/path" }; // Замените на реальные данные

  const handleAdd = () => {
    addService({
      id: card.id,
      title: card.title,
      description: card.description,
      imgSrc: card.imgSrc,
    });
  };

  return (
    <div>
      <h1>{card.title}</h1>
      <p>{card.description}</p>
      {isAuthenticated && (
        <button onClick={handleAdd}>Добавить в корзину</button>
      )}
    </div>
  );
};