import ImageLayer from 'ol/layer/Image.js';
import Map from 'ol/Map.js';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import View from 'ol/View.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector.js';
import {getCenter} from 'ol/extent.js';

const initMap = () => {
  const extent = [0, 0, 1920, 1202];
  const projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: extent,
  });

  const iconFeature = new Feature({
    geometry: new Point([600, 600]),
    name: 'Null Island',
    population: 4000,
    rainfall: 500,
  });

  const vectorSource = new VectorSource({
    features: [iconFeature],
    // ,projection: projection
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  const map = new Map({
    layers: [
      new ImageLayer({
        source: new Static({
          attributions: '© <a href="https://xkcd.com/license.html">xkcd</a>',
          url: 'img/content/map.jpg',
          projection: projection,
          imageExtent: extent,
        }),
      }),
      vectorLayer
    ],
    target: 'map',
    view: new View({
      projection: projection,
      center: getCenter(extent),
      zoom: 1,
      maxZoom: 8,
      extent: [0, 0, 1920, 1202],
    }),
  });
};

// import Projection from 'ol/proj/Projection.js';
// import Tile from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import {Map, View} from 'ol';
// import proj from 'ol/proj';
// import {getCenter} from 'ol/extent.js';
// import XYZ from 'ol/source/XYZ';

// const initMap = () => {
//   const extent = [0, 0, 3840, 2404];
//   const projection = new Projection({
//     code: 'xkcd-image',
//     units: 'pixels',
//     extent: extent,
//   });

//   const newLayer = new Tile({
//     source: new XYZ({
//       url: 'img/content/tiles/{z}/{x}/{y}.png',
//     }),
//   });

//   const map = new Map({
//     layers: [
//       newLayer
//     ],
//     controls: [],
//     target: 'map',
//     view: new View({
//       center: getCenter(extent),
//       zoom: 4,
//       minZoom: 1,
//       maxZoom: 20,
//     }),
//   });
// };

export {initMap};
