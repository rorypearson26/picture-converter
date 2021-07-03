import React, { Component } from "react";
import "./styling.scss";
import { NavLink } from "react-router-dom";

class Jumbo extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row justify-content-md-center p-2">
            <div className="col col-lg-2" />
            <NavLink
              to="/home"
              style={{
                color: "black",
                textDecoration: "none",
              }}
              className="col-md-4 display-4  text-center"
            >
              Coin Mosaic
            </NavLink>
            <NavLink
              to="/about"
              style={{
                fontSize: "2em",
                color: "grey",
                textDecoration: "none",
              }}
              activeStyle={{
                fontWeight: "bold",
                color: "black",
              }}
              className="col col-lg-2 display-5 text-center align-self-center "
            >
              Find Out More
            </NavLink>
          </div>
        </div>
        <div className="lead strap-line noselect">
          Convert your pictures into excessively large coin mosaics in one easy
          click.
        </div>
      </div>
    );
  }
}

export default Jumbo;
