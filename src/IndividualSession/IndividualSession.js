import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Helmet from 'react-helmet';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, VerticalBarSeriesCanvas, DiscreteColorLegend } from 'react-vis';
import './IndividualSession.css';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css'

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

let dataGraphLeftHam = [];
let dataGraphRightHam = [];
let dataGraphLeftQuad = [];
let dataGraphRightQuad = [];

function setData(dataToMap){
  let arrayToMap = dataToMap;
  arrayToMap.map(function(value, index){
    if(value[1][1] == '1'){
      dataGraphLeftHam.push({x: 0, y: value[5][1]})
      dataGraphLeftHam.push({x: 1, y: value[4][1]})
      dataGraphLeftHam.push({x: 2, y: value[3][1]})
    }
    if(value[1][1] == '2'){
      dataGraphRightHam.push({x: 0, y: value[5][1]})
      dataGraphRightHam.push({x: 1, y: value[4][1]})
      dataGraphRightHam.push({x: 2, y: value[3][1]})
    }
    if(value[1][1] == '3'){
      dataGraphLeftQuad.push({x: 0, y: value[5][1]})
      dataGraphLeftQuad.push({x: 1, y: value[4][1]})
      dataGraphLeftQuad.push({x: 2, y: value[3][1]})
    }
    if(value[1][1] == '4'){
      dataGraphRightQuad.push({x: 0, y: value[5][1]})
      dataGraphRightQuad.push({x: 1, y: value[4][1]})
      dataGraphRightQuad.push({x: 2, y: value[3][1]})
    }
  })
  console.log(dataGraphRightQuad);
}



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
        setData(this.state.sensors);
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
                <Carousel plugins={['infinite', 'arrows',{
                        resolve: slidesToShowPlugin,
                        options: {
                            numberOfSlides: 2
                        }
                        },
                                ]}>
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
                                      data={dataGraphLeftHam}
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
                                      data={dataGraphRightHam}
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
                                      data={dataGraphLeftQuad}
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
                                      data={dataGraphRightQuad}
                          />
                      </XYPlot>
                    </Carousel>
                </div>
            </div>
        )
    }
}
