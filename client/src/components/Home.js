import React from "react";
import Chat from "./Chat";
import White4 from "./White4";

const Home = ({ location }) => {
  return (
    <div className="row">
      <div className="col-8">
        <White4 className="white" />
      </div>
      <div className="col-4 chat">
        <Chat location={location} />
      </div>
    </div>
  );
};

export default Home;
