import React from 'react';

class GeneralButton extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleClick}>{this.props.name}</button>
      </div>
    )
  }
}

class HoleNum extends React.Component {
  render() {
    return (
      <div>
        <label>hole</label>
        <input id="holeID" />
      </div>
    )
  }
}


class Locator extends React.Component {
  render() {
    return (
      <div>

        <button onClick={this.props.handleClick}>{this.props.name}</button>
        <input id={this.props.type} />
      </div>
    )
  }
}

class OutLinePointsDisplay extends React.Component {
  render() {
    return (
      <div>
        <textarea rows="20" cols="100" id={this.props.textArea}></textarea>
      </div>
    )
  }
}

export class CourseBuilder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      zoom: 14,
      holeNumData: 1,
      cntlState: "T",
      teeLocation: null,
      flagLocation: null,
      labelLocation: null,
      type: "tloc",
      mlayout: null,
    };
    this.handlClearClick = this.handleClearClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleTClick = this.handleTClick.bind(this);
    this.handleFClick = this.handleFClick.bind(this);
    this.handleLClick = this.handleLClick.bind(this);
    this.handleMaskClick = this.handleMaskClick.bind(this);

    this.handleMapClick = this.handleMapClick.bind(this);
  }

  handleSaveClick() {
    var tloc, floc, lloc, hnumData, mlayout = null;

    if (document.getElementById('tloc').value != null) {
      tloc = document.getElementById('tloc').value;
    } else {
      tloc = "( 0, 0 )"
    }
    if (document.getElementById('floc').value != null) {
      floc = document.getElementById('floc').value;
    } else {
      floc = "(0, 0)"
    }
    if (document.getElementById('lloc').value != null) {
      lloc = document.getElementById('lloc').value;
    } else {
      lloc = "(0, 0)"
    }
    if (document.getElementById('holeID').value != null) {
      hnumData = document.getElementById('holeID').value;
    } else {
      hnumData = "(0, 0)"
    }
    if (document.getElementById('outLP').value != null) {
      mlayout = document.getElementById('outLP').value;
    } else {
      mlayout = "(0, 0)"
    }

    var t = {}
    t.type = "Feature";
    t.properties = {};
    t.properties.image = "Hole" + hnumData + ".png";
    t.properties.page = "Hole" + hnumData + ".html";
    t.properties.number = hnumData;
    t.properties.Tphoto = "./images/Tee2.png";
    t.properties.Flagphoto = "./images/Hole" + hnumData + ".png";
    t.properties.TeeLocation = JSON.stringify(JSON.parse(tloc));
    t.properties.FlagLocation = JSON.stringify(JSON.parse(floc));
    t.properties.labelLocation = JSON.stringify(JSON.parse(lloc));
    t.properties.LayoutCoordinates = {};
    t.properties.LayoutCoordinates.type = "Feature";
    t.properties.LayoutCoordinates.properties = {};
    t.properties.LayoutCoordinates.properties.name = "LineCoordinates";
    t.properties.LayoutCoordinates.geometry = {};
    t.properties.LayoutCoordinates.geometry.type = "LineString";
    t.properties.LayoutCoordinates.geometry.coordinates = "[ " + mlayout + " ]";

    var outp = JSON.stringify(t);
    console.log("------>",outp);
    document.getElementById('outLPD').value = outp;
  }

  handleClearClick() {
    document.getElementById('tloc').value = "";
    document.getElementById('floc').value = "";
    document.getElementById('lloc').value = "";
    document.getElementById('outLP').value = "";
    document.getElementById('outLPD').value = "";
  }
  handleTClick() {
    console.log("t click")
    this.setState({ cntlState: "T"} );
  }
  handleFClick() {
    console.log("f click");
    this.setState( {cntlState: "F"} );
  }
  handleLClick() {
    console.log("l click");
    this.setState( {cntlState: "L"} );
  }
  handleMaskClick() {
    this.setState( { cntlState: "M"} );
  }
  handleMapClick(e) {

    var geo = new window.google.maps.LatLng(e.latLng.lat(), e.latLng.lng())
    console.log("geo = ", geo, this.state.cntlState);
    switch (this.state.cntlState) {
      case "T":
        {
            document.getElementById('tloc').value = JSON.stringify(geo.toJSON());
            this.setState({teeLocation: JSON.stringify(geo.toJSON())});
            break;
        }
      case "F":
        {
          document.getElementById('floc').value = JSON.stringify(geo.toJSON());
          this.setState({flagLocation: JSON.stringify(geo.toJSON())});
          break;
        }
      case "L":
        {
          document.getElementById('lloc').value = JSON.stringify(geo.toJSON());
          this.setState({labelLocation: JSON.stringify(geo.toJSON())});
          break;
        }
      case "M":
        {
          var it = document.getElementById('outLP').value;
          if (it === "") {
            it = it + JSON.stringify(geo) + "\n";
          } else {
            it = it + ', ' + JSON.stringify(geo) + "\n";
          }
          document.getElementById('outLP').value = it;
          break;
        }

      default:
        break;

    }
  }

	render() {
    return (
      <div className="GMap">

        <HoleNum />
        <GeneralButton name="clear" handleClick={this.handleClearClick} />
        <GeneralButton name="Save" handleClick={this.handleSaveClick} />
        <GeneralButton name="Mask" handleClick={this.handleMaskClick} />

        <Locator name="tee" type="tloc" handleClick={this.handleTClick} />
        <Locator name="flag" type="floc" handleClick={this.handleFClick} />
        <Locator name="lable" type="lloc" handleClick={this.handleLClick} />
        <div className='UpdatedText'>
          <p>Current Zoom: { this.state.zoom }</p>
          <p>Cntl State: {this.state.cntlState}</p>
        </div>
        <OutLinePointsDisplay textArea="outLP" />
        <OutLinePointsDisplay textArea="outLPD"/>
        <div className='GMap-canvas' ref="mapCanvas">
        </div>

      </div>
    )
  }


  componentDidMount() {
    // create the map after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap()

    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    window.google.maps.event.addListener(this.map, 'zoom_changed', (evt)=> this.handleZoomChange(evt))
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    window.google.maps.event.clearListeners(this.map, 'zoom_changed')
  }



  createMap() {
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter()
    }
    var map = new window.google.maps.Map(this.refs.mapCanvas, mapOptions);

    map.addListener('click', (e) => this.handleMapClick(e));
    return map;
  }



  mapCenter() {
    var ctr = new window.google.maps.LatLng(
      this.props.initialCenter.lat,
      this.props.initialCenter.lng
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
