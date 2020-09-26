import React, { Component } from "react";
import "./App.css";
import Home from "./components/home";
import Jumbo from "./components/jumbo";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Jumbo />
        <main className="App">
          <Home />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
