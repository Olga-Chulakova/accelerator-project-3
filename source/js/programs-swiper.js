import Swiper from 'swiper';
import {Navigation, Scrollbar, Mousewheel} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const sliderWrapper = document.querySelector('.programs__list');
const originalSlides = Array.from(sliderWrapper.children);

const programsSwiper = new Swiper ('.programs__slider-wrapper', {
  modules: [Navigation, Scrollbar, Mousewheel],
  allowTouchMove: true,
  slidesPerView: 'auto',
  spaceBetween: 15,
  speed: 300,
  scrollbar: {
    el: '.programs__scrollbar.swiper-scrollbar',
    draggable: true,
    dragSize: 326 | 'auto',
  },
  navigation: {
    nextEl: '.programs__slider-button--next',
    prevEl: '.programs__slider-button--prev',
  },
  breakpoints: {
    768: {
      spaceBetween: 30,
      slidesPerView: 'auto',
    },
    1440: {
      scrollbar: {
        dragSize: 394 | 'auto',
      },
      spaceBetween: 32,
      allowTouchMove: false,
    }
  },
  simulateTouch: true,
  touchRatio: 1,
});

function duplicateSlides(copies = 1) {
  for (let i = 0; i < copies; i++) {
    originalSlides.forEach((slide) => {
      const clone = slide.cloneNode(true);

      clone.removeAttribute('data-swiper-slide-index');
      clone.removeAttribute('aria-hidden');
      clone.removeAttribute('role');
      clone.removeAttribute('style');

      clone.classList.remove(
        'swiper-slide',
        'swiper-slide-active',
        'swiper-slide-next',
        'swiper-slide-prev',
        'swiper-slide-duplicate'
      );
      clone.className = slide.className;

      clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));

      sliderWrapper.appendChild(clone);
    });
  }
}

duplicateSlides(2);

programsSwiper.init();
