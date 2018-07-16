import React from "react";
import Chat from "../Chat";
import Login from "../login";

import './App.css';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      allow: false,
      userName: "",
      userType: "",
      socket:{}
    };

    this.setUpAPP = this.setUpAPP.bind(this);
  }

setUpAPP(set){
    this.setState({     
       allow: set.allow,
       userName: set.userName,
       userType: set.userType,
       socket: set.socket
      }
    )
  }

  render() {

// console.log('App state', this.state);
    return (


      this.state.allow ? <Chat state={this.state} setUpAPP={this.setUpAPP}/>
 :
        <Login state={this.state} setUpAPP={this.setUpAPP} />

    );
  }
}

export default App;