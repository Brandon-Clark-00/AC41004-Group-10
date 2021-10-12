import React, { Component } from 'react'
import Helmet from 'react-helmet';
import {
    BrowserRouter as Router,
    Route,
    NavLink
  } from "react-router-dom";
import { deleteTokens, redirectUser } from '../SessionHandling/auth.js';
import Settings from "../Settings/Settings.js";
import Home from './Home.js'

import './ViewClientsList.css';

let settings = (props) => {
    return(
      <Settings></Settings>
    )
    }
let home = (props) => {
      return(
        <Home></Home>
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
          let home = (props) => {
            return(
              <Home></Home>
            )
          }
            if(localStorage.getItem('email') !== null && localStorage.getItem('email') !== undefined){
                if(localStorage.getItem('user_role') !== '1'){
                    redirectUser();
                }
            }
            if(localStorage.getItem('email') == null || localStorage.getItem('email') == undefined){
                redirectUser();
            }
        }

  render() {
      return (
        <Router>
          <div className = "clientlist-wrapper">
            <Helmet>
              <title>Physio Home</title>
            </Helmet>
            <div className ="physio-header">
              <NavLink to ="/physio/clientlist" activeClassName="current" exact>
                <li>My Home</li>
              </NavLink>
              <NavLink to ="/physio/settings" activeClassName="current" exact>
                <li>Settings</li>
              </NavLink>
              <NavLink to = "/" onClick={() => {  deleteTokens(); window.location.replace("/")}} exact>
                <li>Sign out</li>
              </NavLink>
              </div>
              <div className ="physio-body">
                <Route path = "/physio/clientlist" component={Home} />
                <Route path = "/physio/settings" component={Settings} />
              </div>
          </div>
        </Router>
      )
  }
}
