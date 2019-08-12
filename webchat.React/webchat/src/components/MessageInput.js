import "./Message.css";
import React from "react";
import { CreateRequestMessage, DeleteRequestMessage } from '../dto/RequestMessage';

const MessageInput = ({ getAllUserMessages, sendMessage, deleteUserMessages, getServer }) => {
  return (
    <div className="vertial-align">
      <div className="messageInput">
        <table id="messageInputTable">
          <tbody>
            <tr>
              <td></td>
              <td>
                <div className="server">
                  <select onChange={e => { getServer(e.target.value) }}>
                    <option value={8090}>Node Server</option>
                    <option value={5000}>.NET Core Server</option>
                    <option value={8080}>Java Server</option>
                    <option value={8070}>Mono/Nancy Server</option>
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <td>From: </td>
              <td>
                <input id="from" className="input" type="text" placeholder="From"
                  onBlur={e => { getAllUserMessages(e.target.value); }} />
              </td>
            </tr>
            <tr>
              <td>To: </td>
              <td><input id="to" className="input" type="text" placeholder="To" /></td>
            </tr>
            <tr>
              <td>Message: </td>
              <td><input id="message" className="input message" type="text" placeholder="Message" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="buttonWrapper">
        <button id="sendBtn" className="button sendBtn"
          onClick={() => {
            sendMessage(CreateRequestMessage(document.getElementById("from").value
              , document.getElementById("to").value
              , new Date().toString()
              , document.getElementById("message").value));
          }}>Send</button>
        <button id="deleteBtn" className="button deleteBtn"
          onClick={() => {
            deleteUserMessages(DeleteRequestMessage(document.getElementById("from").value
              , document.getElementById("to").value));
          }}>Delete Messages</button>
      </div>
    </div>
  );
};

export default MessageInput;
