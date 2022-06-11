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
    bindPostData(item);
  });

  // отправить данные POST запросом
  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.text(); // если принимаете json : json()
  };

  // получить данные GET запросом
  const getData = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  // делает отправку формы на сервер методом Async/await
  function bindPostData(form) {
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

      // если надо конвертировать обьект formData в Json вариант 1
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // если надо конвертировать обьект formData в Json вариант 2
      // const object = {};
      // formData.forEach(function(value, key){
      //   object[key] = value;
      // });

      /* начало запроса */

      // делаем запрос на сервер через Async/awate
      postData('server.php', json)
        .then(data => {

        console.log(data);

        showThanksModal(message.success);

        statusMessage.remove();

      }).catch((e) => {

        console.log(e.message)

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