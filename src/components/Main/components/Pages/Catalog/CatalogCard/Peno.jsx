import style from "./CatalogCard.module.css";

export const Peno = () => {
  return (
    <>
      <div className={style.productContainer}>
        <div className={style.productImage}>
          <img src="./peno.png" alt="Пеногасители" />
        </div>
        <div className={style.productDetails}>
          <h1 className={style.productTitle}>Пеногасители</h1>
          <p className={style.productDescription}>
            «Global Energy Solution» производит эффективные пеногасители, которые уменьшают пенообразование в технологических процессах.
          </p>
          <div className={style.productPrice}>
            <span>Стоимость работ:</span>
            <strong>от 200 000 ₽</strong>
          </div>
          <ul className={style.productBenefits}>
            <li>Высокая эффективность</li>
            <li>Безопасность для оборудования</li>
            <li>Широкий спектр применения</li>
          </ul>
          <button className={style.orderButton}>Заказать услугу</button>
        </div>
      </div>
    </>
  );
};