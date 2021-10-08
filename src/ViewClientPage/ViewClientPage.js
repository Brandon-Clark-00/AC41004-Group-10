import { remove } from 'js-cookie';
import React, { Component } from 'react'
import Helmet from 'react-helmet';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
import './ViewClientPage.css';
import Settings from "../Settings/Settings.js";
import { Heatmap } from "../LiveHeatmap/LiveHeatmap.js";
import Sketch from "react-p5";
import testImg from "../Images/human_body.jpg";
import sessionData from "../Squat Data/SensorTest-full.json";
let settings = (props) => {
    return( 
      <Settings></Settings>
    )
  }

  class Session {
    constructor(timeStamp,sOne,sTwo,sThree,sFour){
      this.timeStamp = timeStamp;
      this.sOne = sOne;
      this.sTwo = sTwo;
      this.sThree = sThree;
      this.sFour = sFour;
    }
  }
  
  let data = {};
  let sessionInfo = [];


export default class ViewClientPage extends Component{
  constructor(props){
    super(props);}
    settings = (props) => {
        return( 
          <Settings></Settings>
        )
      }

    frontX = 50;
    frontY = 290;

    backX = 50;
    backY = 310;

    frontCircleW = 35;
    frontCircleH = 70;
    backCircleW = 35;
    backCircleH = 60;
    
    index = 0



     preload = (p5, parent) => {
      this.data = p5.loadJSON(sessionData);
    }

    loadData = (p5,parent) => {
    
      data = p5.loadJSON(sessionData);
      let sessionTemp = data['data'];
      console.log(data);

      for (let i = 0; i < 387; i++) {
        
        let sessionIndex = sessionTemp[i];
        let currTime = sessionIndex['time'];
        let currsOne = sessionIndex['Sensor one'];
        let currsTwo = sessionIndex['Sensor two'];
        let currsThree = sessionIndex['Sensor three'];
        let currsFour = sessionIndex['Sensor four']

        sessionInfo.push(new Session(currTime,currsOne,currsTwo,currsThree,currsFour));
      }
    }

    calculateValue = (p5,parent) => {
      return 1;
    }



    setup = (p5, parent) => {
      
     
      p5.createCanvas(600, 510).parent(parent)
      p5.frameRate(1);
      this.loadData();
    
      
      // p5.background(p5.loadImage("../Images/legs3-0.png"))
      p5.loadImage(testImg, img => {
        this.img = img;
        // imgTest = this.img;
        p5.image(img,0,0,600,510)
      },
      (event) => {
        p5.fill("red")
        p5.text("Error: The image could not be loaded.", 20, 40);
        console.log(event);
      });

      
    }

    draw = p5 => {
      
      let colorChart = [p5.color(255,0,0), p5.color(255,170,0), p5.color(255,255,0),p5.color(0,255,0)];
      
      // Front left
      let c = colorChart[this.calculateValue()]
      p5.fill(c)
      p5.ellipse(110, this.frontY, this.frontCircleW, this.frontCircleH)

      // Front right
      c = colorChart[Math.floor(Math.random(4)*4)]
      p5.fill(c)
      p5.ellipse(175, this.frontY, this.frontCircleW, this.frontCircleH)


      // Back left
      c = colorChart[Math.floor(Math.random(4)*4)]
      p5.fill(c)
      p5.ellipse(425, this.backY, this.backCircleW, this.backCircleH)

      // Back right
      c = colorChart[Math.floor(Math.random(4)*4)]
      p5.fill(c)
      p5.ellipse(490, this.backY, this.backCircleW, this.backCircleH)
    
  }
      

    render() {

        return (
            <Router>
                <div className = "mypage-wrapper">
                    <div className = "mypage-header">
                        <Helmet>

                            <title>Userpage</title>
                        </Helmet>
                        <Link to ="/userpage">My Home</Link>  
                        <Link to ="/settings">Settings</Link>    
                        <Link to ="/LiveHeatmap">Settings</Link>
                    </div>
                    <div className ="mypage-body">
                      
                        <Route path = "/settings" component={settings} />
                        {/* /* <div className = "heatmapContainer">*/ }
                        {/* /* /*<Heatmap/> */}
                        {/* /* /*</div> */}
                        <div className="heatmapContainer">                          
                          <Sketch setup={this.setup} draw ={this.draw} />
                        </div>

                    </div>
                </div>
            </Router>
        )
    }
}