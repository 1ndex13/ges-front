import { useState, useEffect } from "react";
import style from "./Catalog.module.css";
import { EditProductForm } from "./EditProductForm";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../../../api/api";
import { useServices } from "./ServicesContext";

export const Catalog = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState([]);
  const cardsPerPage = 6;
  const { addService } = useServices();
  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setCards(data);
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
      }
    };

    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/check', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        console.log('Auth data:', data);
        if (data.success) {
          setIsAuthenticated(true);
          setUserRole(data.roles || []);
          console.log('User roles set to:', data.roles);
        } else {
          setIsAuthenticated(false);
          setUserRole([]);
          console.log('Auth failed:', data.message);
        }
      } catch (error) {
        console.error("Ошибка проверки аутентификации:", error);
        setIsAuthenticated(false);
        setUserRole([]);
      }
    };

    checkAuth();
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProductData) => {
    try {
      const formData = new FormData();
      formData.append("title", newProductData.title);
      formData.append("description", newProductData.description);
      if (newProductData.image) {
        formData.append("image", newProductData.image);
      }

      const addedProduct = await addProduct(formData);
      console.log("Added product from server:", addedProduct);
      setCards((prev) => [...prev, addedProduct]);
      setEditingProduct(null);
      setCurrentPage(Math.ceil((cards.length + 1) / cardsPerPage));
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
    }
  };

  const handleDeleteProduct = async (index) => {
    const productId = cards[index].id;
    try {
      await deleteProduct(productId);
      setCards((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    const index = cards.findIndex(card => card.id === editingProduct.id);
    const productId = cards[index].id;
    try {
      await updateProduct(productId, updatedProduct);
      setCards((prev) =>
        prev.map((card, i) => (i === index ? { ...card, ...updatedProduct } : card))
      );
      setEditingProduct(null);
    } catch (error) {
      console.error("Ошибка при обновлении товара:", error);
    }
  };

  const handleAddToServices = (card) => {
    addService({
      id: card.id,
      title: card.title,
      description: card.description,
      imgSrc: card.imgSrc,
    });
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <main>
        <div className={style.container}>
          <div className={style.Actually}>Наша продукция</div>

          {isAuthenticated && userRole.includes("ADMIN") && (
            <button
              onClick={() => setEditingProduct(undefined)}
              className={style.addServiceButton}
            >
              Добавить продукт
            </button>
          )}

          <div className={style.cards}>
            {currentCards.map((card, index) => (
              <div
                key={card.id}
                className={`${style.card} ${hoveredIndex === index ? style.flipped : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={style.front}>
                  {card.imgSrc ? (
                    <img src={`${baseUrl}${card.imgSrc}`} alt={card.title} />
                  ) : (
                    <p>Изображение отсутствует</p>
                  )}
                </div>
                <div className={style.back}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <button
                    onClick={() => handleAddToServices(card)}
                    className={style.addServiceButton}
                  >
                    Добавить услугу
                  </button>
                  {isAuthenticated && userRole.includes("ADMIN") && (
                    <div className={style.adminControls}>
                      <button
                        onClick={() => setEditingProduct(card)}
                        className={style.editButton}
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(index)}
                        className={style.deleteButton}
                      >
                        Удалить
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={style.pagination}>
            {Array.from({ length: Math.ceil(cards.length / cardsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? style.active : style.pageButton}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </main>

      {editingProduct !== null && (
        <div className={style.modalOverlay}>
          <EditProductForm
            product={editingProduct === undefined ? null : editingProduct}
            onSave={editingProduct === undefined ? handleAddProduct : handleEditProduct}
            onCancel={() => setEditingProduct(null)}
            onAddProduct={handleAddProduct} // Оставляем для совместимости
          />
        </div>
      )}
    </>
  );
};