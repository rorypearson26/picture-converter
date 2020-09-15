import React, { Component } from "react";

class Coin extends Component {
  render() {
    const { diameter, colour } = this.props;
    const circleStyle = {
      padding: 5,
      margin: 0,
      display: "inline-block",
      backgroundColor: colour,
      borderRadius: "50%",
      width: diameter,
      height: diameter,
    };
    return <div style={circleStyle}></div>;
  }
}

export default Coin;
