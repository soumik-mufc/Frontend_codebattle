import React, { Component } from 'react'
import axios from 'axios';
import List from '../../components/List/List';
import './Order.css'
export default class Order extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: null,
		}
	}

	componentDidMount() {
		const FETCH_URL = 'https://stark-ocean-99796.herokuapp.com/api/product/getproducts';
		axios.get(FETCH_URL)
			.then(res => {
				this.setState({orders: res.data})
			})
			.catch(err => console.log(err));
	}

	
  render() {
		if(!this.state.orders)
			return null;
		
		const displayData = this.state.orders.map((item, index) => {
			return <div key={index} className={"tile"}><List key={index} {...item}/></div>
		})
    return (
      <div className={"order-container"}>
				<div className="order-header">List of Orders</div>
				<div className={"order-list-container"}>
				{displayData}
				</div>
      </div>
    )
  }
}
