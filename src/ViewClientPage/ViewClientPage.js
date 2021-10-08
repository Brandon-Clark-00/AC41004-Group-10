import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import Helmet from 'react-helmet';
import SessionList from '../ListOfSessions/SessionList.js'
import { deleteTokens, redirectUser } from '../SessionHandling/auth.js';

import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";

import './ViewClientPage.css';
import Settings from "../Settings/Settings.js";
import { Heatmap } from "../LiveHeatmap/LiveHeatmap.js";
import Sketch from "react-p5";
import testImg from "../Images/human_body.jpg";
import sessionData from "../Squat_Data/SensorTest-full.json";
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
let index = 0;

export default class ViewClientPage extends Component{
  constructor(props){
    super(props);

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
    
    

    loadData = (p5,parent) => {
    
      
      let sessionTemp = sessionData['data'];
      console.log("THis is the data");
      // console.log(sessionTemp);

      for (let i = 0; i < 386; i++) {
        
        
        let currTime = sessionTemp[i].time
        let currsOne = sessionTemp[i]['Sensor 1'];
        let currsTwo = sessionTemp[i]['Sensor 2'];
        let currsThree = sessionTemp[i]['Sensor 3'];
        let currsFour = sessionTemp[i]['Sensor 4'];
        

        sessionInfo.push(new Session(currTime,currsOne,currsTwo,currsThree,currsFour));
      }
      console.log(sessionInfo);
    }

    calculateValue = (p5,parent, sensor) => {
     let value = 0;

     switch (sensor) {
       case 1:
         value = sessionInfo[index].sOne;
        //  console.log("uno");
         break;
        case 2:
          value = sessionInfo[index].sTwo;
          // console.log("dos");
          break;
        case 3:
          value = sessionInfo[index].sThree;
          // console.log("tres");
          break;
        case 4:
          value = sessionInfo[index].sFour;
          // console.log("quattro");
          break;
       default:
         break;
     }
    
     if (value < 100) {

      return 'Green';

    }
    else if (value <200) {

      return 'Yellow';

    } else if (value < 400){

      return "Orange";
    }
    else{

      return "Red";

    }
    }



    setup = (p5, parent) => {
      
     
      p5.createCanvas(600, 510).parent(parent)
      p5.frameRate(2);
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
      console.log(index);
      // Front left
      let c = p5.color(this.calculateValue(this.p5,this.parent,1));
      p5.fill(c)
      p5.ellipse(110, this.frontY, this.frontCircleW, this.frontCircleH)

      // Front right
      c = this.calculateValue(this.p5,this.parent,2);
      p5.fill(c)
      p5.ellipse(175, this.frontY, this.frontCircleW, this.frontCircleH)


      // Back left
      c = this.calculateValue(this.p5,this.parent,3);
      p5.fill(c)
      p5.ellipse(425, this.backY, this.backCircleW, this.backCircleH)

      // Back right
      c = this.calculateValue(this.p5,this.parent,4);
      p5.fill(c)
      p5.ellipse(490, this.backY, this.backCircleW, this.backCircleH)
      index = index+1;
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
              </div>
              <SessionList></SessionList>
          </Router>
        )
    }
}
