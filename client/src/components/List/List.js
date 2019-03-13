import React, { Component } from 'react'
import './List.css';
export default class List extends Component {
  render() {
    
    const sourceLocation = this.props.sourceLocation.trim().split(',');
    const destLocation = this.props.destLocation.trim().split(',');
    const sourceLat = sourceLocation[0].substring(0, 6);
    const sourceLong = sourceLocation[1].substring(0, 6);
    const destLat = destLocation[0].substring(0, 5);
    const destLong = destLocation[1].substring(0, 5);
    return (
      <div className={"list-container"}>
        <div className={"order-list-header"}>{this.props.name}</div>
        <div className={"main-text"}>Earliest Departure Time: <span className={"sub-text"}>{this.props.depTime}</span></div>
        <div className={"main-text"}>Latest Arrival Time: <span className={"sub-text"}>{this.props.arrTime}</span></div>
        <div className={"main-text"}>Source Location: <span className={"sub-text"}>{sourceLat},{sourceLong}</span></div>
        <div className={"main-text"}>Destination Location: <span className={"sub-text"}>{destLat},{destLong}</span></div>

      </div>
    )
  }
}
