import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Landing from "./LandingPage/Login.js";
import ClientPage from './ViewListOfClients/ClientPage.js';
import ViewClientPage from "./ViewClientPage/ViewClientPage.js";
import ViewListOfClients from "./ViewListOfClients/ViewClientsList.js";
import 'font-awesome/css/font-awesome.min.css';
import theohealthlogo from './Images/whiteLogo.png';
import IndividualSession from "./IndividualSession/IndividualSession.js";
import './App.css';
// import './App-Propanopia.css';

import styled, { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import { GlobalStyles } from './theme/GlobalStyles';
import {useTheme} from './theme/useTheme';
import ThemeSelector from './ThemeSelector';

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

  const {theme, themeLoaded, getFonts} = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

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

    let ViewListOfClientsWrapper = (props) => {
      return(
        <ViewListOfClients></ViewListOfClients>
      )
    }


  return (
    <Router>
      <>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
      integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
      crossorigin="anonymous"
      />
        { 
          themeLoaded && <ThemeProvider theme={ selectedTheme }>
                  <GlobalStyles/>

            <div className='page-container'>
                <header id="site-header" className="site-header">
                  <img className="theohealthlogo" src={theohealthlogo} alt="Brand Logo"/>
                  </header>
                <div className="main">
                  <Switch>
                    <Route exact path="/" component={LandingWrapper}/>
                    <Route exact path="/physio/clientlist" component={ViewListOfClientsWrapper}/>
                    <Route exact path="/user/home" component={ViewClientPageWrapper}/>
                    <Route path ="/user/session" component={IndividualSession} />
                    <Route path = "/physio/client" component={ClientPage} />
                    <Redirect to ="/"></Redirect>
                  </Switch>

                      <footer className="site-footer">
                      <ThemeSelector setter={ setSelectedTheme } />                  

                        <div className="social-media">
                          <a href="https://twitter.com/theoHealth"><i class="fa fa-twitter" title = "Theo Health Twitter"></i></a>
                          <a href="https://www.instagram.com/theo_health/"><i class="fa fa-instagram" title = "Theo Health Instagram"></i></a>
                          <a href="https://www.linkedin.com/company/theo-health"><i class="fa fa-linkedin" title = "Theo Health LinkedIn"></i></a>
                          <a href="mailto:jodie@theohealth.com"><i class="fa fa-envelope" title = "Theo Health Email"></i></a>
                        </div>

                      </footer>
                </div>
              </div>
            </ThemeProvider>
          }
        </>
      </Router>
      
  );
}

export default App;
