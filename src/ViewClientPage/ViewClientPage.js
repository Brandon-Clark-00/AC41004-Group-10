import { remove } from 'js-cookie';
import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { deleteTokens } from '../SessionHandling/auth.js';
import Helmet from 'react-helmet';
import {
    BrowserRouter as Router,
    Switch,
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
    super(props);}
    settings = (props) => {
        return( 
          <Settings></Settings>
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
                        <Link to ="/userpage">My Home</Link>  
                        <Link to ="/settings">Settings</Link>    
                        <Link to ="/LiveHeatmap">Settings</Link>
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
            </Router>
        )
    }
}