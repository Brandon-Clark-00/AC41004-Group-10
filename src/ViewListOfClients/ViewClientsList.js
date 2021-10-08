import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import Helmet from 'react-helmet';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { deleteTokens, redirectUser } from '../SessionHandling/auth.js';
import Settings from "../Settings/Settings.js";
import './ViewClientsList.css';
import { Container, Row, ListGroup, Button } from "react-bootstrap";

let settings = (props) => {
    return(
      <Settings></Settings>
    )
    }  
export default class ViewClientList extends Component{
  constructor(props){
    super(props);
      this.state = {
            clients: []
        };
          settings = (props) => {
            return( 
              <Settings></Settings>
            )
          }
            if(localStorage.getItem('email') !== null & localStorage.getItem('email') !== undefined){
            if(localStorage.getItem('user_role') !== '1'){
            redirectUser();
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
        <Router>
          <div className = "clientlist-wrapper p-5">
            <Helmet>
              <title>Physio Home</title>
            </Helmet>
             <Link to ="/clientlist">My Home</Link>  
             <Link to ="/settings">Settings</Link>    
             <Button onClick={() => { deleteTokens();
             window.location.replace("/") }}>
             Sign out
             </Button>
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
        </Router>
      )
  }
}
