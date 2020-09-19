import React, { Component } from "react";
import "./styling.scss";

class Jumbo extends Component {
  render() {
    return (
      <div className="jumbotron jumbotron-fluid noselect">
        <div className="container text-center">
          <h1 className="display-4 ">Coin Mosaic</h1>
          <p className="lead">
            Convert your pictures into pointless coin mosaics in one easy click.
          </p>
        </div>
      </div>
    );
  }
}

export default Jumbo;
