import React, { Component } from 'react'
import axios from 'axios';
import './Driver.css';
import List from '../../components/List/List'


export default class Driver extends Component {
constructor(props) {
  super(props);
  this.state = {
      drivers: null,
    }
  }

  componentDidMount() {
		const FETCH_URL = 'https://stark-ocean-99796.herokuapp.com/api/driver/getdrivers';
		axios.get(FETCH_URL)
			.then(res => {
				this.setState({drivers: res.data})
			})
			.catch(err => console.log(err));
	}
  render() {
    if(!this.state.drivers)
			return null;
		
		const displayData = this.state.drivers.map((item, index) => {
			return <div className={"tile"}><List {...item}/></div>
		});
    return (
      <div className={"driver-container"}>
				<div className="driver-header">List of Drivers</div>
				<div className={"driver-list-container"}>
				{displayData}
				</div>
      </div>
    );
  }
}
