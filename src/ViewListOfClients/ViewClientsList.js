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

let settings = (props) => {
    return(
      <Settings></Settings>
    )
    }  
export default class ViewClientList extends Component{
    constructor(props){
        super(props);
        settings = (props) => {
            return( 
              <Settings></Settings>
            )
          }
          if(localStorage.getItem('email') !== null & localStorage.getItem('email') !== undefined){
            if(localStorage.getItem('user_role') !== '1'){
            redirectUser();
            }
        }
        }  
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