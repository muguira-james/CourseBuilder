import React from 'react';
import ReactDOM from 'react-dom';

// import {GMap} from './Gmap.js';

// import {DetailMap} from'./DetailMap';
import {CourseBuilder} from './CourseBuilder'

var initialCenter = {lat: 40.65382, lng: -74.69614};
var zoom = 12;
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

// function handleClick() {
//   console.log("in click cb");
// }
ReactDOM.render(
  <div >
    <CourseBuilder
      initialCenter={initialCenter}
      stations={stations}
      zoomLevel={zoom}
      // onClick={this.handleClick}
      />

  </div>,
  document.getElementById('container')
);
