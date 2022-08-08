(function() {
  const sliderCardContainer = document.querySelector('.slider-card__slider');
  if (sliderCardContainer) {
      const sliderCardSlider = new Swiper(sliderCardContainer, {
        slidesPerView: 1,
        // loop: true,
        // preloadImages: false,
        spaceBetween: 15,
        breakpoints: {
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          690: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1450: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          // 420: {
          //   slidesPerView: 2.5,
          //   spaceBetween: 17,
          // },
        },
        navigation: {
          nextEl: '.slider-card__button-next',
          prevEl: '.slider-card__button-prev',
        }
      })
  }
})()