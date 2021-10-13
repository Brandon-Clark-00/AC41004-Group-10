import React, { Component } from 'react';
import Helmet from 'react-helmet';
import './LiveHeatmap.css';
import Sketch from "react-p5";
import testImg from "../Images/human_body.jpg";
import sessionData from "../Squat_Data/SensorTest-full.json";
import { redirectUser } from '../SessionHandling/auth.js';

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
let paused = false;
let thisCanvas;
let scale = 1;
let previousSize;
let divBox;

export default class LiveHeatmap extends Component {
  constructor(props){
    super(props);

    if(localStorage.getItem('email') !== null && localStorage.getItem('email') !== undefined){
      if(localStorage.getItem('user_role') !== '0'){
          redirectUser();
      }
    }
    if(localStorage.getItem('email') == null || localStorage.getItem('email') == undefined){
      redirectUser();
    }
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
  pauseButton;


  loadData = (p5,parent) => {


    let sessionTemp = sessionData['data'];
    // console.log("THis is the data");


    for (let i = 0; i < 386; i++) {


      let currTime = sessionTemp[i].time
      let currsOne = sessionTemp[i]['Sensor 1'];
      let currsTwo = sessionTemp[i]['Sensor 2'];
      let currsThree = sessionTemp[i]['Sensor 3'];
      let currsFour = sessionTemp[i]['Sensor 4'];


      sessionInfo.push(new Session(currTime,currsOne,currsTwo,currsThree,currsFour));
    }
    // console.log(sessionInfo);
  }

  calculateValue = (p5,parent, sensor) => {
   let value = 0;

   switch (sensor) {
     case 1:
       value = sessionInfo[index].sOne;
       break;
      case 2:
        value = sessionInfo[index].sTwo;
        break;
      case 3:
        value = sessionInfo[index].sThree;
        break;
      case 4:
        value = sessionInfo[index].sFour;
        break;
     default:
       break;
   }

  if (value < 50) {

    return '#00FF00';

  }else if (value <100) {

    return '#61F200';

  } else if (value < 150){

    return "#86E400";

  }else if (value < 200){

    return "#A0D600";

  }else if (value < 250){

    return "#B6C700";

  }else if (value < 300){

    return "#C7B700";

  }else if (value < 350){

    return "#D7A700";

  }else if (value < 400){

    return "#E39500";

  }else if (value < 450){

    return "#EE8200";

  }else if (value < 500){

    return "#F66D00";

  }else if (value < 550){

    return "#FB5600";

  }else if (value < 600){

    return "#FE3900";

  }else{

    return "#FF0000";

  }
  }

  resetTime = (p5, parent) => {
    index = 0;
  }

  pause = (p5, parent, button) => {
    if (paused === false) {
      paused = true;
      // return 'play';
      this.pauseButton.html('Play');
    }
    else
    {
      paused = false;
      // return 'pause';
      this.pauseButton.html('Pause');
    }
    // console.log("Hello")

  }

  setup = (p5, parent) => {

    divBox= parent;
    // Creating canvas
    thisCanvas = p5.createCanvas(600 * scale, 510 * scale).parent(parent)
    p5.frameRate(6);

    // Loading workout data
    this.loadData();


    // Loading background
    p5.loadImage(testImg, img => {
      this.img = img;
      // imgTest = this.img;
      p5.image(img,0,0,600 * scale, 510 * scale)
    },
    (event) => {
      p5.fill("red")
      p5.text("Error: The image could not be loaded.", 20, 40);
      console.log(event);
    });


    // Slider
    this.timeSlider = p5.createSlider(0,385,0);
    this.timeSlider.input(()=> {
      index = this.timeSlider.value();
    })
    // this.timeSlider.position(200,300);

    //Button
    this.pauseButton = p5.createButton("Pause");
    this.pauseButton.mousePressed(this.pause)
  }

  draw = p5 => {
    if (p5.windowWidth < 600 && previousSize >= 600) {
      scale = 0.5
      thisCanvas.resize(600 * scale, 510 * scale)
      p5.loadImage(testImg, img => {
        this.img = img;
        // imgTest = this.img;
        p5.image(img,0,0,600 * scale, 510 * scale)
      },
      (event) => {
        p5.fill("red")
        p5.text("Error: The image could not be loaded.", 20, 40);
        console.log(event);
      });
      
    }
    else if(p5.windowWidth >600 && previousSize <= 600)
    {
      scale = 1;
      thisCanvas.resize(600 * scale, 510 * scale)
      p5.loadImage(testImg, img => {
        this.img = img;
        // imgTest = this.img;
        p5.image(img,0,0,600 * scale, 510 * scale)
      },
      (event) => {
        p5.fill("red")
        p5.text("Error: The image could not be loaded.", 20, 40);
        console.log(event);
      });
    }
    this.pauseButton.position(0 * scale, 0 * scale, "relative").parent(divBox);
    this.pauseButton.addClass("button")
    this.timeSlider.position(150 * scale, -20 * scale, "relative").parent(divBox);
    this.timeSlider.addClass("slider")
    this.timeSlider.value(index)
    if (!paused)
    {


    // Timer ellipse and text
    p5.fill(255);
    //x, y, w, [h], [tl], [tr], [br], [bl]
    p5.rect(190 * scale, 12 * scale, 190 * scale, 40 * scale, 10, 10, 10, 10);
    p5.textSize(25 * scale);
    p5.fill(p5.color(0));
    let timer = "Time: " + sessionInfo[index].timeStamp.split('T')[1].substring(0,sessionInfo[index].timeStamp.split('T')[1].length-5);
    p5.text(timer, 200 * scale, 40 * scale)

    //Legs

    // Front left
    let c = p5.color(this.calculateValue(this.p5,this.parent,1));
    p5.fill(c)
    p5.ellipse(110 * scale, this.frontY * scale, this.frontCircleW * scale, this.frontCircleH * scale);


    // Front right
    c = p5.color(this.calculateValue(this.p5,this.parent,2));
    p5.fill(c)
    p5.ellipse(175 * scale, this.frontY * scale, this.frontCircleW * scale, this.frontCircleH * scale);


    // Back left
    c = p5.color(this.calculateValue(this.p5,this.parent,3));
    p5.fill(c)
    p5.ellipse(425 * scale, this.backY * scale, this.backCircleW * scale, this.backCircleH * scale);


    // Back right
    c = p5.color(this.calculateValue(this.p5,this.parent,4));
    p5.fill(c)
    p5.ellipse(490 * scale, this.backY * scale, this.backCircleW * scale, this.backCircleH * scale);


    // Index update
    if (index === 385) {
      index = 0;
    }
    else
    {
      index = index+1;
    }
    previousSize = p5.windowWidth;
  }
};

render(){
  return(
    <div className="heatmapContainer">
      <Helmet>
        <title>Theo Health - New Session</title>
      </Helmet>
      <Sketch setup={this.setup} draw ={this.draw} />
    </div>
  )
}

}
