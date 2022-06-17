window.addEventListener('DOMContentLoaded', function() {

  /* ================================================================= */
  /* ==========================  SLIDER V2  ========================== */
  /* ================================================================= */

  let offset = 0; // смещения
  let slideIndex = 1; // номер слайда

  const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector('.offer__slider-inner');


  // считает общие количество слайдов и дописываем 0 в начале если число меньше 10
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }

  // показывает какой сейчас выводится слайдер по счету
  if (slideIndex < 10) {
    current.textContent =  `0${slideIndex}`;
  } else {
    current.textContent =  slideIndex;
  }

  // стили начало
  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });
  // стили конец

  // вперед
  next.addEventListener('click', () => {
    if (offset === (+width.slice(0, width.length - 2) * (slides.length - 1))) {
      // скидываем смешения на первый слайдер
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    // скидываем счетчик на первый слайдер
    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    // показывает какой сейчас выводится слайдер по счету
    if (slideIndex < 10) {
      current.textContent =  `0${slideIndex}`;
    } else {
      current.textContent =  slideIndex;
    }
  });

  // назад
  prev.addEventListener('click', () => {
    if (offset === 0) {
      // скидываем смешения на последний слайдер
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    // скидываем счетчик на последний слайдер
    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    // показывает какой сейчас выводится слайдер по счету
    if (slideIndex < 10) {
      current.textContent =  `0${slideIndex}`;
    } else {
      current.textContent =  slideIndex;
    }
  });

})

