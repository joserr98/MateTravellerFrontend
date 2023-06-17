import React, { useEffect, useState } from "react";
import "./Messages.css";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { getMessages } from "../../services/apiCalls";
import { dateFormat, dateFormatMonth } from "../../services/functions";

export const Messages = () => {
  const rdxUserData = useSelector(userData);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages(rdxUserData.credentials)
      .then((res) => {
        setMessages(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="messagesDesign">
      <div className="messagesContainer">
        {messages.map((message) => (
  <div className={`messages ${rdxUserData.credentials.token.id == message.sender_id ? 'darkBlue' : ''}`} key={message.id}>
            <div className="messageUsers">
              <div className={`messageSender ${rdxUserData.credentials.token.id == message.sender_id ? 'sender' : ''}`}>
                From: {message.sender_name}
              </div> 
              <div className={`messageRecipient ${rdxUserData.credentials.token.id == message.recipient_id ? 'receiver' : ''}`}>
                To: {message.recipient_name}
              </div>
            </div>
            <div className="messageDescription">{message.description}</div>
            <div className="messageDate">
              {dateFormatMonth(message.created_at)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
