import React, { Component } from 'react'
import axios from 'axios';
import './Allocation.css';
import List from '../../components/List/List'
import Modal from 'react-responsive-modal';
import ReactMapL, {NavigationControl, Marker} from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
 

const TOKEN = 'pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g';
const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const colors = ["green", "yellow", "blue", "red", "pink", "orange", "brown"];

export default class Alloaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
        drivers: null,
        open: false,
        modalText: null,
        viewport: {
          latitude: 12.9260,
          longitude: 77.6762,
          zoom: 12,
          width: 500,
          height: 500,
        }
    };
  }
  
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const FETCH_URL = 'https://stark-ocean-99796.herokuapp.com/api/driver/getdrivers';
    axios.get(FETCH_URL)
      .then(res => {
        this.setState({drivers: res.data})
      })
      .catch(err => console.log(err));
    const Response = require('../../Mock-data/Allocation.json');
    this.setState({Response});
  
  }
  updateDisplay() {

  }
  handleClick(e, tileIndex) {
    const driverId = this.state.drivers[tileIndex]._id;
    const driverName = this.state.drivers[tileIndex].name;
    this.setState({tileIndex});
    this.setState({driverId});
    this.setState({driverName}, () => {
      this.onOpenModal();
    });
    
  }
  
  render() {
    if(!this.state.drivers || !this.state.Response)
      return null;
        
    const displayData = this.state.drivers.map((item, index) => {
        return <div key={index} onClick={(e) => this.handleClick(e, index)} className={"clickable-tile"}><List {...item}/></div>
    });
    const { open } = this.state;
    const {viewport} = this.state;
    const driverId = this.state.tileIndex? this.state.drivers[this.state.tileIndex]._id : "";
    const driverName = this.state.tileIndex? this.state.drivers[this.state.tileIndex].name: "";
    let modalDisplay = null;
    let legends = null;
    if(this.state.Response[driverId]) {
      modalDisplay = (<div className={"mapContainer"}>
            <ReactMapL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken={TOKEN}
                onViewportChange={(viewport) => {
                  this.setState({viewport});
                  console.log("View port Changed");
                }}>
            {
              driverId && this.state.Response && 
              this.state.Response[driverId].route.map((item, index) => {
                const view = {latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude)}
                return (<Marker key={index} {...view} >
                    <FontAwesomeIcon color={colors[index]} icon={faMapMarker} />
                </Marker>);
              })
            }
            <div className="nav" style={navStyle}>
                <NavigationControl onViewportChange={(viewport) => this.setState({viewport})}/>
            </div>
            </ReactMapL>
        </div>);
      legends = (
        <div>
        <div>Order of Travel</div>
        {
          driverId && this.state.Response &&
          colors.map((item, index) => {
            if(index < this.state.Response[driverId].route.length) {
              return (
                <div>
                  <span style={{'background-color': item}} className={'color-legend'}></span>
                  <span> {index+1} </span>
                </div>
              );
            }

          })
        }
        </div>
      );
    } else {
      modalDisplay = <header className={"modal-header"}>{`No Orders Allocated to ${this.state.driverName}`}</header>;
    }

    return (
      <div className={"driver-container"}>
          <div className="driver-header">Allocation of Orders to Drivers</div>
          <div className={"driver-list-container"}>
            {displayData}
          </div>
          <div>

          </div>
          {<Modal  open={open} onClose={this.onCloseModal} center>
            <div className={"modal-display"}>
            <div className={"map-display"}>
              {modalDisplay}
            </div>
            <div>
              {legends}
            </div>
            </div>
          </Modal>}
      </div>
    );
  }
}
    