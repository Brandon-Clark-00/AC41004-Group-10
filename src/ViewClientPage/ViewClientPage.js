import { remove } from 'js-cookie';
import React, { Component } from 'react'
import Helmet from 'react-helmet';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import './ViewClientPage.css';
import Settings from "../Settings/Settings.js";

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

                    </div>
                    <div className ="mypage-body">
                        <Route path = "/settings" component={settings} />
                    </div>
                </div>
            </Router>
        )
    }
}
