import React, { useState, useEffect } from "react";
import style from "./Contacts.module.css";
import { ReviewModal } from "./ReviewModal";
import axiosInstance from "../../../api/axiosConfig";
import { userStore } from "../../../api/UserStore";
import wa from "../../../assets/img/whatsapp.png"
import vk from "../../../assets/img/vk.png"
import telegram from "../../../assets/img/tel.png"

export const Contacts = () => {
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(() => {
    return localStorage.getItem("selectedProductId") || "1";
  });
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/reviews/product/${selectedProductId}`, {
        headers: {
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
        params: { _t: Math.random() },
      });
      const reviewData = Array.isArray(response.data) ? response.data : response.data.reviews || [];
      console.log("Полученные отзывы:", reviewData);
      setReviews([...reviewData]);
    } catch (err) {
      console.error("Ошибка загрузки отзывов:", err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("selectedProductId", selectedProductId);
    console.log("Загрузка отзывов для productId:", selectedProductId);
    fetchReviews();
  }, [selectedProductId]);
  const handleOrderClick = () => {
    if (!userStore.isAuthenticated) {
      alert("Пожалуйста, войдите в систему, чтобы оставить отзыв");
      return;
    }
    setReviewModalOpen(true);
  };

  return (
    <div className={style.container}>
      <div className={style.Actually}>Контакты</div>
      <div className={style.grid}>
        <div className={style.map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d722.6075423755047!2d52.27320860569855!3d54.90053554764909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41605dea06e85221%3A0xf30069a400c0ca9b!2z0YPQuy4g0JzQuNGA0LAsIDgsINCQ0LvRjNC80LXRgtGM0LXQstGB0LosINCg0LXRgdC_LiDQotCw0YLQsNGA0YHRgtCw0L0sIDQyMzQ1Nw!5e0!3m2!1sru!2sru!4v1739356576310!5m2!1sru!2sru"
            width="100%"
            height="100%"
            title="Карта"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        </div>

        <div className={style.contactInfo}>
          <div className={style.contactBlock}>
            <h2>Позвоните нам</h2>
            <ul>
              <li>+7 (987) 566 43 67</li>
              <li>+7 (987) 578 90 35</li>
            </ul>
          </div>
          <div className={style.contactBlock}>
            <h2>Номера для ЕС</h2>
            <ul>
              <li>+53 (495) 018 91 33</li>
              <li>+02 (495) 492 95 66</li>
            </ul>
          </div>
          <div className={style.contactBlock}>
            <h2>Наш адрес</h2>
            <ul>
              <li>город Альметьевск, ул. Мира 10</li>
              <li>ежедневно с 8:00-20:00</li>
            </ul>
          </div>
          <div className={style.contactBlock}>
            <h2>Наш email</h2>
            <ul>
              <li>info@globalenergysolution.ru</li>
            </ul>
          </div>
          <div className={style.social}>
            <a href="#" className={style.socialLink}>
              Telegram <img src={telegram} alt="Telegram" />
            </a>
            <a href="#" className={style.socialLink}>
              Вконтакте <img src={vk} alt="VK" />
            </a>
            <a href="#" className={style.socialLink}>
              WhatsApp <img src={wa} alt="WhatsApp" />
            </a>
            <button onClick={handleOrderClick} className={style.socialLink}>
              Оставить отзыв
            </button>
          </div>
        </div>
      </div>

      {/* Секция отзывов */}
      <div className={style.reviewsSection}>
        <h2>Отзывы</h2>
        {loading ? (
          <p>Загрузка отзывов...</p>
        ) : reviews.length === 0 ? (
          <p>Пока нет отзывов.</p>
        ) : (
          <ul className={style.reviewList}>
            {reviews.map((review) => (
              <li key={review.id} className={style.reviewItem}>
                <p>
                  <strong>{review.username}</strong> ({review.productTitle}): {review.comment}
                </p>
                <small>{new Date(review.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        fetchReviews={fetchReviews}
        setSelectedProductId={setSelectedProductId}
      />
    </div>
  );
};