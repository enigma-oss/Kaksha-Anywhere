import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../style/join.css";

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="container">
      <form className="join-form">
        <h1 className="text-center heading">Join</h1>
        <div className="form-group">
          <input
            placeholder="Name"
            className="form-control"
            type="text"
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Room"
            className="form-control mt-20"
            type="text"
            onChange={event => setRoom(event.target.value)}
          />
        </div>
        <div className="form-group">
          <Link
            onClick={e => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button className="btn btn-primary btn-block" type="submit">
              Sign In
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
