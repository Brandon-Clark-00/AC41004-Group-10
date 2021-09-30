import React, { useState, withRouter } from "react";
import Cookies from 'js-cookie'
import {
  BrowseRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Landing from "./LandingPage/Login";

import logo from './logo.svg';
import './App.css';

function App() {

  let userStateStart = ""
  let idStateStart = ""
  let positionStateStart = ""
  if (!!Cookies.get('access_token')) {
    userStateStart = Cookies.get('access_token').split("#")[0]
    idStateStart = Cookies.get('access_token').split("#")[1]
    positionStateStart = Cookies.get('access_token').split("#")[2]
  }

  const [user, setUser] = useState({user: userStateStart, id: idStateStart, position: positionStateStart})
  console.log(user);

    let LandingWrapper = (props) => {
      return( 
        <Landing> history={props.history} user={user} userCallback={(a) => setUser(a)}</Landing>
      )
    }

  return (
    <Router>
      <div className = 'page-container'>
        <header id = "site-header" className="site-header">
          
        </header>
        <div className="main">
          <Route exact path="/" component={LandingWrapper}/>

          </div>

          <footer className="site-footer">

          </footer>
      </div>
    </Router>
  );
}

export default App;
