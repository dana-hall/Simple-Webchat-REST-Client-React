import "./Message.css";
import React from "react";

const Messages = ({ msgs }) => {
  var messages = msgs.length ? (
    msgs.map(msg => {
      return (
        <tr key={msg._id ? msg._id : msg.id}>
          <td className="colFrom">{msg.from}</td>
          <td className="colTo">{msg.to}</td>
          <td className="colDate">{msg.date}</td>
          <td>{msg.message}</td>
        </tr>
      );
    })
  ) : (
      <tr><td className="noMessages">You have no messages</td></tr>
    );
  return (
    <div id="messagesContainer">
      <div className="messagesTitle">
        <hr />
        <div className="container">
          <h3>Messages</h3>
        </div>
      </div>
      <table id="messagesTable" className="messagesTable">
        <tbody>
          {/* Suppress if no messages */}
          {msgs.length > 0 ? (
            <tr>
              <th className="colFrom">From</th>
              <th className="colTo">To</th>
              <th className="colDate">Date</th>
              <th>Message</th>
            </tr>
          ) : null}
          {messages}
        </tbody>
      </table>
    </div>
  );
};

export default Messages;
