import React, { Component } from 'react'
import Helmet from 'react-helmet';
import { Route } from 'react-router';
import SessionList from '../ListOfSessions/SessionList.js'
import IndividualSession from '../IndividualSession/IndividualSession.js';
import {  ListGroup } from "react-bootstrap";
import '../../node_modules/react-vis/dist/style.css';
import { ChartLabel, DiscreteColorLegend, HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css'
import './ViewClientPage.css';


        //data arrays for displaying on graph 
        let dataLeftHamMin =[]
        let dataLeftHamMax =[]
        let dataLeftHamAvg =[]
        let dataRightHamMin =[]
        let dataRightHamMax =[]
        let dataRightHamAvg =[]
        let dataLeftQuadMin =[]
        let dataLeftQuadMax =[]
        let dataLeftQuadAvg =[]
        let dataRightQuadMin =[]
        let dataRightQuadMax =[]
        let dataRightQuadAvg =[]  

        let colorCodeRed="#ff0000"
        let colorCodeLightBlue="#12939A"
        let colorCodeDarkBlue="#1A3177"
        
        
    function updateLocalhost(sessionID){
        return function () {
         localStorage.setItem("sessionID", sessionID)
       }
      }

    function setData(arrayOfSenorsToPass){
        //set local variable to sensor array
        let arrayOfSensors = arrayOfSenorsToPass;
        //arrays to store sensor data for each muscle 
        let arrayOfSensorsLeftHam = [];
        let arrayOfSensorsRightHam = [];
        let arrayOfSensorsLeftQuad = [];
        let arrayOfSensorRightQuad = [];
        //arrays to store Min, Max, and AVG value for each sensor
        let arrayOfSensorLeftHamMin = [];
        let arrayOfSensorLeftHamMax = [];
        let arrayOfSensorLeftHamAvg = [];
        
        let arrayOfSensorRightHamMin = [];
        let arrayOfSensorRightHamMax = [];
        let arrayOfSensorRightHamAvg = [];

        let arrayOfSensorLeftQuadMin = [];
        let arrayOfSensorLeftQuadMax = [];
        let arrayOfSensorLeftQuadAvg = [];

        let arrayOfSensorRightQuadMin = [];
        let arrayOfSensorRightQuadMax = [];
        let arrayOfSensorRightQuadAvg = [];

        arrayOfSensors.map(function(value, index){
            if(value[1][1] == '1'){
                arrayOfSensorsLeftHam.push(arrayOfSensors[index])
            }
            if(value[1][1] == '2'){
                arrayOfSensorsRightHam.push(arrayOfSensors[index])
            }
            if(value[1][1] == '3'){
                arrayOfSensorsLeftQuad.push(arrayOfSensors[index])
            }
            if(value[1][1] == '4'){
                arrayOfSensorRightQuad.push(arrayOfSensors[index])
            }
            
        })

        arrayOfSensorsLeftHam.map(function(value, index){
            arrayOfSensorLeftHamMin.push(value[5][1])
            arrayOfSensorLeftHamMax.push(value[4][1])
            arrayOfSensorLeftHamAvg.push(value[3][1])

        })

        arrayOfSensorsRightHam.map(function(value, index){
            arrayOfSensorRightHamMin.push(value[5][1])
            arrayOfSensorRightHamMax.push(value[4][1])
            arrayOfSensorRightHamAvg.push(value[3][1])
        })
        
        arrayOfSensorsLeftQuad.map(function(value, index){
            arrayOfSensorLeftQuadMin.push(value[5][1])
            arrayOfSensorLeftQuadMax.push(value[4][1])
            arrayOfSensorLeftQuadAvg.push(value[3][1])
        })

        arrayOfSensorRightQuad.map(function(value, index){
            arrayOfSensorRightQuadMin.push(value[5][1])
            arrayOfSensorRightQuadAvg.push(value[4][1])
            arrayOfSensorRightQuadMax.push(value[3][1])
        })
        //charting left ham data 
        arrayOfSensorLeftHamMin.map(function(value, index){
            dataLeftHamMin.push({x: index, y: value })
        })
        arrayOfSensorLeftHamMax.map(function(value, index){
            dataLeftHamMax.push({x: index, y: value })
        })
        arrayOfSensorLeftHamAvg.map(function(value, index){
            dataLeftHamAvg.push({x: index, y: value })
        })
        //charting right ham data 
        arrayOfSensorRightHamMin.map(function(value, index){
            dataRightHamMin.push({x: index, y: value })
        })
        arrayOfSensorRightHamMax.map(function(value, index){
            dataRightHamMax.push({x: index, y: value })
        })
        arrayOfSensorRightHamAvg.map(function(value, index){
            dataRightHamAvg.push({x: index, y: value })
        })        
        
        //charting left quad data 
        arrayOfSensorLeftQuadMin.map(function(value, index){
            dataLeftQuadMin.push({x: index, y: value })
        })
        arrayOfSensorLeftQuadMax.map(function(value, index){
            dataLeftQuadMax.push({x: index, y: value })
        })
        arrayOfSensorLeftQuadAvg.map(function(value, index){
            dataLeftQuadAvg.push({x: index, y: value })
        })       

        //charting right quad data 
        arrayOfSensorRightQuadMin.map(function(value, index){
            dataRightQuadMin.push({x: index, y: value })
        })
        arrayOfSensorRightQuadMax.map(function(value, index){
            dataRightQuadMax.push({x: index, y: value })
        })
        arrayOfSensorRightQuadAvg.map(function(value, index){
            dataRightQuadAvg.push({x: index, y: value })
        })              
    }
    
    
export default class ViewClientPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            sessions: [],
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
                console.log(this.state.sessions);
                });
                });

            fetch('https://theobackend.herokuapp.com/allSensors', requestOptions)
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
                console.log(this.state.sensors);
                setData(this.state.sensors);
                });
                });

                

        }



    render(){
        return(
            <div className="home-sessions-wrapper">
                <Helmet>
                    <title>My Home</title>
                </Helmet>
                <div className="comparative-graphs">
                    <Carousel plugins={['infinite', 'arrows',{
                        resolve: slidesToShowPlugin,
                        options: {
                            numberOfSlides: 2
                        }
                        },
                                ]}>
                        <XYPlot height={400} width={600}> 
                        <DiscreteColorLegend
                        style={{position: 'absolute', left: '50px', top: '10px'}}
                        orientation="horizontal"
                        items={[{
                            title: 'Max Strength',
                            color: '#ff0000'
                        },
                        {
                            title: 'Min Strength',
                            color: '#12939A'
                        },
                        {
                            title: 'Average Strength',
                            color: '#1A3177'
                        },
                        ]}
                        />
                            <VerticalGridLines/>
                            <HorizontalGridLines/>
                            <XAxis/>
                            <YAxis/>
                            <ChartLabel
                                text="Left Hamstring          Time "
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
                        <LineSeries data={dataLeftHamMin} curve={'curveMonotoneX'} color={colorCodeLightBlue}/>
                        <LineSeries data={dataLeftHamMax} curve={'curveMonotoneX'} color={colorCodeRed}/>
                        <LineSeries data={dataLeftHamAvg} curve={'curveMonotoneX'} color={colorCodeDarkBlue}/>
                        </XYPlot>
                        <XYPlot height={400} width={600}> 
                        <DiscreteColorLegend
                        style={{position: 'absolute', left: '50px', top: '10px'}}
                        orientation="horizontal"
                        items={[{
                            title: 'Max Strength',
                            color: '#ff0000'
                        },
                        {
                            title: 'Min Strength',
                            color: '#12939A'
                        },
                        {
                            title: 'Average Strength',
                            color: '#1A3177'
                        },
                        ]}
                        />                        
                            <VerticalGridLines/>
                            <HorizontalGridLines/>
                            <XAxis/>
                            <YAxis/>
                            <ChartLabel
                                text="Right Hamstring          Time "
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
                            <LineSeries data={dataRightHamMin} curve={'curveMonotoneX'} color={colorCodeLightBlue}/>
                            <LineSeries data={dataRightHamMax} curve={'curveMonotoneX'} color={colorCodeRed}/>
                            <LineSeries data={dataRightHamAvg} curve={'curveMonotoneX'} color={colorCodeDarkBlue}/>
                        </XYPlot>
                        <XYPlot height={400} width={600}>
                        <DiscreteColorLegend
                        style={{position: 'absolute', left: '50px', top: '10px'}}
                        orientation="horizontal"
                        items={[{
                            title: 'Max Strength',
                            color: '#ff0000'
                        },
                        {
                            title: 'Min Strength',
                            color: '#12939A'
                        },
                        {
                            title: 'Average Strength',
                            color: '#1A3177'
                        },
                        ]}
                        />                             
                            <VerticalGridLines/>
                            <HorizontalGridLines/>
                            <XAxis/>
                            <YAxis/>
                            <ChartLabel
                                text="Left Quad          Time "
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
                            <LineSeries data={dataLeftQuadMin} curve={'curveMonotoneX'} color={colorCodeLightBlue}/>
                            <LineSeries data={dataLeftQuadMax} curve={'curveMonotoneX'} color={colorCodeRed}/>
                            <LineSeries data={dataLeftQuadAvg} curve={'curveMonotoneX'} color={colorCodeDarkBlue}/>
                        </XYPlot>
                        <XYPlot height={400} width={600}> 
                        <DiscreteColorLegend
                        style={{position: 'absolute', left: '50px', top: '10px'}}
                        orientation="horizontal"
                        items={[{
                            title: 'Max Strength',
                            color: '#ff0000'
                        },
                        {
                            title: 'Min Strength',
                            color: '#12939A'
                        },
                        {
                            title: 'Average Strength',
                            color: '#1A3177'
                        },
                        ]}
                        />                        
                            <VerticalGridLines/>
                            <HorizontalGridLines/>
                            <XAxis/>
                            <YAxis/>
                            <ChartLabel
                                text="Right Quad          Time "
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
                            <LineSeries data={dataRightQuadMin} curve={'curveMonotoneX'} color={colorCodeLightBlue}/>
                            <LineSeries data={dataRightQuadMax} curve={'curveMonotoneX'} color={colorCodeRed}/>
                            <LineSeries data={dataRightQuadAvg} curve={'curveMonotoneX'} color={colorCodeDarkBlue}/>
                        </XYPlot>
                        
                    </Carousel>
                  </div>
                <div className = "sessionlist-wrapper p-5">
              <h1>Your Sessions</h1>
              <ListGroup className="mt-5">
                  {this.state.sessions.map(function(value, index){
                      return <ListGroup.Item action key={ index } onClick={updateLocalhost(value[2][1])}><a style={{color: 'black', textDecoration: 'none'}}href="/user/session">{value[0][1]}</a></ListGroup.Item>;
                    })}
              </ListGroup>
                </div>
            </div>

        )
    } 
}