import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';
import './IndividualSession.css';

export default class IndividualSession extends Component{
  constructor(props){
      super(props);
      this.state = {
            sensors: []
        };
  }
  // comonentDidMount part of React lifecycle - runs automatically
  componentDidMount() {
    //POSTING request with userID
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'text/html' },
        body: JSON.stringify({ sessionID: String(localStorage.getItem('sessionID'))})
    };
    fetch('https://theobackend.herokuapp.com/sensors', requestOptions)
            // JSON response is handled by a json() promises
    .then((res) => { return res.json().
      then((data) => {
        //turn the object recieved into a big array
        var arrayofSensors = []
        data.forEach((sesh) => {
          var objectArray = Object.entries(sesh);
          arrayofSensors.push(objectArray);
        });
        this.setState({sensors: arrayofSensors});
      });
    });
  }


    render() {
        return (
            <div className = "indivsession-wrapper m-5">
                <Helmet>
                    <title>Theo Health - Session</title>
                </Helmet>
                <div className ="session-header">
                    <NavLink to ="/user/home" className="sessionlink" exact>
                        <li>Back to Sessions</li>
                    </NavLink>
                </div>
                <h1>Session</h1>
                <ul className="mt-5">
                    {this.state.sensors.map(function(value, index){
                        return <li key={ index }>{value[0]}

                        </li>;
                      })}
                </ul>
            </div>
        )
    }
}
