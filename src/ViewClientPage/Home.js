import React, { Component } from 'react'
import Helmet from 'react-helmet';
import { Route } from 'react-router';
import IndividualSession from '../IndividualSession/IndividualSession.js';
import {  ListGroup } from "react-bootstrap";
import '../../node_modules/react-vis/dist/style.css';
import { ChartLabel, HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css'
import './ViewClientPage.css';


const data =[
    {x: 0, y: 0},
    {x: 0.3, y:1},
    {x: 1, y: 3},
    {x: 2, y: 10}]

const data2 =[
    {x: 0, y: 1},
    {x: 0.3, y:2},
    {x: 1, y: 7},
    {x: 2, y: 6}]

const data3 =[
    {x: 0, y: 3},
    {x: 0.3, y:4},
    {x: 1, y: 5},
    {x: 2, y: 6}]


    function updateLocalhost(sessionID){
        return function () {
         localStorage.setItem("sessionID", sessionID)
       }
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
                });
                });
        }


    render(){

        return(
            <div className="home-sessions-wrapper">
                <Helmet>
                    <title>Theo Health - Home</title>
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
                        <LineSeries data={data2} curve={'curveMonotoneX'}/>
                        <LineSeries data={data3} curve={'curveMonotoneX'}/>
                        </XYPlot>
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
                            <LineSeries data={data2} curve={'curveMonotoneX'}/>
                            <LineSeries data={data3} curve={'curveMonotoneX'}/>
                        </XYPlot>
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
                            <LineSeries data={data2} curve={'curveMonotoneX'}/>
                            <LineSeries data={data3} curve={'curveMonotoneX'}/>
                        </XYPlot>
                    </Carousel>
                  </div>
                <div className = "sessionlist-wrapper p-5">
              <h1>Your Sessions</h1>
              <ListGroup className="mt-5">
                  {this.state.sessions.map(function(value, index){
                      return <ListGroup.Item action key={ index } onClick={updateLocalhost(value[2][1])}><a style={{color: 'black', textDecoration: 'none'}}href="/user/session">{String(value[0][1]).slice(5, 22)}</a></ListGroup.Item>;
                    })}
              </ListGroup>
                </div>
            </div>

        )
    }
}
