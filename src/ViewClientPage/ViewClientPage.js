import React, { Component } from 'react'
import Helmet from 'react-helmet';
import { deleteTokens, redirectUser } from '../SessionHandling/auth.js';

import {
    BrowserRouter as Router,
    Route,
    NavLink
  } from "react-router-dom";

import './ViewClientPage.css';
import Settings from "../Settings/Settings.js";
import LiveHeatmap from "../LiveHeatmap/LiveHeatmap.js";
import Home from './Home.js'

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
 let home = (props) => {
  return(
    <Home></Home>
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
      heatmap = (props) => {
        return(
          <LiveHeatmap></LiveHeatmap>
        )
      }
      home = (props) => {
        return(
          <Home></Home>
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

    const onClick = () =>{
      deleteTokens(); 
      window.location.replace("/")
    }
  }
    render() {

        return (
            <Router>
                <div className = "mypage-wrapper">
                  <Helmet>
                    <title>Userpage</title>
                  </Helmet>
                  <div className = "mypage-header">
                    <NavLink to ="/user/home" activeClassName="current" exact>
                      <li>My Home</li>
                    </NavLink>  
                    <NavLink to ="/user/heatmap" activeClassName="current" exact>
                      <li>Heatmap</li>
                    </NavLink>
                    <NavLink to ="/user/settings" activeClassName="current" exact>
                      <li>Settings</li>
                    </NavLink>    
                    <NavLink to = "/" onClick={() => {  deleteTokens(); window.location.replace("/")}} exact>
                      <li>Sign out</li>
                    </NavLink>
                  </div>
                  <div className ="mypage-body">
                    <Route path = "/user/home" component={Home} />
                    <Route path = "/user/settings" component={Settings} />
                    <Route path = "/user/heatmap" component={LiveHeatmap} />
                  </div>
                </div>

          </Router>
        )
    }
}
