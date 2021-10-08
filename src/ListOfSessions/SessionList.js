import React, { Component } from 'react'
import './SessionList.css';
import { Container, Row, ListGroup, Button } from "react-bootstrap";

export default class SessionList extends Component{
  constructor(props){
      super(props);
      this.state = {
            sessions: []
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
    fetch('https://theobackend.herokuapp.com/sessions', requestOptions)
            // JSON response is handled by a json() promises
    .then((res) => { return res.json().
    then((data) => {
        this.setState({sessions: data});
    });
    });
  }

  render() {
      return (
          <div className = "sessionlist-wrapper" >
              <h1>List of Sessions</h1>
              <p> {JSON.stringify(this.state.sessions)} </p>
              <ListGroup defaultActiveKey="#link1">
                <ListGroup.Item action href="#link1">
                  Link 1
                </ListGroup.Item>
                <ListGroup.Item action href="#link2" disabled>
                  Link 2
                </ListGroup.Item>
                <ListGroup.Item action>
                  This one is a button
                </ListGroup.Item>
              </ListGroup>

              <Button variant="primary">Button #1</Button>
          </div>
      )
  }
}
