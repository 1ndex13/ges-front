import React, { useState } from 'react';
import axios from 'axios';
import style from './MyServices.module.css';

export const ModalOrder = ({ isOpen, onClose, serviceTitle }) => {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        phone: '',
        email: '',
        service: serviceTitle
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.post('http://localhost:8080/api/orders', formData, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken') || ''}`
                }
            });
            
            if (response.status === 200) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                }, 2000);
            }
        } catch (err) {
            console.error('Full error:', err);
            setError(err.response?.data || err.message || 'Ошибка при отправке заказа');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (!isOpen) return null;

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <h2>Оформление заказа: {serviceTitle}</h2>
                
                {success && <div className={style.successMessage}>Заказ успешно отправлен!</div>}
                {error && <div className={style.errorMessage}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* Поля формы остаются без изменений */}
                    <input type="text" name="lastName" /* ... */ />
                    <input type="text" name="firstName" /* ... */ />
                    <input type="tel" name="phone" /* ... */ />
                    <input type="email" name="email" /* ... */ />
                    
                    <div className={style.modalActions}>
                        <button type="button" onClick={onClose} disabled={isLoading}>
                            Отмена
                        </button>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Отправка...' : 'Оформить заказ'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};