import React, { Component } from 'react'
import './SessionList.css';

export default class SessionList extends Component{
  constructor(props){
      super(props);
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
        console.log(data)
    });
    });
  }

  render() {
      return (
          <div className = "sessionlist-wrapper" >
              <h1>List of Sessions</h1>
          </div>
      )
  }
}
