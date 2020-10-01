// Stellar Labs - тестовое задание

// First task
// ---------------
// ---------------
// ---------------
/* 
  Написать функцию, которая будет возвращать количество товаров в категории.
  https://boscooutlet.ru/catalog/men/obuv_1/
*/

// На выполнение потрачено 20 минут

(function getGoodsAmount() {
  // Find the goods amount element
  let goodsAmountEl = document.querySelector(".view-order .view-order-qnt");
  // Throw an error if the element has not been found
  if (!goodsAmountEl) {
    console.error("The element has not been found");
    return;
  }
  // Derive the goods amount from the element's contents
  let result = parseInt(goodsAmountEl.innerHTML.replace(/[^0-9.]/g, ""));
  return result;
})();

// ---------------

// Second task
// ---------------
// ---------------
// ---------------
/* 
  Написать JS функцию, которая делает кнопку купить приклеенной к низу экрана.
  https://www.techport.ru/katalog/products/melkobytovaja-tehnika/melkie-kuhonnye-pribory/mini-pechi/gemlux-gl-or-1838mn
*/

// На выполнение потрачено 40 минут

// Changing element position via modifing inline styles

(function changeButtonPosition() {
  // Find button and change its position
  let buttonEl = document.querySelector(
    "#item_button_buy.tcp-button.tcp-button_orange.tcp-button_xlg.btn_buy"
  );
  // Throw an error if the button has not been found
  if (!buttonEl) {
    console.error("The element has not been found");
    return;
  }
  document.body.appendChild(buttonEl);
  // Adjust styles of the button
  buttonEl.style.cssText =
    "position: fixed; right: 10px; bottom: 10px;z-index: 1000;width: 150px;";
})();

// Changing element position through adding a style tag
// Более гибкое решение с точки зрения дизайна при котором можно добавить медиа запросы, эффекты при наведении, анимации и т.д.. Но при добавление стилей таким образом они применяются на всей странице и есть опасность вызвать конфликт с уже имеющимися стилями.
(function changeButtonPosition() {
  // Find button and change its position
  let queryString =
    "#item_button_buy.tcp-button.tcp-button_orange.tcp-button_xlg.btn_buy";
  let buttonEl = document.querySelector(queryString);
  // Throw an error if the button has not been found
  if (!buttonEl) {
    console.error("The element has not been found");
    return;
  }
  document.body.appendChild(buttonEl);
  // Create, tune and add style element
  let styleEl = document.createElement("style");
  styleEl.innerHTML =
    queryString +
    "{position: fixed;right: calc(50% - 594px);bottom: 20px;z-index: 1000;width: 150px;}@media (max-width: 1439px) {" +
    queryString +
    "{right: 40px;}} @media (max-width: 1199px) {" +
    queryString +
    "{right: 20px;}} @media (max-width: 749px) {" +
    queryString +
    "{right: 10px;bottom: 10px;}}";
  document.head.appendChild(styleEl);

  console.log(buttonEl);
})();

// ---------------

// Third task
// ---------------
// ---------------
// ---------------
/* 
  Сделать чтобы пункт меню "Мебель" был первым в списке.
  https://www.techport.ru/
*/

// На выполнение потрачено 20 минут

(function liftListCategory() {
  // Find listCategory and list elements
  let listEl = document.querySelector(".tcp-category-list");
  let listCategoryEl = document.querySelector(
    ".tcp-category-list__item.hov.item_422.menu-item_init"
  );
  // Throw an error if one of the elements has not been found
  if (!listEl || !listCategoryEl) {
    console.error("The element has not been found");
    return;
  }
  // Change listCategory position
  listEl.insertBefore(listCategoryEl, listEl.firstChild);
})();

// ---------------

// Forth task
// ---------------
// ---------------
// ---------------
/* 
  Сделать кнопку "наверх", например здесь:
  https://www.techport.ru/katalog/products/striralnye-mashiny
*/

// На выполнение потрачено 120 минут

