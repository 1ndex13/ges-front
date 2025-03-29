import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './ForgotPassword.module.css';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
            setStep(2);
            setSuccess('Код отправлен на вашу почту');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка отправки кода');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post('http://localhost:8080/api/auth/verify-reset-code', { email, code });
            setStep(3);
            setSuccess('Код подтвержден');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Неверный код');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post('http://localhost:8080/api/auth/reset-password', { 
                email, 
                newPassword 
            });
            setSuccess('Пароль успешно изменен!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка сброса пароля');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={style.container}>
           <div className={style.textForm}>
        <img src="/a-clean-oilman-at-work.png" alt="" />
        <ul>
          <li>Бурение скважин</li>
          <li>Добыча нефти и газа</li>
          <li>Транспортировка и хранение</li>
        </ul>
      </div>
            <form className={style.authForm} onSubmit={
                step === 1 ? handleSendCode : 
                step === 2 ? handleVerifyCode : 
                handleResetPassword
            }>
                <h2>Восстановление пароля</h2>

                {step === 1 && (
                    <>
                        <input
                            type="email"
                            placeholder="Ваш email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Отправка...' : 'Получить код'}
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <input
                            type="text"
                            placeholder="6-значный код"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            maxLength="6"
                            required
                        />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Проверка...' : 'Подтвердить код'}
                        </button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <input
                            type="password"
                            placeholder="Новый пароль"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            minLength="6"
                            required
                        />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Сохранение...' : 'Сохранить пароль'}
                        </button>
                    </>
                )}

                {error && <div className={style.error}>{error}</div>}
                {success && <div className={style.success}>{success}</div>}
            </form>
        </div>
    );
};