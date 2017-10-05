import React from 'react';
import ReactDOM from 'react-dom';

import {GMap} from'./Gmap';

var initialCenter = {lat: 40.65382, lng: -74.69614};

var stations = [
  {
    call:'station one',
    frequency:'000',
    flagLocation: { lat: 40.65656196450863, lng:-74.6949827671051}
  },
  {
    call:'station two',
    frequency:'001',
    flagLocation: { lat: 40.65966118376985, lng: -74.69687640666962}
  }
];

ReactDOM.render(
  <div >
    <GMap initialCenter={initialCenter} stations={stations} />

  </div>,
  document.getElementById('container')
);
