import React, { Component, useEffect } from 'react';
import ReactDOM from "react-dom";
import h337 from "heatmap.js"
import './LiveHeatmap.css';
import Sketch from "react-p5";
import testImg from "../Images/human_body.jpg";
import sessionData from "../Squat_Data/SensorTest-full.json";

class Session {
  constructor(timeStamp,sOne,sTwo,sThree,sFour){
    this.timeStamp = timeStamp;
    this.sOne = sOne;
    this.sTwo = sTwo;
    this.sThree = sThree;
    this.sFour = sFour;
  }
}

// let data = {};
let sessionInfo = [];
let index = 0;


export default class LiveHeatmap extends Component {
  constructor(props){
    super(props);
  }

  frontX = 50;
  frontY = 290;
  backX = 50;
  backY = 310;

  frontCircleW = 35;
  frontCircleH = 70;
  backCircleW = 35;
  backCircleH = 60;

  timeSlider;
  resetButton;

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

  resetTime = (p5, parent) => {
    index = 0;
  }
  getAverage = (p5,parent, field) => {
    let average;
    let total=0;
    for (let index = 0; index < sessionInfo.length; index++) {
      total += sessionInfo[index].field;
    }
    console.log(total);
    
  }

  saveSession = (p5, parent) => {
    let tempUserID = "temp";
    let sessionDate = sessionInfo[0].timeStamp.split('T')[0];
    let sensor1Av = this.getAverage(this.p5,this.parent,'sOne')
    console.log(sensor1Av);

  }

  setup = (p5, parent) => {
    
   
    p5.createCanvas(600, 510).parent(parent)
    p5.frameRate(6);
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



    // this.timeSlider = p5.createSlider(0,386,0);
    // this.timeSlider.position(200,300);

    // this.resetButton = p5.createButton("Reset");
    // this.resetButton.mousePressed(this.saveSession);
    
    // this.timeSlider.input(index = this.timeSlider.value());

  }

  draw = p5 => {


    // this.timeSlider.position(20,300);
    // this.timeSlider.value(index)
    // this.resetButton.position(1500,200);


    p5.fill(255);
    p5.rect(180,20,225,30);

    p5.textSize(15);
    p5.fill(p5.color(0));
    let timer = "Time: " + sessionInfo[index].timeStamp;
    p5.text(timer, 180,40)

    // console.log(index);
    // Front left
    let c = p5.color(this.calculateValue(this.p5,this.parent,1));
    p5.fill(c)
    p5.ellipse(110, this.frontY, this.frontCircleW, this.frontCircleH);

    // Front right
    c = p5.color(this.calculateValue(this.p5,this.parent,2));
    p5.fill(c)
    p5.ellipse(175, this.frontY, this.frontCircleW, this.frontCircleH);


    // Back left
    c = p5.color(this.calculateValue(this.p5,this.parent,3));
    p5.fill(c)
    p5.ellipse(425, this.backY, this.backCircleW, this.backCircleH);

    // Back right
    c = p5.color(this.calculateValue(this.p5,this.parent,4));
    p5.fill(c)
    p5.ellipse(490, this.backY, this.backCircleW, this.backCircleH);
    if (index === 385) {
      index = 0;
    }else{
      index = index+1;
    }
    
};

render(){
  return(
    <div className="heatmapContainer">
      <Sketch setup={this.setup} draw ={this.draw} />
    </div>
  )
}

}
