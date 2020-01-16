import React from "react";
import ReactDOM from "react-dom";
import ReactTooltip  from './ReactTooltip';
import './style.css';

class HelloMessage extends React.Component {
  constructor(){
    super();
   // this.renderContent = this.renderContent.bind(this);
  }
  // renderContent(){
  //   //const item = "<div class='test'><div className='test1'>123</div></div>";
  //   return "<div class='test'><div className='test1'>123</div></div>";
  // }
  
  render() {
   // console.log(this.renderContent());
    return (
      <div>
        <div style={{position: 'absolute', left: '400px', top: '400px', padding: '20px', backgroundColor: 'red'}} tooltip="<div><div class='test1'>123</div></div>" tooltip-place="top" tooltip-class="tooltip-html">向上</div>
        <div style={{position: 'absolute', left: '300px', top: '300px', padding: '20px', backgroundColor: 'red'}} tooltip="<div class='test'><div class='test1'>123</div></div>" tooltip-place="right">向右</div>
        <div style={{position: 'absolute', left: '200px', top: '200px', padding: '20px', backgroundColor: 'red'}} tooltip="<div class='test'><div class='test1'>123</div></div>" tooltip-place="bottom">向下</div>
        <div style={{position: 'absolute', left: '100px', top: '100px', padding: '20px', backgroundColor: 'red'}} tooltip="<div class='test'><div class='test1'>123</div></div>" tooltip-place="left">向左</div>
        <div style={{position: 'absolute', left: '500px', top: '500px', padding: '20px', backgroundColor: 'red'}} tooltip="<div class='test'><div class='test1'>123</div></div>" tooltip-place="left">
          <div>123</div>
          <div>456</div>
        </div>
        <div style={{position: 'absolute', left: '600px', top: '600px', padding: '20px', backgroundColor: 'red'}} tooltip="第六个组件 局部定义样式" tooltip-place="top" tooltip-class="scoped-style-top">向上</div>
        <ReactTooltip customClass="custom-tooltip"></ReactTooltip>
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<HelloMessage name="Jane" />, mountNode);
