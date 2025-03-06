import style from "./CatalogCard.module.css";

export const Bunk = () => {
  return (
    <>
      <div className={style.productContainer}>
        <div className={style.productImage}>
          <img src="./ships.png" alt="Бункеровка" />
        </div>
        <div className={style.productDetails}>
          <h1 className={style.productTitle}>Бункеровка</h1>
          <p className={style.productDescription}>
            «Global Energy Solution» занимает лидирующие позиции на бункерном рынке России, обеспечивая высококачественную бункеровку судов.
          </p>
          <div className={style.productPrice}>
            <span>Стоимость работ:</span>
            <strong>от 1 000 000 ₽</strong>
          </div>
          <ul className={style.productBenefits}>
            <li>Высокое качество топлива</li>
            <li>Оперативная доставка</li>
            <li>Соблюдение экологических стандартов</li>
          </ul>
          <button className={style.orderButton}>Заказать услугу</button>
        </div>
      </div>
    </>
  );
};