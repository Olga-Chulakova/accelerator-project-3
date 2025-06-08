import Swiper from 'swiper';
import {Navigation, Mousewheel, Grid} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const newsSwiper = new Swiper ('.news__slider-wrapper', {
  modules: [Navigation, Mousewheel, Grid],
  allowTouchMove: true,
  slidesPerView: 1,
  spaceBetween: 20,
  speed: 300,
  // grid: {
  //   rows: 2,
  //   fill: 'row',
  // },
  navigation: {
    nextEl: '.news__slider-button--next',
    prevEl: '.news__slider-button--prev',
  },
  breakpoints: {
    768: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 32,
      allowTouchMove: false,
    }
  },
  simulateTouch: true,
  touchRatio: 1,
});

newsSwiper.init();
