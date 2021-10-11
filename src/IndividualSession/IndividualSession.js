import React, { Component } from 'react'
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
        body: JSON.stringify({ userID: String(localStorage.getItem('userID'))})
    };
    fetch('https://theobackend.herokuapp.com/sensors', requestOptions)
            // JSON response is handled by a json() promises
    .then((res) => { return res.json().
      then((data) => {
        //turn the object recieved into a big array
        var arrayofSessions = []
        data.forEach((sesh) => {
          var objectArray = Object.entries(sesh);
          arrayofSessions.push(objectArray);
        });
        this.setState({sensors: arrayofSessions});
      });
    });
  }


    render() {
        console.log(this.state.sensors)
        return (
            <div className = "indivsession-wrapper m-5">
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
