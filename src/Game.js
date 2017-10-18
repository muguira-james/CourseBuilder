import React from 'react';
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
//
// function handleClick() {
//   console.log("in click cb");
// }

export class Game extends React.Component {

  constructor(props) {
    super(props);

    var propValue
    for(var propName in props) {
        propValue = props[propName]

        console.log("prop name: " + propName, "prop value: " + propValue);
    }

    this.state = {
      player_db: null,
      courseConfig: null
    };

    // this.handleClick = this.handleClick.bind(this);

  }

  // handleClick() {
  //
  // }
  componentDidMount() {
    // do http get of player db
    //
    //  or in my case, I aready load it from the html.
    console.log(window.courseConfig);
    this.setState({ courseConfig: window.courseConfig })
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {

  }

	render() {
    return (
      <div className="GMap">

        <CourseBuilder
          initialCenter={initialCenter}
          stations={stations}
          zoomLevel={zoom}
          course={window.courseConfig}
          // onClick={this.handleClick}
        />


      </div>
    )
  }







}