(function createUpButton() {
  let startTime = null;
  function ease(currentTime, startValue, changeInValue, duration) {
    currentTime /= duration / 2;

    if (currentTime < 1)
      return (changeInValue / 2) * currentTime * currentTime + startValue;
    currentTime--;
    return (
      (-changeInValue / 2) * (currentTime * (currentTime - 2) - 1) + startValue
    );
  }

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;

    let timeElapsed = currentTime - startTime;
    let positionY = ease(timeElapsed, pageYOffset, -pageYOffset, 750);

    window.scrollTo(0, positionY);
    if (timeElapsed < 1000) {
      requestAnimationFrame(animation);
    } else {
      startTime = null;
    }
  }

  function movePageUp(e) {
    let pageYOffset = window.pageYOffset || document.documentElement.scrollTop;

    if (pageYOffset) {
      requestAnimationFrame(animation);
    }
  }

  function onScroll(e) {
    if ((window.pageYOffset || document.documentElement.scrollTop) === 0) {
      buttonEl.classList.add(className + "--hidden");
    } else {
      buttonEl.classList.remove(className + "--hidden");
    }
  }

  // Create a button element
  let buttonEl = document.createElement("button");

  let className = "btn__move-page-up";

  // Tune the button element
  buttonEl.innerHTML =
    '<svg viewBox="0 0 492 492"><path d="M442.627,185.388L265.083,7.844C260.019,2.78,253.263,0,245.915,0c-7.204,0-13.956,2.78-19.02,7.844L49.347,185.388c-10.488,10.492-10.488,27.568,0,38.052l16.12,16.128c5.064,5.06,11.82,7.844,19.028,7.844c7.204,0,14.192-2.784,19.252-7.844l103.808-103.584v329.084c0,14.832,11.616,26.932,26.448,26.932h22.8c14.832,0,27.624-12.1,27.624-26.932V134.816l104.396,104.752c5.06,5.06,11.636,7.844,18.844,7.844s13.864-2.784,18.932-7.844l16.072-16.128C453.163,212.952,453.123,195.88,442.627,185.388z"/></svg>';
  buttonEl.classList.add(className);
  buttonEl.addEventListener("click", movePageUp);

  // Create a style element
  let styleEl = document.createElement("style");
  // Tune the style element
  styleEl.innerHTML =
    "." +
    className +
    "{position: fixed;right: 25px;bottom: 25px;z-index: 1000;cursor: pointer;width: 65px;height: 65px;border-radius: 50%;border: none;background-color: #732b90;transition: all 0.3s ease;outline: none;display: flex;align-items: center;justify-content: center;}." +
    className +
    "." +
    className +
    "--hidden {transform: rotate(180deg);right: -100px;}." +
    className +
    ":hover {box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.12);background-color: #5e3c88;}." +
    className +
    " svg {height: 30px;width: 30px;fill: #fff;transform: translateY(0px);}@media (max-width: 1199px) {." +
    className +
    " {right: 20px;bottom: 20px;}}@media (max-width: 749px) {." +
    className +
    " {right: 10px;bottom: 10px;}}";
  // Append the elements to the body
  document.head.appendChild(styleEl);
  document.body.appendChild(buttonEl);

  // Add an onScroll event listener to window
  window.addEventListener("scroll", onScroll);
})();

// Fifth task
// ---------------
// ---------------
// ---------------
/* 
  Абстрактный сайт долго загружается, при условии нормального интернета и отсутствия неполадок на сервере. Ваши действия?
*/
/* 
  Моим первым шагом было бы открыть панель разработки и посмотреть через отладчик что препятствует быстрой загрузке сайта. Причин медленной загрузки может быть огромное множество. 

  Например, скрипты могут быть подключены не в оптимальном месте в HTML коде препятствуя загрузке страницы. Также файлы стилей и скриптов могут быть не уменьшены в объеме ( минифицированны ) и потому медленно загружаются. Также может быть проблема с используемыми медиа файлами. Картинки и видео могут чрезмерно много весить и требовать много времени на их подгрузку. Также проблема может быть в самих скриптах. Код в скрипте может долго исполняться и останавливать загрузку страницы, например по причине наличия ресурсоемких циклов и других ошибок в архитектуре кода.

  Далее в зависимости от обнаруженных проблем нужно исправить их используя подходящие инструменты. Правильно подключить скрипты в html, возможно с использованием атрибутов defer и async. Минифицировать код и стили через bundler ( допустим webpack ). Реализовать загрузку медиа файлов разных разрешений в зависимости от экрана устройства через медиа запросы. Оптимизировать имеющиеся проблемные места в коде тратящие много времени и ресурсов на их исполнение.
*/

// Sixth task
// ---------------
// ---------------
// ---------------
/* 
  Перечислите актуальные на ваш взгляд JS-фреймворки (фронт/бэк). Чем пользуетесь сами и почему?
*/
/*
  Сейчас в большинстве своих проектов я использую React. React – это библиотека для работы с DOM деревом, создания компонентной структуры и разделения кода на легко поддерживаемые части. Он облегчает и ускоряет процесс разработки, плюс в сочетание например с Redux, MobX ( я использую  Redux ),  позволяет создать общее хранилище данных в приложении, которое служит единственным источником истины для всех компонентов приложения и которое еще больше улучшает архитектуру. Популярными аналогами React являются Vue и Angular.

  Не фреймворком, но очень полезным инструментом как на frontend так и на backend является Typescript. Typescript - это язык программирования который привносит статическое назначение типов в js ( в чистом js типизация динамическая ), а также множество других полезных дополнений которые позволяет лучше структурировать код и избегать потенциальных ошибок. Я работал с typescript и сейчас хочу чаще использовать его в своих проектах.

  На backend я работаю с таким фреймворком как Express. Express - это серверный фреймворк для приложений на node.js. Он легко позволяет строить  web-приложения, а также API. Минималистичен и прост в использовании. Я использую его если нужно сделать небольшой сервер для работы с базой данных ( mongoDB ).
*/

// Seventh task
// ---------------
// ---------------
// ---------------
/* 
  Клиент пишет вам “Поехали верстка! Убирайте срочно!”. Что будете делать?
*/
/* 
  При условии что ситуация происходит  в компании, то с клиентами обычно взаимодействуют не разработчики, а продукт-менеджеры, которые сортируют задачи и проблемы по степени срочности и выдают задание разработчикам. Это сделано для эффективной организации трудового процесса компании. Если же разработчик является, например фрилансером и сам общается с клиентом, то тогда нужно самому выполнить работу продукт-менеджера выяснить масштаб проблем, понять степень срочности и решать их в порядке приоритета.
*/
