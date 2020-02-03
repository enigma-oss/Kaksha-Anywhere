import React from "react";

import onlineIcon from "../icons/onlineIcon.png";
import closeIcon from "../icons/closeIcon.png";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <div className="onlineIcon"> </div>
      <h4>Room Name:- {room}</h4>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);

export default InfoBar;
