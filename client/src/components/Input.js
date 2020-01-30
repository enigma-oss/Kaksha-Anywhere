import React from "react";

const Input = ({ setMessage, sendMessage, message }) => (
  <form action="#" class="bg-light">
    <div class="input-group">
      <input
        type="text"
        placeholder="Type a message"
        aria-describedby="button-addon2"
        class="form-control rounded-0 border-0 py-4 bg-light"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <div class="input-group-append">
        <button
          id="button-addon2"
          type="submit"
          class="btn btn-link"
          onClick={e => sendMessage(e)}
        >
          <i class="fa fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </form>
);

export default Input;
