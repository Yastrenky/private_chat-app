import React from "react";
import io from "socket.io-client";
import './login.css';
import { Button } from 'reactstrap';
import { Alert } from 'reactstrap';
import LoginAlert from '../Alerts/Alerts';
import config from '../../config';

var passwordHash = require('password-hash');

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Yastrenky",
      pass: "zxcvbnm99",
      errorLog: false,
      errorText:""
    }

    this.ValidateUser = this.ValidateUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.alertDismiss = this.alertDismiss.bind(this);
  }

  alertDismiss() {
    this.setState({
      errorLog: false
    })
  }

  handleChange(event) {

    this.setState({
      [event.target.name]: event.target.value,
      errorLog: false
    });
  }

  ValidateUser(ev) {
    ev.preventDefault();

    fetch(config+'/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        pass: passwordHash.generate(this.state.pass)
      })
    }, this.context).then(response => response.json())
      .then(response => {
        // console.log('Request success: ', response);
        if (response.success) {

          // initialize the socket connection
          this.socket = io(config);

          this.props.setUpAPP({
            allow: true,
            userName: this.state.name,
            userType: response.type,
            socket: this.socket
          })
        }

        else {
          this.setState({
            errorLog: true,
            errorText:"User or Password Incorrect"
          })

        }

      })
      .catch(function (error) {
        console.log('Request failure: ', error);
alert(error)
      })


  }

  render() {

    // console.log("loguin state", config)

    return (
      <div className="loginMainContainer">

        {this.state.errorLog ?
          <div className="error-alert">

            <LoginAlert
              text={this.state.errorText}
              visible={this.state.errorLog}
              alertDismiss={this.alertDismiss}
            />
          </div> : null
        }

        <div className="general-info">
          <Alert color="warning">
            This is a private chat.
            For more information contact to this <a href="mailto:ybramos91@gmail.com">email</a>.
          </Alert>
        </div>
        <div className="marcontainer">
          <div className="form-container">

            User:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />

            Password:
            <input
              type="password"
              name="pass"
              value={this.state.pass}
              onChange={this.handleChange}
              required
            />

            <Button
              className="login_sub"
              color="primary"
              onClick={this.ValidateUser}
            >Submit
            </Button>

          </div>
        </div>
      </div>
    )
  }
}

export default Login;