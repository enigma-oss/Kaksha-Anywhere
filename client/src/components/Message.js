import React from "react";

import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user, date }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  console.log(date)
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="media w-50 ml-auto mb-3">
      <div className="media-body">
        <div className="bg-primary rounded py-2 px-3 mb-2 mr-2">
          <p className="text-username-self">{user}</p>
          <p className="text-small mb-0 text-white">
            {ReactEmoji.emojify(text)}
          </p>
        </div>
        <p className="small text-muted">{date}</p>
      </div>
    </div>
  ) : (
    <div className="media w-50 mb-3">
      <div className="media-body ml-3">
        <div className="bg-light rounded py-2 px-3 mb-2">
        <p className="text-username-others">{user}</p>
          <p className="text-small mb-0 text-muted">
            {ReactEmoji.emojify(text)}
          </p>
        </div>
        <p className="small">{date}</p>
      </div>
    </div>
  );
};

export default Message;
