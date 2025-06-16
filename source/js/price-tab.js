const buttonsTab = document.querySelectorAll('.tabs__button');

buttonsTab.forEach((buttonTab) => {
  buttonTab.addEventListener('click', () => {
    buttonsTab.forEach((btn) => {
      btn.classList.remove('tabs__button--active');
    });

    buttonTab.classList.add('tabs__button--active');
  });
});
