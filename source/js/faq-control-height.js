document.addEventListener('DOMContentLoaded', () => {
  function checkTitleLines() {
    const accordeonItems = document.querySelectorAll('.faq__accordeon-item');
    const tabletWidth = 768;

    accordeonItems.forEach((item) => {
      const control = item.querySelector('.faq__accordeon-control');
      const title = item.querySelector('.faq__accordeon-title');

      if (window.innerWidth >= tabletWidth) {
        const lineHeight = parseFloat(getComputedStyle(title).lineHeight);
        const titleHeight = title.offsetHeight;

        if (titleHeight > lineHeight * 1.1) {
          control.classList.add('faq__accordeon-control--multi-line');
        } else {
          control.classList.remove('faq__accordeon-control--multi-line');
        }
      } else {
        control.classList.remove('faq__accordeon-control--multi-line');
      }
    });
  }

  checkTitleLines();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(checkTitleLines, 100);
  });

  const accordeonButtons = document.querySelectorAll('.faq__accordeon-button');
  accordeonButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setTimeout(checkTitleLines, 300);
    });
  });
});
