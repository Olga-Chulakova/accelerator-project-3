import Swiper from 'swiper';
import {Navigation, Pagination, Mousewheel, Grid} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
const sliderWrapper = document.querySelector('.swiper-wrapper');
const originalSlides = Array.from(sliderWrapper.children);

let isDesktop = window.innerWidth >= 1440;

function updateDesktopSlideSizes(swiper) {
  const currentIsDesktop = window.innerWidth >= 1440;
  const spaceBetween = 32; // отступ для десктопа, как в breakpoints 1440

  // При переходе с десктопа на меньший экран — сбрасываем стили и трансформацию
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

    // Устанавливаем ширину и класс активного слайда
    slides.forEach((slide) => {
      slide.style.width = '286px';
      slide.classList.remove('swiper-slide-active');
    });

    if (slides[activeIndex]) {
      slides[activeIndex].style.width = '604px';
      slides[activeIndex].classList.add('swiper-slide-active');
    }

    // Рассчитываем смещение контейнера вручную, учитывая spaceBetween
    let offset = 0;
    for (let i = 0; i < activeIndex; i++) {
      offset += 286 + spaceBetween;
    }

    // Применяем трансформацию, чтобы активный слайд был прижат к левому краю
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
    // Общая логика для слайдов, начиная с 4 и до предпоследнего
    if (currentLogicalSlide >= 3 && currentLogicalSlide < totalSlides - 1) {
      startIndex = currentLogicalSlide - 2; // Два слайда назад
      endIndex = currentLogicalSlide + 2; // Один слайд вперед, плюс текущий и предыдущий
      endIndex = Math.min(endIndex, totalSlides); // Убедимся, что не выходим за границы
    }
    //Обработка последнего слайда
    if (currentLogicalSlide === totalSlides - 1) {
      startIndex = totalSlides - 4;
      endIndex = totalSlides;
    }
  }

  startIndex = Math.max(0, startIndex); // Не меньше 0
  endIndex = Math.min(endIndex, totalSlides); // Не больше totalSlides

  // Обрезаем endIndex для десктопа
  if (isDesktop) {
    const lastVisibleSlide = totalSlides - 2; // Индекс последнего слайда, который может быть активным
    endIndex = Math.min(endIndex, lastVisibleSlide); // Обрезаем endIndex, если он больше
    startIndex = Math.max(0, endIndex - 4); // Корректируем startIndex, чтобы всегда было 4 кнопки
  }

  for (let i = startIndex; i < endIndex; i++) {
    const slideNumber = i + 1;
    const isActive = i === currentLogicalSlide ? ' news__bullet--active' : ''; // Используем currentLogicalSlide
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
      const realIndex = slideIndex * swiperInstance.params.slidesPerGroup; // Вычисляем реальный индекс
      swiperInstance.slideTo(realIndex);
      event.preventDefault();

      // Устанавливаем фокус на активную кнопку после переключения слайда
      event.target.focus();
    }
  });

  // Обработчик события slideChange для управления фокусом при смене слайда
  swiperInstance.on('slideChange', () => {
    // Находим индекс текущего слайда
    const currentSlideIndex = Math.floor(swiperInstance.realIndex / swiperInstance.params.slidesPerGroup);

    // Находим кнопку пагинации, соответствующую текущему слайду
    const activePaginationButton = paginationContainer.querySelector(`[data-slide-index="${currentSlideIndex}"]`);

    // Если кнопка найдена, устанавливаем на нее фокус
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
