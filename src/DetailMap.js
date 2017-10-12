import React from 'react';


export class DetailMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      zoom: 14,
      center: null,
      flags: null,
      players: null,
    };
  }


	render() {
    return <div className="DetailMap">
      <div className='UpdatedText'>
        <p>Current Zoom: { this.state.zoom }</p>
      </div>
      <div className='DetailMap-canvas' ref="mapCanvas">
      </div>

    </div>
  }

  createJMarker(elm) {
    console.log(this.props.stations) ;
    var r = new window.google.maps.Marker(
      {
        position: elm.flagLocation,
        map: this.map
      }
    ).addListener('click', function(evt) {
      console.log('in my flag click', evt)
    });
    return r;
    // <div>
    // {this.props.stations.map(station => (
    // <div className="station" key={station.call}>{station.call}</div>
    // ))}
    // </div>
  }

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap()
    this.props.stations.map(elm => (
      this.createJMarker(elm)
    ))
    // ßthis.marker = this.createJMarker()
    this.infoWindow = this.createInfoWindow()
    // console.log("i see stations", this.stations)

    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    window.google.maps.event.addListener(this.map, 'zoom_changed', ()=> this.handleZoomChange())
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    window.google.maps.event.clearListeners(this.map, 'zoom_changed')
  }

  createMap() {
    let mapOptions = {
      zoom: this.mapZoom(),
      center: this.mapCenter()
    }
    return new window.google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  mapZoom() {
    this.setState({ zoom: this.props.zoomLevel })
    return this.props.zoomLevel;
  }
  mapCenter() {
    var ctr = new window.google.maps.LatLng(
      this.props.initialCenter.lat,
      this.props.initialCenter.lng
    );
    this.setState({center: ctr})

    return ctr;
  }


  createMarker() {
    return new window.google.maps.Marker({
      position: this.mapCenter(),
      map: this.map
    })
	}

  createInfoWindow() {
    let contentString = "<div class='InfoWindow'>I'm a Window that contains Info Yay</div>"
    return new window.google.maps.InfoWindow({
      map: this.map,
      anchor: this.marker,
      content: contentString
    })
  }

  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom()
    })
    console.log("zoom changed: ",this.state.zoom)
  }
}
