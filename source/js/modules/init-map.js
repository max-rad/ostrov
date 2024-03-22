import {ScrollLock} from '../utils/scroll-lock.js';
import ImageLayer from 'ol/layer/Image.js';
import Map from 'ol/Map.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import View from 'ol/View.js';
import Overlay from 'ol/Overlay';
import {getCenter} from 'ol/extent.js';

const initMap = () => {
  const mapElement = document.getElementById('map');

  let currentPoint = null;
  let currentPopup = null;
  let currentMapHeight = mapElement.innerHeight;

  const scrollLock = new ScrollLock();

  const extent = [0, 0, 1400, 874];
  const projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent,
  });

  const imageLayer = new ImageLayer({
    source: new Static({
      attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
      url: 'img/content/map.jpg',
      projection,
      imageExtent: extent,
    }),
  });

  const view = new View({
    projection,
    center: getCenter(extent),
    zoom: 1,
    maxZoom: 4,
    extent,
  });

  const map = new Map({
    layers: [
      imageLayer
    ],
    target: 'map',
    view,
  });

  const coordinates = [
    [354, 469],
    [148, 675],
    [570, 770],
    [944, 821],
    [860, 627],
    [1171, 450]
  ];

  coordinates.forEach((coordinate, index) => {
    const point = new Overlay({
      element: document.querySelector(`[data-point="${index + 1}"]`),
    });

    point.setPosition(coordinate);
    map.addOverlay(point);
    point.getElement().style.display = 'flex';
  });

  document.addEventListener('click', (evt) => {
    const target = evt.target;

    if (!target.closest('[data-popup]') && (currentPoint && target.closest('[data-point]') !== currentPoint)) {
      if (currentPopup.classList.contains('is-active')) {
        currentPopup.classList.remove('is-active');
      }

      if (window.innerWidth < 767) {
        scrollLock.enableScrolling();
      }

      map.getInteractions().forEach((interaction) => {
        if (interaction.values_.active === false) {
          interaction.setActive(true);
        }
      });
    }

    if (target.closest('[data-point]')) {
      currentPoint = target.closest('[data-point]');

      window.history.pushState(null, null, window.location.href.split('?')[0] + `?floor=${currentPoint.dataset.floorId}`);

      map.getView().setZoom(1);
      map.getInteractions().forEach((interaction) => {
        interaction.setActive(false);
      });

      setTimeout(() => {
        const numberOfPoint = target.closest('[data-point]').dataset.point;
        const popup = document.querySelector(`[data-popup="${numberOfPoint}"]`);

        if (window.innerWidth < 767) {
          scrollLock.disableScrolling();
        }

        if (!popup.classList.contains('is-active')) {
          popup.classList.add('is-active');
        }

        currentPopup = popup;
      }, 100);
    }

    if (target.closest('[data-close-popup]')) {
      if (currentPopup.classList.contains('is-active')) {
        currentPopup.classList.remove('is-active');
      }

      if (window.innerWidth < 767) {
        scrollLock.enableScrolling();
      }

      map.getInteractions().forEach((interaction) => {
        interaction.setActive(true);
      });
    }
  });

  // window.onresize = () => {
  //   if (mapElement.offsetHeight !== currentMapHeight) {
  //     currentMapHeight = map.offsetHeight;

  //     if (currentPoint && currentPopup) {
  //       const style = window.getComputedStyle(currentPoint.parentElement);
  //       const matrix = new WebKitCSSMatrix(style.transform);

  //       if (window.innerWidth >= 767) {
  //         currentPopup.style.top = `${matrix.m42 + currentPoint.offsetWidth + 24}px`;
  //       } else {
  //         currentPopup.style.top = '50%';
  //       }
  //     }
  //   }
  // };
};

export {initMap};
