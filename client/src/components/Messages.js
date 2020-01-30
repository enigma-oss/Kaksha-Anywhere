import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message";

const Messages = ({ messages, name }) => (
  <div>
    {/* <ScrollToBottom className="w-100"> */}
    {messages.map((message, i) => (
      <div className="" key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
    {/* </ScrollToBottom> */}
  </div>
);

export default Messages;
