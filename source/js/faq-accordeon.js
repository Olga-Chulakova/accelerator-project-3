const accordions = document.querySelectorAll('.faq__accordeon-item');
const thirdAccordeon = document.querySelector('.faq__accordeon-list .faq__accordeon-item:nth-child(3)');

accordions.forEach((accordion) => {
  const control = accordion.querySelector('.faq__accordeon-control');
  const content = accordion.querySelector('.faq__accordeon-content');

  control.addEventListener('click', (e) => {
    e.preventDefault();

    accordion.classList.toggle('open');

    if (accordion.classList.contains('open')) {
      content.style.maxHeight = `${content.scrollHeight}px`;
      content.classList.add('active');
    } else {
      content.style.maxHeight = null;
      content.classList.remove('active');
    }
  });
});

const openedThirdAccordion = () => {
  if (thirdAccordeon) {
    const content = thirdAccordeon.querySelector('.faq__accordeon-content');
    thirdAccordeon.classList.add('open');
    content.style.maxHeight = `${content.scrollHeight}px`;
    content.classList.add('active');
  }
};

openedThirdAccordion();

window.addEventListener('resize', () => {
  if (thirdAccordeon && thirdAccordeon.classList.contains('open')) {
    const content = thirdAccordeon.querySelector('.faq__accordeon-content');
    content.style.maxHeight = `${content.scrollHeight}px`;
  }
});
