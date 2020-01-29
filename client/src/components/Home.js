import React from "react";
import Chat from "./Chat";
import White4 from "./White4";

const Home = ({ location }) => {
  return (
    <div className="home">
      <White4 className="white" />
      <Chat className="chat" location={location} />
    </div>
  );
};

export default Home;
