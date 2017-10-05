import React from 'react';
import ReactDOM from 'react-dom';

import {GMap} from'./Gmap';

var initialCenter = { lng: -90.1056957, lat: 29.9717272 }

ReactDOM.render(
  <GMap initialCenter={initialCenter} />,
  document.getElementById('container')
);
