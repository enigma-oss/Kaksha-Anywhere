import React from "react";

import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div class="media w-50 ml-auto mb-3">
      <div class="media-body">
        <div class="bg-primary rounded py-2 px-3 mb-2">
          <p class="text-small mb-0 text-white">{ReactEmoji.emojify(text)}</p>
        </div>
        <p class="small text-muted">12:00 PM | Aug 13</p>
      </div>
    </div>
  ) : (
    <div class="media w-50 mb-3">
      <div class="media-body ml-3">
        <div class="bg-light rounded py-2 px-3 mb-2">
          <p class="text-small mb-0 text-muted">{ReactEmoji.emojify(text)}</p>
        </div>
        <p class="small text-muted">12:00 PM | Aug 13</p>
      </div>
    </div>
  );
};

export default Message;
