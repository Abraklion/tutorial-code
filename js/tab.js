window.addEventListener('DOMContentLoaded', function() {

  /* ================================================================= */
  /* ============================  ТАБЫ  ============================= */
  /* ================================================================= */

  let tabs = document.querySelectorAll('.tabheader__item'), // пункты меню табов
    tabsContent = document.querySelectorAll('.tabcontent'), // описание табов
    tabsParent = document.querySelector('.tabheader__items'); // родитель пунктов меню табов

  // функция Скрывает табы
  function hideTabContent() {

    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  // функция Показывает табы
  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  // вызов функции при рендеринге страницы
  hideTabContent();
  showTabContent();

  // вешием события клика на родитель пунктов меню
  tabsParent.addEventListener('click', function(event) {

    const target = event.target;

    if(target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }

  });

})