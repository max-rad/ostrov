const initPopupSlider = () => {
  const slider = document.querySelector('[data-slider="popup"]');

  if (!slider) {
    return;
  }

  const prev = slider.querySelector('[data-button-prev]');
  const next = slider.querySelector('[data-button-next]');

  const swiper = new Swiper(slider, {
    slidesPerView: 'auto',
    navigation: {
      prevEl: prev,
      nextEl: next,
    },
  });
};

export {initPopupSlider};
