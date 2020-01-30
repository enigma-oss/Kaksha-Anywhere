import React from "react";

import Home from "./components/Home";
import Join from "./components/Join";

// import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Home} />
    </Router>
  );
};

export default App;
