import { useState, useEffect } from "react";
import style from "../Main.module.css";

export const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "oil_tank.png",
            title: "Наша цистерна — ваша надежность",
        },
        {
            image: "second_oil_tank.png",
            title: "Эффективное хранение — залог стабильности",
        },
        {
            image: "olitrack.png",
            title: "Ваш надежный партнер в доставке топлива",
        },
        {
            image: "oilpump.png",
            title: "Добыча, на которую можно положиться",
        }
    ];

    // Автоматическая смена слайдов по таймеру
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 7000); // Интервал смены слайдов (3 секунды)

        return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className={style.sliderContainer}>
            <div className={style.slider}>
                <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    className={style.slideImage}
                />
                <div className={style.slideContent}>
                    <h2>{slides[currentSlide].title}</h2>
                </div>
            </div>
            <button className={style.prevButton} onClick={prevSlide}>
                &#10094;
            </button>
            <button className={style.nextButton} onClick={nextSlide}>
                &#10095;
            </button>
        </div>
    );
};