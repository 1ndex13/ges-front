import { useState, useEffect } from "react";
import style from "./Main.module.css";
import oil_tank from "../../../assets/img/second_oil_tank.png"
import oilpump from "../../../assets/img/oilpump.png"
import oil_tanc from "../../../assets/img/oil_tank.png"
import oiltrack from "../../../assets/img/oiltrack.png"
import fries from  "../../../assets/img/Fries.png"
import hr from  "../../../assets/img/hr-specialist.png"
import tree from  "../../../assets/img/tree.png"
import home from "../../../assets/img/home.png"
import comfortable from "../../../assets/img/comfortablework.png"
import oil_and_gas from "../../../assets/img/oil-and-gas.png"

export const MainContent = () => {
  return (
    <>
      <Slider />
      <Card />
    </>
  );
};

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: oil_tanc,
      title: "Наша цистерна — ваша надежность",
    },
    {
      image: oil_tank,
      title: "Эффективное хранение — залог стабильности",
    },
    {
      image: oiltrack,
      title: "Ваш надежный партнер в доставке топлива",
    },
    {
      image: oilpump,
      title: "Добыча, на которую можно положиться",
    },
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000); // Интервал смены слайдов (7 секунд)

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className={style.sliderContainer}>
      <div className={style.slider}>
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className={style.slideImage}
        />
        <div className={style.slideContent}>
          <h2>{slides[currentSlide].title}</h2>
        </div>
      </div>
      <button className={style.prevButton} onClick={prevSlide}>
        &#10094;
      </button>
      <button className={style.nextButton} onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

const Card = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null); // Состояние для хранения индекса наведеной карточки

  const cards = [
    {
      title: "Топливо фри",
      description: "Смотрим, как картошка фри помогает создавать экологическое топливо для судов",
      imgSrc: fries,
    },
    {
      title: "Сказки крайнего севера",
      description: "Слушайте новогодний выпуск на популярных Российских аудиосервисах",
      imgSrc: tree,
    },
    {
      title: "С любовью к родным городам",
      description: "Как сделать комфортнее жизнь в любом уголке мира: советы, лайфхаки и многое другое",
      imgSrc: home,
    },
    {
      title: "10 вопросов HR-специалисту",
      description: "Как стать частью нашей огромной команды 'Global Energy Solution'",
      imgSrc: hr,
    },
    {
      title: "С заботой о нефтяниках",
      description: "Создаем лучшие условия для работы и развития настоящих профессионалов",
      imgSrc: comfortable,
    },
    {
      title: "Интересное о нефти и газе",
      description: "Смотрите наш увлекательный мультфильм о нефти и газе. Все хитрости добычи ресурсов",
      imgSrc: oil_and_gas,
    },
  ];

  return (
    <main>
      <div className={style.container}>
        <h1>«Global Energy Solution» — технологический лидер нефтегазового рынка России</h1>
        <p>
          Мы производим качественные топливо, масла и битумы для бизнеса и розничных покупателей, заправляем самолеты,
          развиваем сеть АЗС. Новые технологии позволяют нам постоянно повышать эффективность работы и снижать воздействие
          на окружающую среду.
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
              <div className={`${style.overlay} ${hoveredIndex === index ? style.show : ""}`}>
                <h3 className={style.title}>{card.title}</h3>
                <p className={`${style.description}`}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};