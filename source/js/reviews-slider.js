import Swiper from 'swiper';
import {Navigation, Scrollbar, Mousewheel} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const reviewsSwiper = new Swiper ('.reviews__slider-wrapper', {
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
    nextEl: '.reviews__slider-button--next',
    prevEl: '.reviews__slider-button--prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 'auto',
      spaceBetween: 30,
    },
    1440: {
      scrollbar: {
        dragSize: 394 | 'auto',
      },
      slidesPerView: 2,
      spaceBetween: 32,
      allowTouchMove: false,
    }
  },
  simulateTouch: true,
  touchRatio: 1,
});

reviewsSwiper.init();
