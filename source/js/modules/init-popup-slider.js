const initPopupSlider = () => {
  const sliders = document.querySelectorAll('[data-slider="popup"]');

  if (!sliders.length) {
    return;
  }

  sliders.forEach((slider) => {
    const prev = slider.querySelector('[data-button-prev]');
    const next = slider.querySelector('[data-button-next]');

    const swiper = new Swiper(slider, {
      slidesPerView: 'auto',
      navigation: {
        prevEl: prev,
        nextEl: next,
      },
    });
  });
};

export {initPopupSlider};
