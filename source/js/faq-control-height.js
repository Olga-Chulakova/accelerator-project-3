document.addEventListener('DOMContentLoaded', () => {
  // Функция для проверки многострочных заголовков
  function checkTitleLines() {
    const accordeonItems = document.querySelectorAll('.faq__accordeon-item');
    const tabletWidth = 768; // Замените на ваше значение $tablet

    accordeonItems.forEach((item) => {
      const control = item.querySelector('.faq__accordeon-control');
      const title = item.querySelector('.faq__accordeon-title');

      // Проверяем только на планшетных и десктопных экранах
      if (window.innerWidth >= tabletWidth) {
        // Получаем высоту одной строки
        const lineHeight = parseFloat(getComputedStyle(title).lineHeight);
        // Получаем фактическую высоту заголовка
        const titleHeight = title.offsetHeight;

        // Если высота заголовка больше чем высота одной строки
        if (titleHeight > lineHeight * 1.1) { // 1.1 - небольшой запас
          control.classList.add('faq__accordeon-control--multi-line');
        } else {
          control.classList.remove('faq__accordeon-control--multi-line');
        }
      } else {
        // На мобильных устройствах удаляем класс
        control.classList.remove('faq__accordeon-control--multi-line');
      }
    });
  }

  // Запускаем при загрузке
  checkTitleLines();

  // Оптимизированная обработка изменения размера окна
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(checkTitleLines, 100);
  });

  // Если у вас есть динамическое открытие/закрытие аккордеона
  const accordeonButtons = document.querySelectorAll('.faq__accordeon-button');
  accordeonButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setTimeout(checkTitleLines, 300); // Проверяем после анимации
    });
  });
});
