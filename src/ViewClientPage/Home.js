import React, { Component } from 'react'
import Helmet from 'react-helmet';
import { Route } from 'react-router';
import SessionList from '../ListOfSessions/SessionList.js'
import IndividualSession from '../IndividualSession/IndividualSession.js';
import {  ListGroup } from "react-bootstrap";
import '../../node_modules/react-vis/dist/style.css';
import { ChartLabel, HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';
import './ViewClientPage.css';


const data =[
    {x: 0, y: 0},
    {x: 0.3, y:1},
    {x: 1, y: 3},
    {x: 2, y: 10}]

export default class ViewClientPage extends Component{
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
              headers: { 'Content-Type': 'text/html' },
              body: JSON.stringify({ userID: String(localStorage.getItem('userID'))})
          };
          fetch('https://theobackend.herokuapp.com/sessions', requestOptions)
                  // JSON response is handled by a json() promises
          .then((res) => { return res.json().
            then((data) => {
              //turn the object recieved into a big array
              var arrayofSessions = []
              data.forEach((sesh) => {
                var objectArray = Object.entries(sesh);
                arrayofSessions.push(objectArray);
              });
              this.setState({sessions: arrayofSessions});
            });
          });
        }

    render(){
        return(
            <div className="home-sessions-wrapper">
                <Helmet>
                    <title>My Home</title>
                </Helmet>
                <XYPlot height={400} width={600}>
                    <VerticalGridLines/>
                    <HorizontalGridLines/>
                    <XAxis/>
                    <YAxis/>
                    <ChartLabel
                        text="Time"
                        className="alt-x-label"
                        includeMargin={false}
                        xPercent={0.45}
                        yPercent={1.01}
                    />
                    <ChartLabel
                        text="Strength"
                        className="alt-y-label"
                        includeMargin={false}
                        xPercent={0.04}
                        yPercent={0.45}
                        style={{
                            transform: 'rotate(-90)',
                            textAnchor: 'end'
                        }}
                    />
                    <LineSeries data={data} curve={'curveMonotoneX'}/>
                  </XYPlot>
                <div className = "sessionlist-wrapper p-5">
              <h1>Your Sessions</h1>
              <ListGroup className="mt-5">
                  {this.state.sessions.map(function(value, index){
                      return <ListGroup.Item action href="#link1" key={ index }>{value[0][1]}</ListGroup.Item>;
                    })}
              </ListGroup>
          </div>
                <div className="session-wrapper">
                    <Route path ="/user/session" component={IndividualSession} />
                </div>
            </div>

        )
    }
}
