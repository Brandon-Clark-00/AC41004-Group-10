import React, { Component } from 'react'
import Helmet from 'react-helmet';
import './ViewClientsList.css';
import { ListGroup } from "react-bootstrap";
import { redirectUser } from '../SessionHandling/auth.js';


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
          var arrayofSessions = []
          data.forEach((sesh) => {
            var objectArray = Object.entries(sesh);
            arrayofSessions.push(objectArray);
          });
          console.log(arrayofSessions)
          this.setState({clients: arrayofSessions});
        });
      });

    }


    render(){
        return(
            <div>
                  <Helmet>
                    <title>My Home</title>
                  </Helmet>
                  <div className = "clientlist-wrapper-home p-5">
                    <h1>Your Clients</h1>
                    <ListGroup className="mt-5">
                        {this.state.clients.map(function(value, index){
                            return <ListGroup.Item action href="#link1" key={ index }>{value[6][1]}</ListGroup.Item>;
                          })}
                    </ListGroup>
                </div>
            </div>

        )
    }
}
