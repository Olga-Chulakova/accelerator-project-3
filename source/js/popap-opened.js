const buttonAbout = document.querySelector('.about__button');
const popapContainer = document.querySelector('.popap-container');
const buttonClosePopup = document.querySelector('.popap-container__button');
const body = document.querySelector('.page-body');

buttonAbout.addEventListener('click', () => {
  if (popapContainer.classList.contains('popap-container--closed')) {
    popapContainer.classList.remove('popap-container--closed');
    body.classList.add('no-scroll');
  }
});

buttonClosePopup.addEventListener('click', () => {
  if (!popapContainer.classList.contains('popap-container--closed')) {
    popapContainer.classList.add('popap-container--closed');
    body.classList.remove('no-scroll');
  }
});

popapContainer.addEventListener('click', (event) => {
  if (event.target === popapContainer) {
    popapContainer.classList.add('popap-container--closed');
    body.classList.remove('no-scroll');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !popapContainer.classList.contains('popap-container--closed')) {
    popapContainer.classList.add('popap-container--closed');
    body.classList.remove('no-scroll');
  }
});
