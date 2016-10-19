import React from "react";
import ReactDOM from "react-dom";
class App extends React.Component {
  componentDidMount() {
    let canvas = this.refs.clock;
    let radius = canvas.height / 2;
    let circle = canvas.getContext("2d");
    circle.translate(radius, radius);
    radius = radius * 0.90;
    setInterval(this.drawCircle.bind(this,circle,radius),1000);
  }
  drawCircle(circle, radius) {
    this.drawFace(circle, radius);
    this.drawNumbers(circle,radius);
    this.drawTime(circle,radius);
  }
  drawFace(circle, radius) {
    let grad;
    circle.beginPath();
    circle.arc(0, 0, radius * 0.95, 0, 2 * Math.PI);
    circle.fillStyle = "#ffffff";
    circle.fill();
    grad = circle.createRadialGradient(0, 0, radius * 0.9, 0, 0, radius * 1.05);
    grad.addColorStop(0, "#333");
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, "#333");
    circle.strokeStyle = grad;
    circle.lineWidth = radius * 0.1;
    circle.stroke();

    circle.beginPath();
    circle.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    circle.fillStyle = '#333';
    circle.fill();
  }
  drawNumbers(circle,radius){
    let ang,num;
    circle.font = radius*0.15 + "px arial";
    circle.textBaseline = "middle";
    circle.textAlign = "center";
    for(num = 1; num < 13; num ++){
      ang = num*Math.PI/6;
      circle.rotate(ang);
      circle.translate(0,-radius*0.8);
      circle.rotate(-ang);
      circle.fillText(num.toString(),0,0);
      circle.rotate(ang);
      circle.translate(0,radius*0.8);
      circle.rotate(-ang);
    }
  }
  drawTime(circle,radius){
    let time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    //hour
    hour = hour % 12;//alert(hour);
    hour = (hour*Math.PI/6) + (minute*Math.PI/(6*60)) + (second*Math.PI/(60*360));
    this.drawHand(circle,hour,radius*0.4,radius*0.07);
    //minute
    minute = (minute*Math.PI/(30)) + (second*Math.PI/(60*30));
    this.drawHand(circle,minute,radius*0.7,radius*0.07);
    //second
    second = (second*Math.PI/(30));
    this.drawHand(circle,second,radius*0.8,radius*0.02);
  }
  drawHand(circle,pos,length,width){
    circle.beginPath();
    circle.lineWidth = width;
    circle.lineCap = "round";
    circle.moveTo(0,0);
    circle.rotate(pos);
    circle.lineTo(0,-length);
    circle.stroke();
    circle.rotate(-pos);
  }
  render() {
    return <canvas  width="400" height="400"  className="clock" ref="clock"></canvas>
  }
}
export default App
