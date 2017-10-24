import React from 'react';
import {DetailMap} from './DetailMap'

var initialCenter = {lat:40.661500, lng:-74.69871558715264};

var zoom = 18;
var players = [
  {
    name:"SUNG HYUNPARK",
    playerId:'000',
    playerLocation: { lat: 40.6623486851535, lng :-74.6991884707586},
    photo: "./playericons/SUNG-HYUNPARK-ICON.png"
  },
  {
    name:"SO YEONRYU",
    playerId:'001',
    playerLocation: { lat: 40.66125811793991, lng: -74.6977293490545},
    photo: "./playericons/SO-YEONRYU-ICON.png"
  }
];
//
// function handleClick() {
//   console.log("in click cb");
// }

export class Game extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      player_db: null,
      courseConfig: null,
      mapType: 'satellite',
    };

  }
  componentDidMount() {
    // do http get of player db
    //
    //  or in my case, I aready load it from the html.
    this.setState({ courseConfig: window.courseConfig })
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {

  }

	render() {
    return (
      <div className="GMap">

        <DetailMap
          initialCenter={initialCenter}
          players={players}
          zoomLevel={zoom}
          mapType={this.state.mapType}
          course={window.courseConfig}
          // onClick={this.handleClick}
        />
      </div>
    )
  }







}
