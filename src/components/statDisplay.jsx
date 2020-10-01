import React, { Component } from "react";

class StatDisplay extends Component {
  render() {
    const { data } = this.props;
    const { totalCoins, totalTime, totalMass } = data;
    return (
      // <div className="container">
      //   <h4>Total Coins: {totalCoins}</h4>
      //   <h4>Time Taken: {totalTime}</h4>
      //   <h4>Mass of Mosaic: {totalMass} kg</h4>
      // </div>
      <div className="container">
        <h1>The Headline Stats</h1>
        <table className="table ">
          <thead>
            <tr>
              <td className="text-center">Total Coins:</td>
              <td className="text-center">{totalCoins}</td>
            </tr>
            <tr>
              <td className="text-center">Time Taken:</td>
              <td className="text-center">{totalTime}</td>
            </tr>
            <tr>
              <td className="text-center">Mass of Mosaic:</td>
              <td className="text-center">{totalMass} kg</td>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default StatDisplay;
