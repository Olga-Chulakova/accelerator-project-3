const navMain = document.querySelector('.main-nav');
const button = document.querySelector('.header__button');
const linkDrop = document.querySelectorAll('.menu__link--drop');
const body = document.querySelector('.page-body');
const overlay = document.querySelector('.overlay');

function toggleMenu() {
  navMain.classList.toggle('main-nav--opened');
  navMain.classList.toggle('main-nav--closed');
  body.classList.toggle('no-scroll');
  overlay.classList.toggle('active');
}

button.addEventListener('click', toggleMenu);

overlay.addEventListener('click', () => {
  if (navMain.classList.contains('main-nav--opened')) {
    toggleMenu();
  }
});

linkDrop.forEach((link) => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const parentItem = this.closest('.menu__item');
    const submenu = parentItem.querySelector('.menu__submenu');

    if (parentItem.classList.contains('menu__item--open')) {
      submenu.style.maxHeight = '0';
      submenu.style.opacity = '0';
      parentItem.classList.remove('menu__item--open');
    } else {
      const height = `${submenu.scrollHeight }px`;
      submenu.style.maxHeight = height;
      submenu.style.opacity = '1';
      parentItem.classList.add('menu__item--open');
    }
  });
});
