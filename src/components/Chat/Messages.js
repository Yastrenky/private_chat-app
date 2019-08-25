import format from '../../methods/format';
import React from "react";


class Mesages extends React.Component {

  render() {
    let styleColor = {
      backgroundColor: 'blue',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      borderColor: 'white'
    };

    let containerDirect = {}

    if (this.props.message.author.includes(this.props.state.userName)) {
      containerDirect.flexDirection = 'row-reverse'
    }

    switch (this.props.message.message_type) {
      case "reset":
        styleColor.backgroundColor = 'red'
        break;
      case "Yastrenky":
        styleColor.backgroundColor = 'blue'
        break;

      case "Ivelin":
        styleColor.backgroundColor = 'pink'
        break;

      default:
        styleColor.backgroundColor = 'white'
    }

    return (
      <div className="message-container" style={containerDirect}>
        <div className="mycard-message" key={this.props.state.messages.indexOf(this.props.message)}>
          <div className="mytime-container" >
            <span><div style={styleColor}></div></span>
            <span>{this.props.message.author} at {format.date(new Date(this.props.message.time)).time}</span>
          </div>
          <div className="mytext-container">{this.props.message.message}</div>
        </div>
      </div>
    )
  }
}


export default Mesages;