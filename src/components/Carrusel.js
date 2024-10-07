import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/carrusel.css';
import Productos from './Productos';

const Carrousel = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const slidesRef = useRef([]);
  const dotsRef = useRef([]);

  const showSlides = (n) => {
      if (n > slidesRef.current.length) { setSlideIndex(1); }
      if (n < 1) { setSlideIndex(slidesRef.current.length); }

      slidesRef.current.forEach((slide, i) => {
          slide.style.display = (i === slideIndex - 1) ? "block" : "none";
      });

      dotsRef.current.forEach((dot, i) => {
          dot.className = dot.className.replace(" active", "");
          if (i === slideIndex - 1) {
              dot.className += " active";
          }
      });
  };

  useEffect(() => {
      showSlides(slideIndex);
  }, [slideIndex]);

  const plusSlides = (n) => {
      setSlideIndex((prevIndex) => prevIndex + n);
  };

  return (
    <div className="slideshow-container">
      <div ref={el => slidesRef.current[0] = el} className="mySlides fade">
        <img  src={Productos[0].img} alt='Reloj Valkur' />
        <div className="text">Caption Text</div>
      </div>

      <div ref={el => slidesRef.current[1] = el} className="mySlides fade">
        <img src={Productos[1].img} alt='Reloj Quartz' />
        <div className="text">Caption Two</div>
      </div>

      <div ref={el => slidesRef.current[2] = el} className="mySlides fade">
        <img src={Productos[2].img} alt='Reloj Seger' />
        <div className="text">Caption Three</div>
      </div>

      <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
      <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
    </div>

  );
};

export default Carrousel;