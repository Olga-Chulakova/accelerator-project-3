import Swiper from 'swiper';
import {Navigation, Pagination, Mousewheel, Grid} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
const sliderWrapper = document.querySelector('.news-slider__list');
const originalSlides = Array.from(sliderWrapper.children);

let isDesktop = window.innerWidth >= 1440;

function updateDesktopSlideSizes(swiper) {
  const currentIsDesktop = window.innerWidth >= 1440;
  const spaceBetween = 32;

  if (isDesktop && !currentIsDesktop) {
    swiper.slides.forEach((slide) => {
      slide.style.width = '';
      slide.classList.remove('swiper-slide-active');
    });
    swiper.wrapperEl.style.transform = '';
  }

  isDesktop = currentIsDesktop;

  if (isDesktop) {
    const slides = swiper.slides;
    const activeIndex = swiper.activeIndex;

    slides.forEach((slide) => {
      slide.style.width = '286px';
      slide.classList.remove('swiper-slide-active');
    });

    if (slides[activeIndex]) {
      slides[activeIndex].style.width = '604px';
      slides[activeIndex].classList.add('swiper-slide-active');
    }

    let offset = 0;
    for (let i = 0; i < activeIndex; i++) {
      offset += 286 + spaceBetween;
    }

    swiper.wrapperEl.style.transition = 'transform 0.3s ease';
    swiper.wrapperEl.style.transform = `translate3d(${-offset}px, 0, 0)`;
  }
}

function generateDynamicPagination(swiper) {
  const totalLis = originalSlides.length;
  const slidesPerGroup = swiper.params.slidesPerGroup;
  const gridRows = swiper.params.grid.rows;
  const totalSlides = totalLis / gridRows / slidesPerGroup;
  const visibleButtons = Math.min(4, totalSlides);
  const currentLogicalSlide = Math.floor(swiper.realIndex / slidesPerGroup);

  let buttonsHTML = '';
  let startIndex = 0;
  let endIndex = visibleButtons;

  if (totalSlides > 4) {
    if (currentLogicalSlide >= 3 && currentLogicalSlide < totalSlides - 1) {
      startIndex = currentLogicalSlide - 2;
      endIndex = currentLogicalSlide + 2;
      endIndex = Math.min(endIndex, totalSlides);
    }
    if (currentLogicalSlide === totalSlides - 1) {
      startIndex = totalSlides - 4;
      endIndex = totalSlides;
    }
  }

  startIndex = Math.max(0, startIndex);
  endIndex = Math.min(endIndex, totalSlides);

  if (isDesktop) {
    const lastVisibleSlide = totalSlides - 2;
    endIndex = Math.min(endIndex, lastVisibleSlide);
    startIndex = Math.max(0, endIndex - 4);
  }

  for (let i = startIndex; i < endIndex; i++) {
    const slideNumber = i + 1;
    const isActive = i === currentLogicalSlide ? ' news__bullet--active' : '';
    const slideIndex = i;
    buttonsHTML += `<button class="news__bullet${isActive}" type="button" data-slide-index="${slideIndex}" data-slide-number="${slideNumber}">${slideNumber}</button>`;
  }

  return buttonsHTML;
}

function setupPaginationClickHandler(swiperInstance) {
  const paginationContainer = document.querySelector('.news__pagination');

  paginationContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('news__bullet')) {
      const slideIndex = parseInt(event.target.dataset.slideIndex, 10);
      const realIndex = slideIndex * swiperInstance.params.slidesPerGroup;
      swiperInstance.slideTo(realIndex);
      event.preventDefault();
      event.target.focus();
    }
  });

  swiperInstance.on('slideChange', () => {
    const currentSlideIndex = Math.floor(swiperInstance.realIndex / swiperInstance.params.slidesPerGroup);

    const activePaginationButton = paginationContainer.querySelector(`[data-slide-index="${currentSlideIndex}"]`);

    if (activePaginationButton) {
      activePaginationButton.focus();
    }
  });
}

const newsSwiper = new Swiper('.news-slider', {
  modules: [Navigation, Pagination, Mousewheel, Grid],
  allowTouchMove: true,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 20,
  speed: 300,
  grid: {
    rows: 2,
    fill: 'column',
  },
  navigation: {
    nextEl: '.news__slider-button--next',
    prevEl: '.news__slider-button--prev',
  },
  pagination: {
    el: '.news__pagination.swiper-pagination',
    clickable: true,
    type: 'custom',
    bulletClass: 'news__bullet',
    bulletActiveClass: 'news__bullet--active',
    renderCustom: function (swiper) {
      return generateDynamicPagination(swiper);
    },
  },
  breakpoints: {
    768: {
      grid: {
        rows: 2,
        fill: 'row',
      },
      spaceBetween: 30,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1440: {
      grid: {
        rows: 1,
      },
      slidesPerView: 3,
      spaceBetween: 32,
      allowTouchMove: false,
      slidesPerGroup: 1,
    }
  },
  simulateTouch: true,
  touchRatio: 1,

  on: {
    init(swiper) {
      updateDesktopSlideSizes(swiper);
    },
    slideChange(swiper) {
      updateDesktopSlideSizes(swiper);
    },
    resize(swiper) {
      updateDesktopSlideSizes(swiper);
      swiper.pagination.render();
      swiper.pagination.update();
    },
    breakpoint(swiper) {
      updateDesktopSlideSizes(swiper);
    }
  },
});

newsSwiper.init();

setupPaginationClickHandler(newsSwiper);
