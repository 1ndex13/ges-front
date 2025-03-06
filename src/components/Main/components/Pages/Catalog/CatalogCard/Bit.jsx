import style from "./CatalogCard.module.css";

export const Bit = () => {
  return (
    <>
      <div className={style.productContainer}>
        <div className={style.productImage}>
          <img src="./products.png" alt="Битумы" />
        </div>
        <div className={style.productDetails}>
          <h1 className={style.productTitle}>Битумы</h1>
          <p className={style.productDescription}>
            «Global Energy Solution» является одним из крупнейших производителей и поставщиков битумной продукции в России.
          </p>
          <div className={style.productPrice}>
            <span>Стоимость работ:</span>
            <strong>от 800 000 ₽</strong>
          </div>
          <ul className={style.productBenefits}>
            <li>Высокое качество продукции</li>
            <li>Широкий ассортимент битумов</li>
            <li>Доставка по всей России</li>
          </ul>
          <button className={style.orderButton}>Заказать услугу</button>
        </div>
      </div>
    </>
  );
};