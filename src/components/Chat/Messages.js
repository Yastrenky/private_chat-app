import format from '../../methods/format';
import React from "react";


class Mesages extends React.Component{



render(){
let styleColor ={};
  switch(this.props.message.message_type){
    case "reset" :
    styleColor = {color:'red'}
    break;
    case "Yastrenky" :
    styleColor = {color:'blue'}
    break;

    case "Ivelin" :
    styleColor = {color:'pink'}
    break;

    default:
    styleColor = {color:'white'}
  }

  return (
  <div className="mycard-message" key={this.props.state.messages.indexOf(this.props.message)}>
  <div className="mytime-container" >{this.props.message.author} at {format.date(new Date(this.props.message.time)).time}</div>
  <div className="mytext-container" style={styleColor}>{this.props.message.message}</div>
</div>
  )
}
}


export default  Mesages;