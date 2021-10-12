import React, { Component } from 'react'
import IndividualSession from '../IndividualSession/IndividualSession.js';
import { redirectUser } from '../SessionHandling/auth.js';
import './SessionList.css';
import {  ListGroup } from "react-bootstrap";

import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

let session = (props) => {
  return(
    <IndividualSession></IndividualSession>
  )
}


export default class SessionList extends Component{
  constructor(props){
      super(props);
      this.state = {
            sessions: []
        };
        session = (props) => {
          return(
            <IndividualSession></IndividualSession>
          )
        }
        
        if(localStorage.getItem('email') !== null && localStorage.getItem('email') !== undefined){
          if(localStorage.getItem('user_role') !== '0'){
              redirectUser();
          }
      }
      if(localStorage.getItem('email') == null || localStorage.getItem('email') == undefined){
          redirectUser();
      }
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
          <div className = "sessionlist-wrapper p-5">
              <h1>Your Sessions</h1>
              <ListGroup className="mt-5">
                <ListGroup.Item action href="/user/session">
                  {JSON.stringify(this.state.sessions[0])}
                </ListGroup.Item>
                <ListGroup.Item action href="/user/session">
                  {JSON.stringify(this.state.sessions[0])}
                </ListGroup.Item>
              </ListGroup>
          </div>
          
          
      )
  }
}
