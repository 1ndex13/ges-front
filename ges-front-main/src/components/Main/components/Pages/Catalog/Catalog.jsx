import { useState } from "react";
import style from "./Catalog.module.css";
import { Link } from "react-router-dom";

export const Catalog = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null); // Состояние для хранения индекса наведеной карточки

  const cards = [
    {
      title: "Сеть АЗС «Global Energy Solution»",
      description: "Высококачественное топливо, товары в дорогу и высокий уровень обслуживания",
      imgSrc: "./gas-station.png",
      to: "/gas-station"
    },
    {
      title: "Программа лояльности «Нам по пути!»",
      description: "За каждую покупку начисляются бонусы, которыми можно оплатить топливо или товары",
      imgSrc: "./understated-cartoon-style-loyalty-program--on-our-.png"
    },
    {
      title: "Моторное масло S-Energy и «Global Energy Solution»",
      description: "Масла S-Energy и «Global Energy Solution» предназначены для современных легковых автомобилей",
      imgSrc: "./motor-oil.png"
    },
    {
      title: "Автомобильное топливо",
      description: "Качественные бензин и дизельное топливо оптом для промышленных и сельхозпредприятий, независимых АЗС",
      imgSrc: "./car-fuel.png"
    },
    {
      title: "Топливные карты",
      description: "Безналичная оплата топлива для коммерческого транспорта с широкой сетью приёма на АЗС и онлайн-сервисами",
      imgSrc: "./card.png"
    },
    {
      title: "Авиационное топливо",
      description: "«GES-Аэро» обладает крупнейшей сбытовой сетью среди российских компаний",
      imgSrc: "./airplane.png"
    },
    {
      title: "Смазочные материалы",
      description: "Ассортимент продукции включает более 400 наименований масел",
      imgSrc: "./lubricants.png"
    },
    {
      title: "Бункеровка",
      description: "«GES Марин Бункер» — занимает лидирующие позиции на бункерном рынке России",
      imgSrc: "./ships.png"
    },
    {
      title: "Битумы",
      description: "«Global Energy Solution» является одним из крупнейших производителей и поставщиков битумной продукции в России",
      imgSrc: "./products.png",
      to: "/pol"
    },
    
    
  ];

  return (
    <>
      <main>
        <div className={style.container}>
          <div className={style.Actually}>Наша продукция</div>
          <div className={style.cards}>
            {cards.map((card, index) => (
              <div
                key={index}
                className={`${style.card} ${hoveredIndex === index ? style.flipped : ''}`}
                onMouseEnter={() => setHoveredIndex(index)} // Устанавливаем индекс наведеной карточки
                onMouseLeave={() => setHoveredIndex(null)} // Сбрасываем индекс при уходе курсора
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
        </div>
      </main>
    </>
  );};