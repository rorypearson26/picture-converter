import React, { Component } from "react";
import "./slider.scss";

class Slider extends Component {
  render() {
    const { onChange, defaultValue, min, max } = this.props;
    return (
      <div className="container">
        <input
          className="slider"
          type="range"
          min={min}
          max={max}
          value={defaultValue}
          onChange={(e) => onChange(e, this.props)}
        />
        <div className="custom-pill">{defaultValue}</div>
      </div>
    );
  }
}

export default Slider;
