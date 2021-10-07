import React, { Component } from 'react'
import './SessionList.css';

export default class SessionList extends Component{
  constructor(props){
      super(props);
      this.state = {
            sessions: []
        };
  }
  // comonentDidMount part of React lifecycle - runs automatically
  componentDidMount() {
    //POSTING request with userID
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID: String(localStorage.getItem('userID'))})
    };
    fetch('http://localhost:5000/sessions', requestOptions)
            // JSON response is handled by a json() promises
    .then((res) => { return res.json().
    then((data) => {
        this.setState({sessions: data});
    });
    });
  }

  render() {
      return (
          <div className = "sessionlist-wrapper" >
              <h1>List of Sessions</h1>
              <p> {JSON.stringify(this.state.sessions)} </p>
          </div>
      )
  }
}
