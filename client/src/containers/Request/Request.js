import React, { Component } from 'react'
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Map from '../../components/Map/Map';
import Button from 'muicss/lib/react/button';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import './Request.css';
import Modal from 'react-responsive-modal';

export default class Request extends Component {

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleDestChange = this.handleDestChange.bind(this);
    this.handleDepChange = this.handleDepChange.bind(this);
    this.handleArrChange = this.handleArrChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      open: false,
      modalText: "",
      sourceLocation: "",
      destLocation: "",
      depTime: "",
      arrTime: "",
      name: "",
      source: {
        latitude: "",
        longitude: "",
      }, 
      destination: {
        latitude: "",
        longitude: "",
      }
    }
  }
  handleNameChange(value) {
    this.setState({name: value});
  }
  handleSourceChange(value) {
    const sourceArr = value.trim().split(',');
    const latitude = sourceArr[0];
    const longitude = sourceArr[1];
    this.setState({source: {latitude, longitude}});
    const searchVal = `${longitude},${latitude}`
    const FETCH_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchVal}.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&autocomplete=false&country=in`;
    axios.get(FETCH_URL)
      .then(res => {
        console.log(res);
        this.setState({sourceLocation: res.data.features[0].place_name});
      })
      .catch(err => console.log(err));
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleDestChange(value) {
    const destArr = value.trim().split(',');
    const latitude = destArr[0];
    const longitude = destArr[1];
    this.setState({destination: {latitude, longitude}});
    const searchVal = `${longitude},${latitude}`
    const FETCH_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchVal}.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&autocomplete=false&country=in`;
    axios.get(FETCH_URL)
      .then(res => {
        console.log(res);
        this.setState({destLocation: res.data.features[0].place_name});
      })
      .catch(err => console.log(err));
  }

  handleArrChange(e) {
    this.setState({arrTime: e.target.value});
  }
  handleDepChange(e) {
    this.setState({depTime: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const {name, depTime, arrTime} = this.state;
    if(name.trim() === '' || depTime.trim() === '' || arrTime.trim() === '') {
      this.setState({modalText: "All fields not Selected"});
      this.onOpenModal();
    } else if(this.state.arrTime < this.state.depTime){
      this.setState({modalText: "Arrival must be after Departure"});
      this.onOpenModal();
    } else {
      const body = {
        name: this.state.name,
        sourceLocation: `${this.state.source.latitude},${this.state.source.longitude}`,
        destLocation: `${this.state.destination.latitude},${this.state.destination.longitude}`,
        depTime: this.state.depTime,
        arrTime: this.state.arrTime
      };
      const POST_URL = 'https://stark-ocean-99796.herokuapp.com/api/driver/adddriver'
      axios.post(POST_URL, body)
        .then(res => {
          this.setState({modalText: `Driver ${res.data.name} added Successfully`});
          this.onOpenModal();

        })
        .catch(err => console.log(err))
    }
  }
  render() {
    const { open } = this.state;

    const {sourceLocation, destLocation} = this.state;
    const dateGreater = this.state.arrTime > this.state.depTime;
    console.log(dateGreater);
    return (
      <div className={"container"}>
        <Form className={"form-container"}>
          <legend>Enter Driver Details</legend>
          <Input floatingLabel onChange={(e) => this.handleNameChange(e.target.value)} label="Name" required={true}/>
          <Input floatingLabel onChange={(e) => this.handleSourceChange(e.target.value)} label="Source" required={true} value={sourceLocation}/>
          <Input onChange={(e) => this.handleDestChange(e.target.value)} label="Destination" floatingLabel={true} required={true} value={destLocation}/>
          <Input onChange={this.handleDepChange} label="Earliest Departure Time" type="time" floatingLabel required/>
          <Input onChange={this.handleArrChange} label="Latest Arrival Time" type="time" floatingLabel required/>
          <Button onClick={(e) => this.handleSubmit(e)} variant="raised">Submit</Button>
        </Form>
        <Map className={"map-container"} handleDestChange={this.handleDestChange} handleSourceChange={this.handleSourceChange}></Map>
        {<Modal open={open} onClose={this.onCloseModal} center>
            <header className={"modal-header"}>{this.state.modalText}</header>
        </Modal>}
      </div>
    )
  }
}
