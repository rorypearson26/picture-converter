import React, { Component } from "react";

class Coin extends Component {
  render() {
    const { cx, cy, colour } = this.props;
    return <circle cx={cx} cy={cy} r="0.5" fill={colour} />;
  }
}
export default Coin;
