import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import Helmet from 'react-helmet';
import SessionList from '../ListOfSessions/SessionList.js'
import { deleteTokens, redirectUser } from '../SessionHandling/auth.js';

import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";

import './ViewClientPage.css';
import Settings from "../Settings/Settings.js";
import { Heatmap } from "../LiveHeatmap/LiveHeatmap.js";

let settings = (props) => {
    return(
      <Settings></Settings>
    )
    }  


export default class ViewClientPage extends Component{
  constructor(props){
    super(props);

    settings = (props) => {
        return(
          <Settings></Settings>
        )
        }
        if(localStorage.getItem('email') !== null & localStorage.getItem('email') !== undefined){
          if(localStorage.getItem('user_role') !== '0'){
          redirectUser();
          }
      }
    

      // if(localStorage.getItem('email') !==null && localStorage.getItem('email') !=="undefined"){
      //   if(localStorage.getItem('user_role') == 1){
      //       window.location.replace("/clientlist")
      //   }
      // }
      // else if(localStorage.getItem('email') == null || localStorage.getItem('email') == "undefined"){
      //   window.location.replace("/")
      // }
    }
    render() {
      return (
        
          <Router>
              <div className = "mypage-wrapper">
                  <div className = "mypage-header">
                      <Helmet>
                          <title>Userpage</title>
                      </Helmet>
                      <Link to ="/userpage">My Home</Link>  
                      <Link to ="/settings">Settings</Link>    
                      <Link to ="/LiveHeatmap">LiveHeatmap</Link>
                      <Button onClick={() => { deleteTokens();
                        window.location.replace("/") }}>
                        Sign out
                      </Button>
                  </div>
                <div className ="mypage-body">
                  <Route path = "/settings" component={settings} />
                  <div className = "heatmapContainer">
                  <Heatmap/>
                  </div>
                </div>
              </div>
              <SessionList></SessionList>
          </Router>
        )
    }
}
