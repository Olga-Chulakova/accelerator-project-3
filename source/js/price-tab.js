const buttonsTab = document.querySelectorAll('.tabs__button');

buttonsTab.forEach((buttonTab) => {
  buttonTab.addEventListener('click', () => {
    // 1. Удаляем активный класс со всех кнопок
    buttonsTab.forEach((btn) => {
      btn.classList.remove('tabs__button--active');
    });

    // 2. Добавляем активный класс только текущей кнопке
    buttonTab.classList.add('tabs__button--active');
  });
});
