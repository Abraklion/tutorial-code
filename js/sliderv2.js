window.addEventListener('DOMContentLoaded', function() {

  /* ================================================================= */
  /* ==========================  SLIDER V2  ========================== */
  /* ================================================================= */

  let offset = 0; // смещения
  let slideIndex = 1; // номер слайда

  const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
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

  slider.style.position = 'relative';
  // стили конец

  // Создания навигации по точкам - начало
  const indicators = document.createElement('ol'),
    dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; // Если хотите - добавьте в стили, но иногда у нас нет доступа к стилям
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
    if (i === 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }
  // Создания навигации по точкам - конец

  // вперед
  next.addEventListener('click', () => {
    if (offset === (deleteNotDigits(width) * (slides.length - 1))) {
      // скидываем смешения на первый слайдер
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
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
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
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

  // При клике на точку
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex < 10) {
        current.textContent =  `0${slideIndex}`;
      } else {
        current.textContent =  slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = ".5");
      dots[slideIndex-1].style.opacity = 1;
    });
  });

  // удаляет из строки все кроме чисел
  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

})

