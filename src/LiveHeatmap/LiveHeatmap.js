import React, { Component, useEffect } from 'react';
import ReactDOM from "react-dom";
//import h337 from "heatmap.js"
import './LiveHeatmap.css';

export var Heatmap = function() {
    useEffect(() => {
        var heatmapInstance = h337.create({
          // only container is required, the rest will be defaults
          container: document.querySelector('.Heatmap'),
          gradient: {
            '0': 'green',
            '0.200': 'yellow',
            '0.400': 'orange',
            '0.600': 'red'
          }
        });
        // document.querySelector('.Heatmap').onmousedown = function(ev) {
        //   heatmapInstance.addData({
        //     x: ev.layerX,
        //     y: ev.layerY,
        //     value: 1
        //   });
        //   var currentData = heatmapInstance.getData();
        //   console.log(currentData);
        // };
        // now generate some random data
        var points = [];
        var max = 0;
        var width = 1220;
        var height = 720;
        var len = 200;
        
        var data = require("../LiveHeatmap/heatMapData.json")
        console.log(data)
      //   while (len--) {
      //    var val = Math.floor(Math.random()*100);
      //    max = Math.max(max, val);
      //    var point = {
      //     x: Math.floor(Math.random()*width),
      //     y: Math.floor(Math.random()*height),
      //     value: val
      //    };
      //    points.push(point);
      //  }
       // heatmap data format
     
      // if you have a set of datapoints always use setData instead of addData
      // for data initialization
      heatmapInstance.setData(data);
    })
    return (
     
        <div className="Heatmap">
          
        </div>
    
    )
}
