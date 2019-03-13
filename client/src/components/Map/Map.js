import React, {Component}  from 'react';
import ReactMapL, {NavigationControl, Marker} from 'react-map-gl';
import './Map.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
 

const TOKEN = 'pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g';

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
  };

export default class Map extends Component {

  constructor(props) {
      super(props);
      this.handleDragEndSource = this.handleDragEndSource.bind(this);
      this.handleDragEndDest = this.handleDragEndDest.bind(this);
      this.state = {
        viewport: {
          latitude: 12.9260,
          longitude: 77.6762,
          zoom: 12,
          width: 800,
          height: 720,
        },
        markerSource: {
            latitude: 12.9260,
            longitude: 77.6762,
        },
        markerDest: {
            latitude: 12.9140,
            longitude: 77.6600,
        }
      };
      this.props.handleDestChange(`${this.state.markerDest.latitude},${this.state.markerDest.longitude}`);
      this.props.handleSourceChange(`${this.state.markerSource.latitude},${this.state.markerSource.longitude}`);

  }

  handleDragEndSource(e) {
      console.log(e.lngLat);
      const markerSource = {latitude: e.lngLat[1], longitude: e.lngLat[0]};
      this.setState({markerSource});
      this.props.handleSourceChange(`${markerSource.latitude},${markerSource.longitude}`);
  }
  handleDragEndDest(e) {
    console.log(e.lngLat);
    const markerDest = {latitude: e.lngLat[1], longitude: e.lngLat[0]};
    this.setState({markerDest});
    this.props.handleDestChange(`${markerDest.latitude},${markerDest.longitude}`);

}
  render() {
    const {viewport} = this.state;
    return (
        <div className={"mapContainer"}>
            <ReactMapL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken={TOKEN}
                onViewportChange={(viewport) => {
                  this.setState({viewport});
                  console.log("View Port Changed");
                }}>
                <Marker draggable {...this.state.markerSource} onDragEnd={this.handleDragEndSource} >
                    <FontAwesomeIcon color={'green'} icon={faMapMarker} />
                </Marker>
                <Marker draggable {...this.state.markerDest} onDragEnd={this.handleDragEndDest} >
                    <FontAwesomeIcon color={'red'} icon={faMapMarker} />
                </Marker>
                <div className="nav" style={navStyle}>
                    <NavigationControl onViewportChange={(viewport) => this.setState({viewport})}/>
                </div>
            </ReactMapL>
        </div>
        
    );
  }
}