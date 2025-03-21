import { useState, useEffect } from "react";
import style from "./Catalog.module.css";
import { EditProductForm } from "./EditProductForm";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../../api/api";
import { useServices } from "./ServicesContext";

export const Catalog = ({ isAuthenticated, userRole }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // null - нет формы, объект - редактирование, undefined - добавление
  const cardsPerPage = 6;
  const { addService } = useServices();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setCards(data);
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const addedProduct = await addProduct(newProduct);
      setCards((prev) => [...prev, addedProduct]);
      setEditingProduct(null); // Закрываем форму после добавления
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
      setEditingProduct(null); // Закрываем форму после редактирования
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

          {isAuthenticated && userRole?.includes("ADMIN") && (
            <button
              onClick={() => setEditingProduct(undefined)} // Открываем форму добавления
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
                  <img src={card.imgSrc} alt={card.title} />
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
                  {isAuthenticated && userRole?.includes("ADMIN") && (
                    <div className={style.adminControls}>
                      <button
                        onClick={() => setEditingProduct(card)} // Открываем форму редактирования
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
            product={editingProduct === undefined ? null : editingProduct} // null для добавления, объект для редактирования
            onSave={editingProduct === undefined ? handleAddProduct : handleEditProduct}
            onCancel={() => setEditingProduct(null)}
            onAddProduct={handleAddProduct}
          />
        </div>
      )}
    </>
  );
};