import React from 'react';


export class DetailMap extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mapType: props.mapType,
      zoom: props.zoomLevel,
      mlayout: null,
      mapCenter: props.initialCenter,
      course: props.course,
      players: props.players
    };
    // console.log(props.course)

    var propValue
    for(var propName in this.props) {
        propValue = this.props[propName]
        console.log("prop_name: " + propName, "prop_value: " + propValue);
    }
  }


	render() {
    return (
      <div className="GMap">
        <div className='UpdatedText'>
          <p>Current Zoom: { this.state.zoom }</p>
          <p>Cntl State: {this.state.cntlState}</p>
        </div>
        <div className='GMap-canvas' ref="mapCanvas"></div>
      </div>
    )
  }



  componentDidMount() {
    // create the map after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap()

    this.state.players.map(elm => (this.createMarker(elm)));

    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    window.google.maps.event.addListener(this.map, 'zoom_changed', (evt)=> this.handleZoomChange(evt))
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    window.google.maps.event.clearListeners(this.map, 'zoom_changed')
  }

  createMarker(elm) {
    var image = {
      url: elm.photo,
      scaledSize: new window.google.maps.Size(85,85)
    }
    var r = new window.google.maps.Marker(
      {
        icon: image,
        position: elm.playerLocation,
        map: this.map
      }
    ).addListener('click', function(evt) {
      console.log('in my flag click', evt)
    });
    return r;
  }

  createMap() {
    let mapOptions = {
      zoom: this.state.zoom,
      mapTypeId: this.state.mapType,
      center: this.mapCenter()
    }
    var map = new window.google.maps.Map(this.refs.mapCanvas, mapOptions);

    map.addListener('click', (e) => this.handleMapClick(e));
    return map;
  }



  mapCenter() {
    var ctr = new window.google.maps.LatLng(
      this.state.mapCenter.lat,
      this.state.mapCenter.lng
    );
    this.setState({center: ctr})

    return ctr;
  }

  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom()
    })
    console.log("zoom changed: ",this.state.zoom)
  }


}
