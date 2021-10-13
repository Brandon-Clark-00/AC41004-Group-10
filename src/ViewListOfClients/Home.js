import React, { Component } from 'react'
import Helmet from 'react-helmet';
import { Route } from 'react-router';
import './ViewClientsList.css';
import { ListGroup } from "react-bootstrap";
import { redirectUser } from '../SessionHandling/auth.js';

function updateLocalhost(clientID){
  return function () {
   localStorage.setItem("clientID", clientID)
 }
}

export default class ViewClientPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            clients: []
        };
        if(localStorage.getItem('email') !== null && localStorage.getItem('email') !== undefined){
            if(localStorage.getItem('user_role') !== '1'){
                redirectUser();
            }
        }
        if(localStorage.getItem('email') == null || localStorage.getItem('email') == undefined){
            redirectUser();
        }


    }
    // comonentDidMount part of React lifecycle - runs automatically
    componentDidMount() {
      //POSTING request with userID
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'text/html' },
          body: JSON.stringify({ userID: String(localStorage.getItem('userID'))})
      };
      fetch('https://theobackend.herokuapp.com/clients', requestOptions)
              // JSON response is handled by a json() promises
      .then((res) => { return res.json().
        then((data) => {
          //turn the object recieved into a big array
          var arrayofClients = []
          data.forEach((sesh) => {
            var objectArray = Object.entries(sesh);
            arrayofClients.push(objectArray);
          });
          this.setState({clients: arrayofClients});
        });
      });
    }


    render(){
        return(
            <div>
                  <Helmet>
                    <title>Theo Health - Home</title>
                  </Helmet>
                  <div className = "clientlist-wrapper-home p-5">
                    <h1>Your Clients</h1>
                    <ListGroup className="mt-5">
                        {this.state.clients.map(function(value, index){
                            return <ListGroup.Item action key={ index } onClick={updateLocalhost(value[10][1])}><a style={{color: 'black', textDecoration: 'none'}}href="/physio/client">{value[6][1]}</a></ListGroup.Item>;
                          })}
                    </ListGroup>
                </div>

            </div>


        )
    }
}
