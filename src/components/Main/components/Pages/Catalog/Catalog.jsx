import { useState } from "react";
import style from "./Catalog.module.css";
import { Link } from "react-router-dom";

export const Catalog = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null); // Состояние для хранения индекса наведеной карточки
  const [currentPage, setCurrentPage] = useState(1); // Состояние для хранения текущей страницы
  const cardsPerPage = 6; // Количество карточек на странице

  const cards = [
    {
      title: "Геологоразведка",
      description: "«Global Energy Solution» предоставляет комплексные услуги по геологоразведке, включая сейсмические исследования и оценку месторождений полезных ископаемых.",
      imgSrc: "./geo.png",
      to: "/Geo"
    },
    {
      title: "Бурение скважин",
      description: "«Global Energy Solution» является лидером в области бурения скважин для извлечения нефти и газа, используя передовые технологии и оборудование.",
      imgSrc: "./oilgas.png",
      to: "/Bur"
    },
    {
      title: "Каротажные исследования",
      description: "«Global Energy Solution» проводит каротажные исследования для оптимизации добычи и повышения эффективности разработки месторождений.",
      imgSrc: "./kar.png",
      to: "/Kar"
    },
    {
      title: "Буровые растворы",
      description: "«Global Energy Solution» предлагает высококачественные буровые растворы для стабилизации скважин и обеспечения безопасного бурения.",
      imgSrc: "./bur.png",
      to: "/Rast"
    },
    {
      title: "Ингибиторы коррозии",
      description: "«Global Energy Solution» разрабатывает и поставляет ингибиторы коррозии для защиты оборудования и увеличения срока его службы.",
      imgSrc: "./water.png",
      to: "/Cor"
    },
    {
      title: "Пеногасители",
      description: "«Global Energy Solution» производит эффективные пеногасители, которые уменьшают пенообразование в технологических процессах.",
      imgSrc: "./peno.png",
      to: "/Peno"
    },
    {
      title: "Хранилище",
      description: "«Global Energy Solution» предоставляет услуги по хранению нефти и газа, включая современные нефтебазы и подземные хранилища.",
      imgSrc: "./bunker.png",
      to: "/Storage"
    },
    {
      title: "Бункеровка",
      description: "«Global Energy Solution» занимает лидирующие позиции на бункерном рынке России, обеспечивая высококачественную бункеровку судов.",
      imgSrc: "./ships.png",
      to: "/Bunk"
    },
    {
      title: "Битумы",
      description: "«Global Energy Solution» является одним из крупнейших производителей и поставщиков битумной продукции в России.",
      imgSrc: "./products.png",
      to: "/Bit"
    },
    {
      title: "Анализ проектов",
      description: "«Global Energy Solution» проводит комплексный анализ проектов, от геологических исследований до финансово-налоговых аспектов.",
      imgSrc: "./money.png",
      to: "/Analyse"
    },
    {
      title: "Автономные системы",
      description: "«Global Energy Solution» разрабатывает и внедряет автономные системы энергообеспечения для промышленных объектов.",
      imgSrc: "./box.png",
      to: "/Auto"
    },
    {
      title: "Транспортировка",
      description: "«Global Energy Solution» обеспечивает надежную транспортировку нефти и газа по трубопроводам, используя современные технологии.",
      imgSrc: "./truba.png",
      to: "/Transport"
    },
  ];

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <main>
        <div className={style.container}>
          <div className={style.Actually}>Наша продукция</div>
          <div className={style.cards}>
            {currentCards.map((card, index) => (
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