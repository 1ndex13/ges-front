
import style from "./CatalogCard.module.css";

export const Transport = () => {
  return (
    <>
      <div className={style.productContainer}>
        <div className={style.productImage}>
          <img src="./truba.png" alt="Транспортировка" />
        </div>
        <div className={style.productDetails}>
          <h1 className={style.productTitle}>Транспортировка</h1>
          <p className={style.productDescription}>
            «Global Energy Solution» обеспечивает надежную транспортировку нефти и газа по трубопроводам, используя современные технологии.
          </p>
          <div className={style.productPrice}>
            <span>Стоимость работ:</span>
            <strong>от 2 000 000 ₽</strong>
          </div>
          <ul className={style.productBenefits}>
            <li>Современные технологии</li>
            <li>Минимизация потерь</li>
            <li>Безопасность и надежность</li>
          </ul>
          <button className={style.orderButton}>Заказать услугу</button>
        </div>
      </div>
    </>
  );
};