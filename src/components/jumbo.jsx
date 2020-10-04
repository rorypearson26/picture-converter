import React, { Component } from "react";
import NavBar from "./navBar";
import "./styling.scss";
import { Link } from "react-router-dom";

class Jumbo extends Component {
  render() {
    return (
      <div>
        <Link className="display-3 text-center" to="/home">
          Coin Mosaic
        </Link>
        <NavBar />
        <div className="lead strap-line noselect">
          Convert your pictures into excessively large coin mosaics in one easy
          click.
        </div>
      </div>
    );
  }
}

export default Jumbo;
