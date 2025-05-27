const buttonSlider = document.querySelector('.about__button');
const popapContainer = document.querySelector('.popap-container');
const buttonClosePopup = document.querySelector('.popap-container__button');

buttonSlider.addEventListener('click', () => {
  if (popapContainer.classList.contains('popap-container--closed')) {
    popapContainer.classList.remove('popap-container--closed');
  }
});

buttonClosePopup.addEventListener('click', () => {
  if (!popapContainer.classList.contains('popap-container--closed')) {
    popapContainer.classList.add('popap-container--closed');
  }
});

popapContainer.addEventListener('click', (event) => {
  // Проверяем, что кликнули именно на фон (сам контейнер), а не на его дочерние элементы
  if (event.target === popapContainer) {
    popapContainer.classList.add('popap-container--closed');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !popapContainer.classList.contains('popap-container--closed')) {
    popapContainer.classList.add('popap-container--closed');
  }
});
