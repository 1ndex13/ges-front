import style from "./CatalogCard.module.css";
import { useNavigate } from "react-router-dom";



export const Cor = ({ isAuthenticated, addService }) => {
   const navigate = useNavigate();

   const handleOrder = () => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, перенаправляем на страницу регистрации
      navigate("/register");
    } else {
      // Если авторизован, добавляем услугу в "Мои услуги"
      const service = {
        title: "Ингибиторы коррозии",
        description: "«Global Energy Solution» разрабатывает и поставляет ингибиторы коррозии для защиты оборудования и увеличения срока его службы.",
        imgSrc: "./water.png",
      };
      addService(service); // Передаем услугу в функцию добавления
      navigate("/my-services"); // Перенаправляем на страницу "Мои услуги"
    }
  };


  return (
    <>
      <div className={style.productContainer}>
        <div className={style.productImage}>
          <img src="./water.png" alt="Ингибиторы коррозии" />
        </div>
        <div className={style.productDetails}>
          <h1 className={style.productTitle}>Ингибиторы коррозии</h1>
          <p className={style.productDescription}>
            «Global Energy Solution» разрабатывает и поставляет ингибиторы коррозии для защиты оборудования и увеличения срока его службы.
          </p>
          <div className={style.productPrice}>
            <span>Стоимость работ:</span>
            <strong>от 300 000 ₽</strong>
          </div>
          <ul className={style.productBenefits}>
            <li>Эффективная защита от коррозии</li>
            <li>Увеличение срока службы оборудования</li>
            <li>Соответствие международным стандартам</li>
          </ul>
        <button className={style.orderButton} onClick={handleOrder}>
                    Заказать услугу
                  </button>
        </div>
      </div>
    </>
  );
};