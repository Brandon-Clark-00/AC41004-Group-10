import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Helmet from 'react-helmet';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, VerticalBarSeriesCanvas, DiscreteColorLegend, LabelSeries } from 'react-vis';
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
let MaxBarXY = 0;

function setData(dataToMap){
  let currentNumValue = 0;
  let arrayToMap = dataToMap;
  arrayToMap.map(function(value, index){
    if(value[1][1] == '1'){
      dataGraphLeftHam.push({x: 'Min', y: value[5][1]})
      dataGraphLeftHam.push({x: 'Max', y: value[4][1]})
      dataGraphLeftHam.push({x: 'Average', y: value[3][1]})
    }
    if(value[1][1] == '2'){
      dataGraphRightHam.push({x: 'Min', y: value[5][1]})
      dataGraphRightHam.push({x: 'Max', y: value[4][1]})
      dataGraphRightHam.push({x: 'Average', y: value[3][1]})
    }
    if(value[1][1] == '3'){
      dataGraphLeftQuad.push({x: 'Min', y: value[5][1]})
      dataGraphLeftQuad.push({x: 'Max', y: value[4][1]})
      dataGraphLeftQuad.push({x: 'Average', y: value[3][1]})
    }
    if(value[1][1] == '4'){
      dataGraphRightQuad.push({x: 'Min', y: value[5][1]})
      dataGraphRightQuad.push({x: 'Max', y: value[4][1]})
      dataGraphRightQuad.push({x: 'Average', y: value[3][1]})
    }
    currentNumValue = value[4][1]
    if(currentNumValue > MaxBarXY){
      MaxBarXY = currentNumValue;
    }
  });MaxBarXY = MaxBarXY+100;

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
                  {/* <p> Add graph here </p>
                  <ul className="mt-5">
                      {this.state.sensors.map(function(value, index){
                          return <li key={ index }>Sensor: {value[1][1]}, Max Strength: {value[4][1]}, Min Strength: {value[5][1]}, Average: {value[3][1]}

                          </li>;
                        })}
                  </ul> */}
                </div>
                <div className="chart-container">
                  <div className="hamstring-container">
                      <XYPlot className="individual-session-bar-chart-leftHam"
                      xType="ordinal"
                      stackBy="y"
                      yDomain={[0, MaxBarXY]}
                      width={300}
                      height={300}>
                          <XAxis />
                          <YAxis />
                          <VerticalBarSeries 
                                      cluster="2015"
                                      color="#79C7E3"
                                      data={dataGraphLeftHam}                                      
                          />
                            <LabelSeries data={dataGraphLeftHam.map((obj)=>{return{ ...obj, label: obj.y.toString()};})}
                            labelAnchorX="middle"
                            labelAnchorY="text-after-edge"/>
                      </XYPlot>
                      Left Hamstring
                      <XYPlot className="individual-session-bar-chart-rightHam"
                      xType="ordinal"
                      stackBy="y"
                      yDomain={[0, MaxBarXY]}
                      width={300}
                      height={300}>
                          <XAxis />
                          <YAxis />
                          <VerticalBarSeries 
                                      cluster="2015"
                                      color="#79C7E3"
                                      data={dataGraphRightHam}
                          />
                            <LabelSeries data={dataGraphRightHam.map((obj)=>{return{ ...obj, label: obj.y.toString()};})}
                            labelAnchorX="middle"
                            labelAnchorY="text-after-edge"/>
                      </XYPlot>
                      Right Hamstring
                      </div>
                      <div className="quad-container">
                      <XYPlot className="individual-session-bar-chart-leftQuad"
                      xType="ordinal"
                      stackBy="y"
                      yDomain={[0, MaxBarXY]}
                      width={300}
                      height={300}>
                          <XAxis />
                          <YAxis />
                          <VerticalBarSeries 
                                      cluster="2015"
                                      color="#79C7E3"
                                      data={dataGraphLeftQuad}
                          />
                            <LabelSeries data={dataGraphLeftQuad.map((obj)=>{return{ ...obj, label: obj.y.toString()};})}
                            labelAnchorX="middle"
                            labelAnchorY="text-after-edge"/>
                      </XYPlot>
                      Left Quad
                      <XYPlot className="individual-session-bar-chart-rightQuad"
                      xType="ordinal"
                      stackBy="y"
                      yDomain={[0, MaxBarXY]}
                      width={300}
                      height={300}>
                          <XAxis />
                          <YAxis />
                          <VerticalBarSeries 
                                      cluster="2015"
                                      color="#79C7E3"
                                      data={dataGraphRightQuad}
                          />
                            <LabelSeries data={dataGraphRightQuad.map((obj)=>{return{ ...obj, label: obj.y.toString()};})}
                            labelAnchorX="middle"
                            labelAnchorY="text-after-edge"/>
                      </XYPlot>
                      Right Quad
                      </div>
                </div>
            </div>
        )
    }
}
