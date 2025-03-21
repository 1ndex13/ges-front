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
          <img src="./aboutus.png" alt="" />
          <h3>О «Global Energy Solution»</h3>
          <p>
            Основные виды деятельности компании — поиск месторождений
            углеводородов, добыча и реализация нефти и газа
          </p>
          <h6>Узнать больше</h6>
        </div>
        <div className={style.info_card}>
          <img src="./people.png" alt="" />
          <h3>Миссия и стратегия</h3>
          <p>
            «Global Energy Solution» создает ресурсы для будущего, обогащая мир энергией,
            знаниями и технологиями для уверенного движения к лучшему
          </p>
          <h6>Узнать больше</h6>
        </div>
        <div className={style.info_card}>
          <img src="./energy.png" alt="" />
          <h3>Энергия в людях</h3>
          <p>
            Сегодня в «Global Energy Solution» работает более 80 тысяч сотрудников.
            Благодаря которым производство становится эффективнее и
            экологичнее
          </p>
          <h6>Узнать больше</h6>
        </div>
      </div>
    </div>
  );
};
