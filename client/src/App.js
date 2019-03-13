import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Request from './containers/Request/Request';
import Navbar from 'react-bootstrap/Navbar';
import Nav from'react-bootstrap/Nav';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Order from './containers/Order/Order';
import Driver from './containers/Driver/Driver';
import Allocation from './containers/Allocation/Allocation';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Navbar sticky="top" bg="dark" variant="dark">
          <Navbar.Brand href="/">Last Mile Delivery</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/driver">Driver Request</Nav.Link>
              <Nav.Link href="/orders">Product List</Nav.Link>
              <Nav.Link href="/drivers">Drivers List</Nav.Link>
              <Nav.Link href="/allocation">Allocation</Nav.Link>

              </Nav>
          </Navbar.Collapse>
          </Navbar>
          <Route exact path="/" component={Request} />
          <Route exact path="/driver" component={Request} />
          <Route path="/orders" component={Order} />
          <Route path="/drivers" component={Driver} />
          <Route path="/allocation" component={Allocation} />
        </div>
      </Router>
      
    );
  }
}

export default App;


