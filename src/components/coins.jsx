import React, { Component } from "react";
import Coin from "./coin";

class Coins extends Component {
  componentDidMount() {
    this.updateCanvas();
  }
  updateCanvas() {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.fillRect(0, 0, 1000, 1000);
  }
  render() {
    return (
      <div>
        <canvas ref="canvas" width={1200} height={100} />
        {/* {arr.map((coin, i) => (
          <Coin key={i} colour="#393EF1" diameter="201"></Coin>
        ))} */}
      </div>
    );
  }
}

export default Coins;
