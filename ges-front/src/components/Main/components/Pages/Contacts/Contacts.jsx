import style from "./Contacts.module.css";

export const Contacts = () => {
  return (
    <div className={style.container}>
      <div className={style.Actually}>Контакты</div>
      <h2>ПАО «Global Energy Solution»</h2>
      <div className={style.flex}>
      <a href=""><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d722.6075423755047!2d52.27320860569855!3d54.90053554764909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41605dea06e85221%3A0xf30069a400c0ca9b!2z0YPQuy4g0JzQuNGA0LAsIDgsINCQ0LvRjNC80LXRgtGM0LXQstGB0LosINCg0LXRgdC_LiDQotCw0YLQsNGA0YHRgtCw0L0sIDQyMzQ1Nw!5e0!3m2!1sru!2sru!4v1739356576310!5m2!1sru!2sru" width="500" height="350"></iframe></a>
      <div className={style.address_phone}>
        <div className={style.contact}>
        <h2>Позвоните нам</h2>
        <ul>
          <li>+7 (987) 566 43 67</li>
          <li>+7 (987) 578 90 35</li>
        </ul>
      </div> <div className={style.contact}>
        <h2>Номера для ЕС</h2>
        <ul>
          <li>+53 (495) 018 91 33 </li>
          <li>+02 (495) 492 95 66 </li>
        </ul>
      </div>
   
      
      </div>
      <div className={style.address_phone}>   <div className={style.contact}>
        <h2>Наш адрес</h2>
        <ul>
          <li>город Альметьевск, ул. Мира 10</li>
          <li>ежедневно с 8:00-20:00</li>
        </ul>
      </div>
      <div className={style.contact}>
        <h2>Наш email</h2>
        <ul>
          <li>GES@gmail.com</li>
          <li>AlmetGES@mail.ru</li>
        </ul>
      </div>
     
      </div>
      <div className={style.social}>
        <a href=""><p>TELEGRAM</p><img src="./public/icons8-arrow-50.png" alt="" /></a>
        <a href=""><p>WHATSAPP</p><img src="./public/icons8-arrow-50.png" alt="" /></a>
        <a href=""><p>VKONTAKTE</p><img src="./public/icons8-arrow-50.png" alt="" /></a>
        <a href=""><p>ЗАКАЗАТЬ УСЛУГУ</p></a>
      </div></div>
    </div>
  );
};