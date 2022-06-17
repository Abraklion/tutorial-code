window.addEventListener('DOMContentLoaded', function() {

  /* ================================================================= */
  /* ==========================  SLIDER V1  ========================== */
  /* ================================================================= */

  let slideIndex = 1; // номер слайда которого показываем
  const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current');

  showSlides(slideIndex);

  // считает общие количество слайдов и дописываем 0 в начале если число меньше 10
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }

  // показывает слайд
  function showSlides(n) {

    // если дошли до конца слайдера переходим в начало
    if (n > slides.length) {
      slideIndex = 1;
    }

    // если дошли до начала слайдера переходим в конец
    if (n < 1) {
      slideIndex = slides.length;
    }

    // скрываем все слайды
    slides.forEach((item) => {
      item.classList.add('hide')
      item.classList.remove('show')
    });


    // показываем нужный слайдер
    slides[slideIndex - 1].classList.add('show');
    slides[slideIndex - 1].classList.remove('hide');

    // показывает какой сейчас выводится слайдер по счету
    if (slideIndex < 10) {
      current.textContent =  `0${slideIndex}`;
    } else {
      current.textContent =  slideIndex;
    }
  }

  function plusSlides (n) {
    showSlides(slideIndex += n);
  }

  // назад
  prev.addEventListener('click', function(){
    plusSlides(-1);
  });

  // вперед
  next.addEventListener('click', function(){
    plusSlides(1);
  });


})

