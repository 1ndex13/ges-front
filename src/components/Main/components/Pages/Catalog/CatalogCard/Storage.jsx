import style from "./CatalogCard.module.css";

export const Storage = () => {
  return (
    <>
      <div className={style.productContainer}>
        <div className={style.productImage}>
          <img src="./bunker.png" alt="Хранилище" />
        </div>
        <div className={style.productDetails}>
          <h1 className={style.productTitle}>Хранилище</h1>
          <p className={style.productDescription}>
            «Global Energy Solution» предоставляет услуги по хранению нефти и газа, включая современные нефтебазы и подземные хранилища.
          </p>
          <div className={style.productPrice}>
            <span>Стоимость работ:</span>
            <strong>от 1 500 000 ₽</strong>
          </div>
          <ul className={style.productBenefits}>
            <li>Современные технологии хранения</li>
            <li>Высокий уровень безопасности</li>
            <li>Оптимизация логистики</li>
          </ul>
          <button className={style.orderButton}>Заказать услугу</button>
        </div>
      </div>
    </>
  );
};