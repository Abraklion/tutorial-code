window.addEventListener('DOMContentLoaded', function() {

  /* ================================================================= */
  /* ======================  МОДАЛЬНЫЕ ОКНА  ========================= */
  /* ================================================================= */

  const modalTrigger = document.querySelectorAll('[data-modal-btn]'),
    modal = document.querySelector('[data-modal]');

  // вешаем на все кнопки события клик, по клику показывам модальное окно
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', (e) =>{

      e.preventDefault()
      showModal()

    })
  })

  // вешаем на пространство вокруг модального окна события клик, по клику скрываем модальное окно
  modal.addEventListener('click',(e) => {

    if(e.target === modal || e.target.getAttribute('data-close') === ""){
      hideModal();
    }

  })

  // вешаем на документ события нажата клавиша
  document.addEventListener('keydown', (e) => {

    // если клавиша нажата и ее код Escape и у модального окна есть класс show, скрываем модальное окно
    if(e.code === "Escape" && modal.classList.contains('show')){
      hideModal();
    }

  })

  // показывает модальное окно
  function showModal(){
    modal.classList.add('show')
    modal.classList.remove('hide')

    document.body.style.overflow = 'hidden'

    // нужен для 1 модификации
    clearInterval(modalTimerId)
  }

  // скрывает модальное окно
  function hideModal(){
    modal.classList.add('hide')
    modal.classList.remove('show')

    document.body.style.overflow = ''
  }

  // МОДИФИКАЦИИ

  // Модификация 1. Показывать моальное окно через какой то промежуток времени
  const modalTimerId = setTimeout(showModal, 5000)

  // Модификация 2. Показывать моальное окно когда пользователь долистал до конца страницы

  window.addEventListener('scroll', showModalScroll)

  function showModalScroll(){
    if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
      showModal()
      window.removeEventListener('scroll', showModalScroll)
    }
  }

})