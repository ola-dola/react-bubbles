import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import Bubblepage from "./components/BubblePage";
import "./styles.scss";

function withAuthCheck(Component, props) {
  return localStorage.getItem("token") ? (
    <Component {...props} />
  ) : (
    <Redirect to="/" />
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/bubbles-page" render={props => withAuthCheck(Bubblepage, props)} />
      </div>
    </Router>
  );
}

export default App;
