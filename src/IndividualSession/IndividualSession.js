import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Helmet from 'react-helmet';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, VerticalBarSeriesCanvas, DiscreteColorLegend } from 'react-vis';
import './IndividualSession.css';

function moveUser(){
  console.log("hey");
  var user_role = localStorage.getItem("user_role");
  if (user_role ==1 )
  {
    //move to client page
    window.location.replace("/physio/client")
  }else {
    //move to user home
    window.location.replace("/user/home")
  }
}


const myData = [
    {x: 'A', y: 10},
    {x: 'B', y: 5},
    {x: 'C', y: 15}
  ]

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

    fetch('https://theobackend.herokuapp.com/session', requestOptions)
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
        let string = String(this.state.session[0]);
        var sessionDate = string.slice(13, 35)
        return (
            <div className = "indivsession-wrapper">
                <Helmet>
                    <title>Theo Health - Session</title>
                </Helmet>
                <div className ="session-header">
                  <Button variant="outline-secondary" onClick={() => { moveUser() }}>Go Back</Button>
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
                <div className="chart-container">
                    <XYPlot className="individual-session-bar-chart"
                    xType="ordinal"
                    stackBy="y"
                    width={300}
                    height={300}>
                        <XAxis />
                        <YAxis />
                        <VerticalBarSeries 
                                    cluster="2015"
                                    color="#79C7E3"
                                    data={[
                                      {x: 'Q1', y: 3},
                                      {x: 'Q2', y: 7},
                                      {x: 'Q3', y: 2},
                                      {x: 'Q4', y: 1}
                                    ]}
                        />
                    </XYPlot>
                    <XYPlot className="individual-session-bar-chart"
                    xType="ordinal"
                    stackBy="y"
                    width={300}
                    height={300}>
                        <XAxis />
                        <YAxis />
                        <VerticalBarSeries 
                                    cluster="2015"
                                    color="#79C7E3"
                                    data={[
                                      {x: 'Q1', y: 3},
                                      {x: 'Q2', y: 7},
                                      {x: 'Q3', y: 2},
                                      {x: 'Q4', y: 1}
                                    ]}
                        />
                    </XYPlot>
                    <XYPlot className="individual-session-bar-chart"
                    xType="ordinal"
                    stackBy="y"
                    width={300}
                    height={300}>
                        <XAxis />
                        <YAxis />
                        <VerticalBarSeries 
                                    cluster="2015"
                                    color="#79C7E3"
                                    data={[
                                      {x: 'Q1', y: 3},
                                      {x: 'Q2', y: 7},
                                      {x: 'Q3', y: 2},
                                      {x: 'Q4', y: 1}
                                    ]}
                        />
                    </XYPlot>
                    <XYPlot className="individual-session-bar-chart"
                    xType="ordinal"
                    stackBy="y"
                    width={300}
                    height={300}>
                        <XAxis />
                        <YAxis />
                        <VerticalBarSeries 
                                    cluster="2015"
                                    color="#79C7E3"
                                    data={[
                                      {x: 'Q1', y: 3},
                                      {x: 'Q2', y: 7},
                                      {x: 'Q3', y: 2},
                                      {x: 'Q4', y: 1}
                                    ]}
                        />
                    </XYPlot>
                </div>
                <h1>Session</h1>
                <p style={{fontSize:"0.5em"}}> {JSON.stringify(this.state.sensors[0])} </p>
            </div>
        )
    }
}
