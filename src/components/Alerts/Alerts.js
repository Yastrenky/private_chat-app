import React from 'react';
import { Alert } from 'reactstrap';

class AlertExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      text: props.text || "Error"
    };

    this.onDismiss = this.onDismiss.bind(this);

  }

  onDismiss() {
    this.setState({ 
      visible: false,
      text:""
     });
     this.props.alertDismiss()
    }
 
render() {
 
// console.log("alert state", this.state)
    return (
      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
        {this.state.text}
      </Alert>
    );
  }
}

export default AlertExample;