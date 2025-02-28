import { useState } from "react";
import style from "../Main.module.css";

export const Card = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null); // Состояние для хранения индекса наведеной карточки

  const cards = [
    {
      title: "Топливо фри",
      description: "Смотрим, как картошка фри помогает создавать экологическое топливо для судов",
      imgSrc: "./Fries.png"
    },
    {
      title: "Сказки крайнего севера",
      description: "Слушайте новогодний выпуск на популярных Российских аудиосервисах",
      imgSrc: "./public/understated-cartoon-style-tales-of-the-far-north.png"
    },
    {
      title: "С любовью к родным городам",
      description: "Как сделать комфортнее жизнь в любом уголке мира: советы, лайфхаки и многое другое",
      imgSrc: "./hometown-love-cartoon.png"
    },
    {
      title: "10 вопросов HR-специалисту",
      description: "Как стать частью нашей огромной команды 'Global Energy Solution'",
      imgSrc: "./hr-specialist.png"
    },
    {
      title: "С заботой о нефтяниках",
      description: "Создаем лучшие условия для работы и развития настоящих профессионалов",
      imgSrc: "./comfortablework.png"
    },
    {
      title: "Интересное о нефти и газе",
      description: "Смотрите наш увлекательный мультфильм о нефти и газе. Все хитрости добычи ресурсов",
      imgSrc: "./oil-and-gas.png"
    },
    
    
  ];

  return (
    <>
      <main>
        <div className={style.container}>
        <h1>«Global Energy Solution» — технологический лидер нефтегазового рынка России</h1>
        <p>
        Мы производим качественные топливо, масла и битумы для бизнеса и розничных покупателей, заправляем самолеты, развиваем сеть АЗС. Новые технологии позволяют нам постоянно повышать эффективность работы и снижать воздействие на окружающую среду.
        </p>
        <div className={style.Actually}>Актуально</div>
          <div className={style.cards}>
            {cards.map((card, index) => (
              <div
                key={index}
                className={style.card}
                onMouseEnter={() => setHoveredIndex(index)} // Устанавливаем индекс наведеной карточки
                onMouseLeave={() => setHoveredIndex(null)} // Сбрасываем индекс при уходе курсора
              >
                <img src={card.imgSrc} alt={card.title} className={`${style.cardImage}`} />
                <div className={`${style.overlay} ${hoveredIndex === index ? style.show : ''}`}>
                  <h3 className={style.title}>{card.title}</h3>
                  <p className={`${style.description}`}>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
