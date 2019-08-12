import axios from "axios";
import React, { Component } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

// 
// Servers and ports
//    Node Server (Default):8090
//    .NET Core Server:5000
//    Java Server (Tomcat):8080
//    Mono/Nancy Server:8070
//
class Home extends Component {
  state = {
    port: 8090,
    message: {
      messages: []
    }
  };

  timer = 0;

  // Get all specific user messages sent or received
  getAllUserMessages = name => {
    this.setState({
      message: {
        messages: []
      }
    });
    if (name && name !== "") {
      axios.get("http://localhost:" + this.state.port + "/webchat/read/all/" + name).then(res => {
        this.setState({
          message: res.data
        });
      });
    } else {
      clearInterval(this.timer);
    }
  };

  pollMessages = name => {
    clearInterval(this.timer);
    if (name && name !== "") {
      this.timer = setInterval(() => {
        this.getAllUserMessages(name);
      }, 10000);
    }
  };

  // Send new message
  sendMessage = msg => {
    axios.post("http://localhost:" + this.state.port + "/webchat/create", msg).then(res => {
      this.pollMessages(msg.from);
    });
  };

  // Delete all messages from a user and to a user
  deleteUserMessages = msg => {
    axios.post("http://localhost:" + this.state.port + "/webchat/delete", msg).then(res => {
      this.getAllUserMessages(msg.from);
    });
  };

  getServer = port => {
    this.setState({ port: port });
  }

  render() {
    return (
      <div className="container">
        <MessageInput getAllUserMessages={this.getAllUserMessages} sendMessage={this.sendMessage}
          deleteUserMessages={this.deleteUserMessages} getServer={this.getServer} />
        <Messages msgs={this.state.message.messages} />
      </div>
    );
  }
}

export default Home;
