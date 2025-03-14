import style from "./Contacts.module.css";

export const Contacts = () => {
  return (
    <div className={style.container}>
      <div className={style.Actually}>Контакты</div>
      <div className={style.grid}>
        {/* Карта */}
        <div className={style.map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d722.6075423755047!2d52.27320860569855!3d54.90053554764909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41605dea06e85221%3A0xf30069a400c0ca9b!2z0YPQuy4g0JzQuNGA0LAsIDgsINCQ0LvRjNC80LXRgtGM0LXQstGB0LosINCg0LXRgdC_LiDQotCw0YLQsNGA0YHRgtCw0L0sIDQyMzQ1Nw!5e0!3m2!1sru!2sru!4v1739356576310!5m2!1sru!2sru"
            width="100%"
            height="100%"
            title="Карта"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        </div>

        {/* Контактная информация */}
        <div className={style.contactInfo}>
          <div className={style.contactBlock}>
            <h2>Позвоните нам</h2>
            <ul>
              <li>+7 (987) 566 43 67</li>
              <li>+7 (987) 578 90 35</li>
            </ul>
          </div>
          <div className={style.contactBlock}>
            <h2>Номера для ЕС</h2>
            <ul>
              <li>+53 (495) 018 91 33</li>
              <li>+02 (495) 492 95 66</li>
            </ul>
          </div>
          <div className={style.contactBlock}>
            <h2>Наш адрес</h2>
            <ul>
              <li>город Альметьевск, ул. Мира 10</li>
              <li>ежедневно с 8:00-20:00</li>
            </ul>
          </div>
          <div className={style.contactBlock}>
            <h2>Наш email</h2>
            <ul>
              <li>GES@gmail.com</li>
              <li>AlmetGES@mail.ru</li>
            </ul>
          </div>
        </div>

        {/* Социальные сети */}
        <div className={style.social}>
          <a href="#" className={style.socialLink}>
            <p>TELEGRAM</p>
            <img src="/icons8-arrow-50.png" alt="Telegram" />
          </a>
          <a href="#" className={style.socialLink}>
            <p>WHATSAPP</p>
            <img src="/icons8-arrow-50.png" alt="WhatsApp" />
          </a>
          <a href="#" className={style.socialLink}>
            <p>VKONTAKTE</p>
            <img src="/icons8-arrow-50.png" alt="VKontakte" />
          </a>
          <a href="#" className={style.socialLink}>
            <p>ЗАКАЗАТЬ УСЛУГУ</p>
          </a>
        </div>
      </div>
    </div>
  );
};