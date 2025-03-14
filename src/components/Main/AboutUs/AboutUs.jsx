import style from "./AboutUs.module.css";


export const AboutUs = () => {
  return (
    <div className={style.container}>
      <div className={style.oliman}>
        <img src="./world.png" alt="" />
        <h4>О компании</h4>
        <h1>Миссия и стратегия развития</h1>
        <p>
          Наша цель — стать одной из лучших индустриальных компаний мира,
          определяющих прогрессивную трансформацию отрасли, делающих невозможное
          реальным и вдохновляющих своих последователей в России и за ее
          пределами
        </p>
      </div>
      <div className={style.ZagolovokOnas}>Смотрите в этом разделе</div>
      
      <div className={style.info_cards}>
        <div className={style.info_card}>
          <img src="./sbit.png" alt="" />
          <h3>О «Global Energy Solution»</h3>
          <p>
            Основные виды деятельности компании — поиск месторождений
            углеводородов, добыча и реализация нефти и газа, а также
            производство и сбыт нефтепродуктов
          </p>
          <h6>Узнать больше</h6>
        </div>
        <div className={style.info_card}>
          <img src="./public/mission-and-strategy.png" alt="" />
          <h3>Миссия и стратегия</h3>
          <p>
            «Global Energy Solution» создает ресурсы для будущего, обогащая мир энергией,
            знаниями и технологиями для уверенного движения к лучшему
          </p>
          <h6>Узнать больше</h6>
        </div>
        <div className={style.info_card}>
          <img src="./public/energy-in-people.png" alt="" />
          <h3>Энергия в людях</h3>
          <p>
            Сегодня в «Global Energy Solution» работает более 80 тысяч сотрудников.
            Благодаря им развиваются высокотехнологичные проекты по добыче и
            переработке углеводородов, производство становится эффективнее и
            экологичнее, создаются новые российские технологии и востребованные
            продукты
          </p>
          <h6>Узнать больше</h6>
        </div>
      </div>
    </div>
  );
};
