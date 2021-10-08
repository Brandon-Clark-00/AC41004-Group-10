import React, { Component } from 'react'
import './ViewClientsList.css';
import { Container, Row, ListGroup, Button } from "react-bootstrap";

export default class ViewClientList extends Component{
  constructor(props){
      super(props);
      this.state = {
            clients: []
        };
  }
  // comonentDidMount part of React lifecycle - runs automatically
  componentDidMount() {
    //POSTING request with userID
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID: String(localStorage.getItem('userID'))})
    };
    fetch('https://theobackend.herokuapp.com/clients', requestOptions)
            // JSON response is handled by a json() promises
    .then((res) => { return res.json().
    then((data) => {
        this.setState({clients: data});
    });
    });
  }

  render() {
      return (
          <div className = "clientlist-wrapper p-5">
              <h1>Your Clients</h1>
                <ListGroup className="mt-5">
                  <ListGroup.Item action href="#link1">
                  {JSON.stringify(this.state.clients[0])}
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link2">
                  {JSON.stringify(this.state.clients[0])}
                  </ListGroup.Item>
                </ListGroup>
          </div>
      )
  }
}
