import React, { useState, withRouter, useEffect, Component } from "react";
import Axios from 'axios'
import Cookies from 'js-cookie'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Landing from "./LandingPage/Login.js";
import IndividualSession from "./IndividualSession/IndividualSession.js";
import ListOfSessions from "./ListOfSessions/SessionList.js";
import Settings from "./Settings/Settings.js";
import LiveHeatmap from "./LiveHeatmap/LiveHeatmap.js";
import ViewClientPage from "./ViewClientPage/ViewClientPage.js";
import ViewListOfClients from "./ViewListOfClients/ViewClientsList.js";

import 'font-awesome/css/font-awesome.min.css';
import theohealthlogo from './Images/theohealthlogo.png';
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

{/*
  const[getMessage, setGetMessage] = useState({})
  useEffect(()=>{
    Axios.get('https://theobackend.herokuapp.com/users').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log("Something is wrong", error)
    })
  }, [])
*/}
  const [user, setUser] = useState({user: userStateStart, id: idStateStart, position: positionStateStart})
  console.log(user);

    let LandingWrapper = (props) => {
      return(
        <Landing> history={props.history} user={user} userCallback={(a) => setUser(a)}</Landing>
      )
    }

    let ViewClientPageWrapper = (props) => {
      return(
        <ViewClientPage></ViewClientPage>
      )
    }

    let Settings = (props) => {
      return(
        <Settings></Settings>
      )
    }

    let ViewListOfClientsWrapper = (props) => {
      return(
        <ViewListOfClients></ViewListOfClients>
      )
    }

    let LiveHeatmapWrapper = (props) => {
      return(
        <LiveHeatmap></LiveHeatmap>
      )
    }

  return (
    <Router>
      
      <div className='page-container'>
        {/*
        <div> {getMessage.status === 200 ?
            <h3>{getMessage.data.message}</h3> :
            <h3>Loading</h3>}
        </div> */}
          <header id="site-header" className="site-header">
            <img className="theohealthlogo" src={theohealthlogo} />
            </header>
          <div className="main">
            <Route exact path="/" component={LandingWrapper}/>
            <Route exact path="/clientlist" component={ViewListOfClientsWrapper}/>
            <Route exact path="/userpage" component={ViewClientPageWrapper}/>
            <Route exact path="/liveheatmap" component={LiveHeatmapWrapper}/>


            </div>
            <footer className="site-footer">
              <div className="social-media">
                <a href="https://twitter.com/theoHealth"><i class="fa fa-twitter" aria-hidden="true"></i></a> 
                <a href="https://www.instagram.com/theo_health/"><i class="fa fa-instagram" aria-hidden="true"></i></a> 
                <a href="https://www.linkedin.com/company/theo-health"><i class="fa fa-linkedin" aria-hidden="true"></i></a> 
                <a href="mailto:jodie@theohealth.com"><i class="fa fa-envelope" aria-hidden="true"></i></a> 
              </div>

            </footer>
      </div>
    </Router>

  );
}

export default App;
