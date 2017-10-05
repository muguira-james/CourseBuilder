import React  from 'react';

import './App.css';
// import {GoogleApiWrapper} from 'google-maps-react';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.mapElement = 0;
  }

  setMapElementReference(mapElementReference) {
    console.log("in setMap: ", mapElementReference);
    // mapElement = mapElementReference;
  }

  componentDidMount () {
    console.log("did mount");
    this.map = new window.google.maps.Map(this.mapElement, {
      zoom: 8,
      center: {
        lat: 51.5085300,
        lng: -0.1257400
      }
    });
  }

  render() {
    const mapStyle = {
      width: 500,
      height: 500
    }
    return (
      <div id="mapid" ref="map" style={mapStyle}>
      </div>
    );
  }
}

export default App;
