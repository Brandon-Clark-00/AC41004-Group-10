import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import Helmet from 'react-helmet';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { deleteTokens } from '../SessionHandling/auth.js';
import Settings from "../Settings/Settings.js";
import './ViewClientsList.css';

let settings = (props) => {
    return( 
      <Settings></Settings>
    )
  }

export default class ViewClientList extends Component{
    constructor(props){
        super(props);}
    render() {
        return (
            <Router>
                <div className = "clientlist-wrapper">
                    <Helmet>
                        <title>Physio Home</title>
                    </Helmet>
                    <Link to ="/clientlist">My Home</Link>  
                    <Link to ="/settings">Settings</Link>    
                    <Button onClick={() => { deleteTokens();
                        window.location.replace("/") }}>
                        Sign out
                    </Button>
                </div>
            </Router>
        )
    }
}