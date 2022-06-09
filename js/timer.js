window.addEventListener('DOMContentLoaded', function() {

  /* ================================================================= */
  /* ===========================  ТАЙМЕР  ============================ */
  /* ================================================================= */

  // Крайний срок (таймер работает до этой даты)
  const deadline = '2022-07-26';

  // функция высчитывает дни | часы | минуты | секунды до наступления крайнего срока
  function getTimeRemaining(endTime) {
    // endTime - тип: строка; формат: 0000-00-00;

    let days, hours, minutes, seconds;

    const t = Date.parse(endTime) - Date.parse(new Date());

    if(t <= 0){

      days = 0
      hours = 0
      minutes = 0
      seconds = 0

    }else{

      days = Math.floor( (t/(1000*60*60*24)) ) // дни
      hours = Math.floor( (t/(1000*60*60) % 24) ) // часы
      minutes = Math.floor( (t/1000/60) % 60 ) // минуты
      seconds = Math.floor( (t/1000) % 60 ) // секунды

    }

    return {
      'total': t,
      'days': days,
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
  function setTimer(selector, endTime) {
    // selector - тип: строка; формат: .class | #id | tag;
    // endTime - тип: строка; формат: 0000-00-00;
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  // вызов функции при рендеринге страницы
  setTimer('.timer', deadline);

})