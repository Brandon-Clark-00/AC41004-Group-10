import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Helmet from 'react-helmet';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, VerticalBarSeriesCanvas, DiscreteColorLegend } from 'react-vis';
import './IndividualSession.css';

const myData = [
    {x: 'A', y: 10},
    {x: 'B', y: 5},
    {x: 'C', y: 15}
  ]

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
        body: JSON.stringify({ sessionID: 1}) //get ID from localhost here
    };
    fetch('https://theobackend.herokuapp.com/sensors', requestOptions)
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
                <Helmet>
                    <title>Session</title>
                </Helmet>
                <div className ="session-header">
                    <NavLink to ="/user/home" className="sessionlink" exact>
                        <li>Back to Sessions</li>
                    </NavLink>    
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
