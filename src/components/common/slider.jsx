import React, { Component } from "react";
import "./slider.scss";

class Slider extends Component {
  render() {
    const { slider, onChange } = this.props;
    return (
      <div className="container">
        <input
          className="slider"
          type="range"
          min="0"
          max="255"
          defaultValue={slider.value}
          onChange={(e) => onChange(e, slider)}
        />
        <div className="custom-pill">{slider.value}</div>
      </div>
    );
  }
}

export default Slider;
