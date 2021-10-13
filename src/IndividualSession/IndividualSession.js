import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';
import './IndividualSession.css';

export default class IndividualSession extends Component{
  constructor(props){
      super(props);
      this.state = {
            sensors: [],
            session: []
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

    fetch('http://localhost:5000/session', requestOptions)
            // JSON response is handled by a json() promises
    .then((res) => { return res.json().
      then((data) => {
        //turn the object recieved into a big array
        var session = []
        data.forEach((sesh) => {
          var objectArray = Object.entries(sesh);
          session.push(objectArray);
        });
        this.setState({session: session});
      });
    });
  }


    render() {
        console.log(this.state.sensors[0])
        let string = String(this.state.session[0]);
        var sessionDate = string.slice(13, 35)
        return (
            <div className = "indivsession-wrapper">
                <Helmet>
                    <title>Theo Health - Session</title>
                </Helmet>
                <div className ="session-header">
                    <NavLink to ="/user/home" className="sessionlink" exact>
                        <li>Back to Sessions</li>
                    </NavLink>
                </div>
                <div className="p-5">
                  <h1>{sessionDate}</h1>
                  <p> Add graph here </p>
                  <ul className="mt-5">
                      {this.state.sensors.map(function(value, index){
                          return <li key={ index }>Sensor: {value[1][1]}, Max Strength: {value[4][1]}, Min Strength: {value[5][1]}, Average: {value[3][1]}

                          </li>;
                        })}
                  </ul>
                </div>
            </div>
        )
    }
}
