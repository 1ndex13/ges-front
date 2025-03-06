import style from "./CatalogCard.module.css";

export const Rast = () => {
  return (
    <>
      <div className={style.productContainer}>
        <div className={style.productImage}>
          <img src="./bur.png" alt="Буровые растворы" />
        </div>
        <div className={style.productDetails}>
          <h1 className={style.productTitle}>Буровые растворы</h1>
          <p className={style.productDescription}>
            «Global Energy Solution» предлагает высококачественные буровые растворы для стабилизации скважин и обеспечения безопасного бурения.
          </p>
          <div className={style.productPrice}>
            <span>Стоимость работ:</span>
            <strong>от 500 000 ₽</strong>
          </div>
          <ul className={style.productBenefits}>
            <li>Высокое качество и надежность</li>
            <li>Оптимизация процесса бурения</li>
            <li>Снижение рисков при бурении</li>
          </ul>
          <button className={style.orderButton}>Заказать услугу</button>
        </div>
      </div>
    </>
  );
};