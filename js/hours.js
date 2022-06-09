window.addEventListener('DOMContentLoaded', function() {

  /* ================================================================= */
  /* ============================  ЧАСЫ  ============================= */
  /* ================================================================= */

  // функция высчитывает часы | минуты | секунды текущего времени
  function getTimeClock() {
    const date = new Date(),
      hours = date.getHours(), // часы
      minutes = date.getMinutes(), // минуты
      seconds = date.getSeconds(); // секунды

    return {
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  // функция добавляет 0 к однозначный цифрам
  function getZero(num){
    // num - тип: число; формат: 0 - Ꝏ;
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  // функция инициализирует таймер
  function setClock(selector) {
    // selector - тип: строка; формат: .class | #id | tag;
    const timer = document.querySelector(selector),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds');

    updateClock();

    setInterval(updateClock, 1000);

    function updateClock() {
      const t = getTimeClock();

      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

    }
  }

  // вызов функции при рендеринге страницы
  setClock('.timer')

})