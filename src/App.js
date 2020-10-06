import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Jumbo from "./components/jumbo";
import About from "./components/about";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Jumbo />
        <main className="App">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Redirect from="/*" exact to="/home" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
