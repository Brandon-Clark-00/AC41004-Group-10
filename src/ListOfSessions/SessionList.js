import React, { Component } from 'react'
import './SessionList.css';
import {  ListGroup } from "react-bootstrap";

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
        headers: { 'Content-Type': 'text/html' },
        body: JSON.stringify({ userID: String(localStorage.getItem('userID'))})
    };
    fetch('http://localhost:5000/sessions', requestOptions)
            // JSON response is handled by a json() promises
    .then((res) => { return res.json().
      then((data) => {
        //turn the object recieved into a big array
        var arrayofSessions = []
        data.forEach((sesh) => {
          var objectArray = Object.entries(sesh);
          arrayofSessions.push(objectArray);
        });
        this.setState({sessions: arrayofSessions});
      });
    });
  }

  render() {
      return (
          <div className = "sessionlist-wrapper p-5">
              <h1>Your Sessions</h1>
                <ListGroup className="mt-5">
                    {this.state.sessions.map(function(value, index){
                        return <ListGroup.Item action href="#link1" key={ index }>{value[0][1]}</ListGroup.Item>;
                      })}
                </ListGroup>
          </div>
      )
  }
}
