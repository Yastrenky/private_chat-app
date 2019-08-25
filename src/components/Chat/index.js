import React from "react";
import { Button } from 'reactstrap';
import Message from './Messages';
import ScrollView, { ScrollElement } from "./scroller";
import '../App/App.css';

const Emojis = (props) => {
  return (
    <div>
      {props.emojis.map((emoji, index) => <span style={{ cursor: 'pointer' }} key={index} onClick={() => props.addEmoji(index)}>{emoji}</span>)}
    </div>
  )
}

class Chat extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: props.state.userName,
      userType: props.state.userType,
      message: '',
      messages: [],
      onlineUsers: [],
      //   emojis: ['💘', '✌', '😘', '😚', '😅', '😁', '😭'],
      emojis: ["✌", "😂", "😝", "😁", "😱", "👉", "🙌", "🍻", "🔥", "🌈", "☀", "🎈", "🌹", "💄", "🎀", "⚽", "🎾", "🏁", "😡", "👿", "🐻", "🐶", "🐬", "🐟", "🍀", "👀", "🚗", "🍎", "💝", "💙", "👌", "❤", "😍", "😉", "😓", "😳", "💪", "💩", "🍸", "🔑", "💖", "🌟", "🎉", "🌺", "🎶", "👠", "🏈", "⚾", "🏆", "👽", "💀", "🐵", "🐮", "🐩", "🐎", "💣", "👃", "👂", "🍓", "💘", "💜", "👊", "💋", "😘", "😜", "😵", "🙏", "👋", "🚽", "💃", "💎", "🚀", "🌙", "🎁", "⛄", "🌊", "⛵", "🏀", "🎱", "💰", "👶", "👸", "🐰", "🐷", "🐍", "🐫", "🔫", "👄", "🚲", "🍉", "💛", "💚"]

    }

    this.ResetChat = this.ResetChat.bind(this);
    this.ResetApp = this.ResetApp.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.props.state.socket.on('chat message', function (data) {
      loadMessages(data);
    });

    this.props.state.socket.on('broadcast', function (data) {
      loadUsersOnLine(data)

    });

    const loadUsersOnLine = data => {
      this.setState({ onlineUsers: data });
    }

    const loadMessages = data => {
      this.setState({ messages: data });
      this._scroller.scrollTo(this.state.messages[this.state.messages.length - 1]);
    }
  }

  addEmoji = (index) => {
    this.setState({ message: `${this.state.message} ${this.state.emojis[index]} ` })
  }

  sendMessage(ev) {
    ev.preventDefault();
    if (this.state.message.length) {
      this.props.state.socket.emit('chat message', {
        time: new Date(),
        author: this.state.userName,
        message: this.state.message,
        message_type: this.state.userName
      })
      this.setState({ message: '' });
    }
  }
  ResetChat() {
    this.props.state.socket.emit('chat message', {
      time: new Date(),
      author: this.state.userName,
      message: "Chat has been reset by the administrator...",
      message_type: "reset"
    })
  }

  ResetApp() {

    this.props.state.socket.disconnect()

    this.props.setUpAPP({
      allow: false,
      userName: "",
      userType: "",
      socket: ""
    })
  }
  componentDidMount() {

  }
  render() {

    // console.log('Chat state', this.state);

    return (
      <div className="mycontainer">
        <div className="myrow">
          <div className="mycol-4">
            <div className="mycard">
              <div className="mycard-body">
                <div className="mycardheader">
                  <div>
                    <div className="mycard-title">Private Chat</div>
                    <div className="myuser-info">Welcome: {this.state.userName} ({this.state.userType})</div>
                    <div className="myuser-info">Users Online: {this.state.onlineUsers}</div>
                  </div>
                  <div className="control">
                    {this.state.userType === "Administrator" ?
                      < div className="myreset-button">
                        <Button onClick={this.ResetChat} size="sm" outline color="success">Reset Chat</Button>
                      </div> : null}
                    < div className="mylogout-button">
                      <Button onClick={this.ResetApp} size="sm" outline color="danger">Logout</Button>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="mymessages">
                  <ScrollView ref={scroller => this._scroller = scroller}>
                    <div className="scroller">
                      {this.state.messages.map(message => {
                        return (
                          <ScrollElement name={message} key={this.state.messages.indexOf(message)}>
                            <Message message={message} state={this.state} key={this.state.messages.indexOf(message)} />
                          </ScrollElement>
                        )
                      })
                      }
                    </div>
                  </ScrollView>
                </div>

              </div>
              <div className="mycard-footer">
                <div style={{ width: '96%' }}>
                  <Emojis emojis={this.state.emojis} addEmoji={this.addEmoji} />
                  <input
                    type="text"
                    placeholder="Message"
                    className="mymessage_input"
                    value={this.state.message}
                    onKeyPress={(ev) => ev.key === 'Enter' ? this.sendMessage(ev) : null}
                    onChange={ev => this.setState({ message: ev.target.value })}
                    required
                  />
                </div>

                <br />
                <div className = "button-container">
                <button onClick={this.sendMessage} className="mybtn btn-primary form-control">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat;