import Swiper from 'swiper';
import {Pagination, Mousewheel} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

document.addEventListener('DOMContentLoaded', () => {
  const mainPaginationContainer = document.createElement('div');
  mainPaginationContainer.className = 'hero-slider__pagination';
  document.querySelector('.hero-slider').appendChild(mainPaginationContainer);

  const heroSwiper = new Swiper('.hero-slider', {
    modules: [Pagination, Mousewheel],
    loop: true,
    autoHeight: true,
    allowTouchMove: true,
    simulateTouch: true,
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 700,
    pagination: {
      el: '.hero-slider__pagination',
      type: 'bullets',
      clickable: false,
      bulletClass: 'hero-slider__bullet',
      bulletActiveClass: 'hero-slider__bullet--active',
      renderBullet: function (index, className) {
        return `<button class="${className}" tabindex="0" role="button" type="button" aria-label="Перейти к слайду ${index + 1}"></button>`;
      },
    },
    breakpoints: {
      1400: {
        pagination: {
          clickable: true,
        },
        allowTouchMove: false,
      }
    },
    touchRatio: 1,

    on: {
      init: function(swiper) {
        syncPaginationClones(swiper);
      },
      slideChange: function(swiper) {
        syncPaginationClones(swiper);

        this.slides.forEach((slide, index) => {
          const isActive = index === this.activeIndex;
          slide.querySelectorAll('a, button, input, textarea, select, [tabindex]')
            .forEach((el) => {
              el.tabIndex = isActive ? 0 : -1;
            });
        });
      },
      afterResize: function(swiper) {
        syncPaginationClones(swiper);
      }
    }
  });

  heroSwiper.init();

  function setupBulletClickHandlers(swiper) {
    document.querySelectorAll('.hero-slider__bullet').forEach((bullet) => {
      const newBullet = bullet.cloneNode(true);

      bullet.replaceWith(newBullet);
      newBullet.addEventListener('click', function() {

        const container = this.closest('.pagination-clone');
        const bullets = container.querySelectorAll('.hero-slider__bullet');
        const index = Array.from(bullets).indexOf(this);

        swiper.slideTo(index);
      });
    });
  }

  function syncPaginationClones(swiper) {
    const mainPagination = document.querySelector('.hero-slider__pagination');
    if (!mainPagination) {
      return;
    }

    mainPagination.style.display = 'flex';

    document.querySelectorAll('.hero-slider__pagination-wrapper').forEach((wrapper) => {
      wrapper.innerHTML = '';
      const clone = mainPagination.cloneNode(true);
      clone.classList.add('pagination-clone');
      wrapper.appendChild(clone);
    });

    updateActivePagination(swiper.realIndex);

    setupBulletClickHandlers(swiper);
  }

  function updateActivePagination(activeIndex) {
    document.querySelectorAll('.pagination-clone').forEach((clone) => {
      const bullets = clone.querySelectorAll('.hero-slider__bullet');
      bullets.forEach((bullet, index) => {
        bullet.classList.toggle('hero-slider__bullet--active', index === activeIndex);
      });
    });
  }
});
