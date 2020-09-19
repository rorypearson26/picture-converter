import React, { Component } from "react";
import "./sliders.scss";

class Slider extends Component {
  static increasing(sliders, props) {
    const { index, max, value, totalSliders, id, minGap } = props;
    let newValue = value + minGap;
    const nextIndex = index + 1;
    const otherID = id === "lowVal" ? "highVal" : "lowVal";
    const pointerMax =
      max -
      (totalSliders - nextIndex) * minGap +
      (id === "lowVal" ? -parseInt(minGap) : 0);
    if (pointerMax >= max) {
      return sliders;
    }
    //Update props:
    props = { ...props, value: newValue, index: nextIndex };
    let setValue = value;

    //Only called for lower value bottom slider.
    if (nextIndex >= totalSliders) {
      if (value >= pointerMax) {
        setValue = pointerMax;
      }
      sliders[index][id] = sliders[index - 1][otherID] = setValue;
      return sliders;
    }
    sliders[index][id] = setValue;
    id === "lowVal"
      ? (sliders[index - 1][otherID] = setValue)
      : (sliders[nextIndex][otherID] = setValue);

    if (value >= pointerMax) {
      setValue = pointerMax;
      sliders[index][id] = setValue;
      id === "lowVal"
        ? (sliders[index - 1][otherID] = setValue)
        : (sliders[nextIndex][otherID] = setValue);
      sliders = this.increasing(sliders, props);
    } else if (value < sliders[nextIndex][id] - minGap) {
      return sliders;
    } else if (props[id] !== parseInt(max)) {
      sliders = this.increasing(sliders, props);
    }

    return sliders;
  }

  static decreasing(sliders, props) {
    const { index, min, value, id, minGap } = props;
    let newValue = value - minGap;
    const nextIndex = index - 1;
    const otherID = id === "lowVal" ? "highVal" : "lowVal";
    const pointerMin =
      min + index * minGap + (id === "highVal" ? parseInt(minGap) : 0);
    if (pointerMin <= min) {
      return sliders;
    }
    //Update props:
    props = { ...props, value: newValue, index: nextIndex };
    let setValue = value;

    //Only called for higher value of top slider.
    if (index <= 0) {
      if (value <= pointerMin) {
        setValue = pointerMin;
      }
      sliders[index][id] = sliders[index + 1][otherID] = setValue;
      return sliders;
    }
    if (index > 0 && setValue > pointerMin) {
      sliders[index][id] = setValue;
      id === "lowVal"
        ? (sliders[nextIndex][otherID] = setValue)
        : (sliders[index + 1][otherID] = setValue);

      if (value <= sliders[nextIndex][id] + minGap) {
        sliders = this.decreasing(sliders, props);
      }
    } else if (value <= pointerMin) {
      setValue = pointerMin;
      sliders[index][id] = setValue;
      id === "lowVal"
        ? (sliders[nextIndex][otherID] = setValue)
        : (sliders[index + 1][otherID] = setValue);
      if (index > 0) {
        sliders = this.decreasing(sliders, props);
      }
    } else {
      sliders[index][id] = value;
    }

    return sliders;
  }

  render() {
    const { onSliderChange, lowVal, highVal, min, max } = this.props;
    return (
      <div className="wrap" role="group">
        <input
          id="highVal"
          className="high"
          type="range"
          min={min}
          max={max}
          value={highVal}
          onChange={(e) => onSliderChange({ ...this.props, e })}
        />
        <input
          id="lowVal"
          className="low"
          type="range"
          min={min}
          max={max}
          value={lowVal}
          onChange={(e) => onSliderChange({ ...this.props, e })}
        />
      </div>
    );
  }
}

export default Slider;
