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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionID: "1"}) //get ID from localhost here
    };
    fetch('http://localhost:5000/sensors', requestOptions)
            // JSON response is handled by a json() promises
    .then((res) => { return res.json().
    then((data) => {
        this.setState({sensors: data});
    });
    });
  }

    render() {
        console.log(this.state.sensors)
        return (
            <div className = "indivsession-wrapper m-5">
                <h1>Session</h1>
                <p style={{fontSize:"0.5em"}}> {JSON.stringify(this.state.sensors[0])} </p>
            </div>
        )
    }
}
