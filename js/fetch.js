window.addEventListener('DOMContentLoaded', function() {

  /* ================================================================= */
  /* ============================= FETCH ============================= */
  /* ================================================================= */

  const forms = document.querySelectorAll('form');

  // статусы выполнения операций
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    postData(item);
  });

  // делает отправку формы на сервер мотодом XMLHttpRequest
  function postData(form) {
    // form - тип: узел; формат: форма;

    form.addEventListener('submit', (e) => {

      e.preventDefault();

      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement('afterend', statusMessage);

      // обьект помогает работать с формами
      const formData = new FormData(form);

      // если надо конвертировать обьект formData в Json
      const object = {};
      formData.forEach(function(value, key){
        object[key] = value;
      });

      /* начало запроса */

      // делаем запрос на сервер через Fetch
      fetch('server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
      }).then(data => {

        console.log(data);

        showThanksModal(message.success);

        statusMessage.remove();

      }).catch(() => {

        showThanksModal(message.failure);

      }).finally(() => {

        form.reset();

      });

    });

  }

  // оповещения в модальном окне после отправки формы
  function showThanksModal(message) {
    // message - тип: строка; формат: статус выполнения запроса;
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    showModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      hideModal();
    }, 4000);
  }




















  /* ================================================================= */
  /* ================  для работы модального окна  =================== */
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

    if(e.target === modal || e.target.getAttribute('data-close') === "") {
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

  }

  // скрывает модальное окно
  function hideModal(){
    modal.classList.add('hide')
    modal.classList.remove('show')

    document.body.style.overflow = ''
  }

})