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
import LiveHeatmap from "../LiveHeatmap/LiveHeatmap.js";
import Sketch from "react-p5";
import testImg from "../Images/human_body.jpg";
import sessionData from "../Squat_Data/SensorTest-full.json";
let settings = (props) => {
    return(
      <Settings></Settings>
    )
}  
let heatmap = (props) => {
    return(
      <LiveHeatmap></LiveHeatmap>
    )
}  

  
export default class ViewClientPage extends Component{
  constructor(props){
    super(props);
  }

    settings = (props) => {
        return(
          <Settings></Settings>
        )
      }
      heatmap = (props) => {
        return(
          <LiveHeatmap></LiveHeatmap>
        )
      }
    render() {

        return (
            <Router>
                <div className = "mypage-wrapper">
                    <div className = "mypage-header">
                        <Helmet>

                            <title>Userpage</title>
                        </Helmet>
                        <Link to ="/userpage"> My Home </Link>  
                        <Link to ="/settings"> Settings </Link>    
                        <Link to ="/heatmap"> Heatmap </Link>
                    </div>
                    <div className ="mypage-body">
                        <Route path = "/settings" component={Settings} />
                        <Route path = "/heatmap" component={LiveHeatmap} />
                    </div>
                </div>
              <SessionList></SessionList>
          </Router>
        )
    }
}
