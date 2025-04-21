import style from "./Footer.module.css";
import youtube from "../../assets/img/youtube.png"
import vk from "../../assets/img/vk.png"
import telegram from "../../assets/img/tel.png"


export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.menu_footer}>
          <h3>Полезные ссылки</h3>
          <p>Противодействие мошенничеству</p>
          <p>Топливные карты</p>
          <p>Наши маршруты</p>
        </div>
        <div className={style.menu_footer}>
          <h3>Социальные сети</h3>
          <p>
            <img src={telegram} alt="telegram" />
            Telegram
          </p>
          <p>
            <img src={vk} alt="vk-com"/>
            Вконтакте
          </p>
          <p>
            <img src={youtube} alt="youtube-play" />
            Youtube
          </p>
        </div>
        <div className={style.menu_footer}>
          <h3>Контакты Global Energy Solution</h3>
          <p>8 800 700 3152</p>
          <h5>Горячая линия «Global Energy Solution» (бесплатный звонок по России)</h5>
        </div>
        <div className={style.menu_footer}>
          <h3>Контакты сети АЗС</h3>
          <p>8 800 700 5151</p>
          <h5>Центр поддержки клиентов АЗС «Global Energy Solution» (бесплатный звонок по России)</h5>
        </div>
      </div>
    </footer>
  );
};