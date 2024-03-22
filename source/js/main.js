import {initMap} from './modules/init-map';
import {initPopupSlider} from './modules/init-popup-slider';


window.addEventListener('DOMContentLoaded', () => {
  initMap();
  initPopupSlider();

  window.addEventListener('load', () => {
  });
});
