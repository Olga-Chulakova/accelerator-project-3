import Swiper from 'swiper';
import {Navigation, Scrollbar, Mousewheel} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const programsSwiper = new Swiper ('.programs__slider-wrapper', {
  modules: [Navigation, Scrollbar, Mousewheel],
  allowTouchMove: true,
  slidesPerView: 'auto',
  spaceBetween: 15,
  speed: 300,
  scrollbar: {
    el: '.swiper-scrollbar',
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

programsSwiper.init();
