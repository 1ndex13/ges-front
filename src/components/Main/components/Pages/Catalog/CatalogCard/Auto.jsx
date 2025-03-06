
import { useNavigate } from "react-router-dom";
import style from "./CatalogCard.module.css";

export const Auto = ({ isAuthenticated, addService }) => {
  const navigate = useNavigate();

  const handleOrder = () => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, перенаправляем на страницу регистрации
      navigate("/register");
    } else {
      // Если авторизован, добавляем услугу в "Мои услуги"
      const service = {
        title: "Автономные системы",
        description: "«Global Energy Solution» разрабатывает и внедряет автономные системы энергообеспечения для промышленных объектов.",
        imgSrc: "./box.png",
      };
      addService(service); // Передаем услугу в функцию добавления
      navigate("/my-services"); // Перенаправляем на страницу "Мои услуги"
    }
  };

  return (
    <>
      <div className={style.productContainer}>
        <div className={style.productImage}>
          <img src="./box.png" alt="Автономные системы" />
        </div>
        <div className={style.productDetails}>
          <h1 className={style.productTitle}>Автономные системы</h1>
          <p className={style.productDescription}>
            «Global Energy Solution» разрабатывает и внедряет автономные системы энергообеспечения для промышленных объектов.
          </p>
          <div className={style.productPrice}>
            <span>Стоимость работ:</span>
            <strong>от 1 200 000 ₽</strong>
          </div>
          <ul className={style.productBenefits}>
            <li>Энергонезависимость</li>
            <li>Высокая надежность</li>
            <li>Экологичность</li>
          </ul>
          <button className={style.orderButton} onClick={handleOrder}>
            Заказать услугу
          </button>
        </div>
      </div>
    </>
  );
};