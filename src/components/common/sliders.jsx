import React, { Component } from "react";
import Slider from "./slider";

class Sliders extends Component {
  state = {
    sliders: [
      { id: 0, defaultValue: 5, enabled: true },
      { id: 1, defaultValue: 20, enabled: true },
      { id: 2, defaultValue: 40, enabled: true },
      { id: 3, defaultValue: 60, enabled: true },
      { id: 4, defaultValue: 95, enabled: true },
      { id: 5, defaultValue: 100, enabled: true },
      { id: 6, defaultValue: 120, enabled: true },
      { id: 7, defaultValue: 160, enabled: true },
    ],
    limits: { min: 1, max: 254 },
  };

  onChange = (event, props) => {
    // const enabledSliders = sliders.filter((s) => s.enabled);
    let sliders = [...this.state.sliders];
    let value = parseInt(event.target.value);
    props = {
      ...props,
      index: sliders.indexOf(props.slider),
      value: value,
      totalSliders: sliders.length,
    };

    if (value > props.defaultValue) {
      sliders = increasing(sliders, props);
    } else {
      sliders = decreasing(sliders, props);
    }

    function increasing(sliders, props) {
      const { index, max, value, totalSliders } = props;
      const newValue = value + 1;
      const nextIndex = index + 1;
      const sliderMax = max - (totalSliders - nextIndex);
      //Update props:
      props = { ...props, value: newValue, index: nextIndex };

      if (nextIndex < totalSliders && value < sliderMax) {
        if (value < sliders[nextIndex].defaultValue) {
          sliders[index].defaultValue = value;
        } else if (value > sliders[nextIndex].defaultValue) {
          sliders[index].defaultValue = value;
          sliders = increasing(sliders, props);
        }
      } else if (value >= sliderMax) {
        sliders[index].defaultValue = sliderMax;
        if (nextIndex < totalSliders) {
          sliders = increasing(sliders, props);
        }
      } else {
        sliders[index].defaultValue = value;
      }

      return sliders;
    }

    function decreasing(sliders, props) {
      const { index, min, value } = props;
      const newValue = value - 1;
      const nextIndex = index - 1;
      const sliderMin = min + index;
      //Update props:
      props = { ...props, value: newValue, index: nextIndex };

      if (index > 0 && value > sliderMin) {
        if (value > sliders[nextIndex].defaultValue) {
          sliders[index].defaultValue = value;
        } else if (value < sliders[nextIndex].defaultValue) {
          sliders[index].defaultValue = value;
          sliders = decreasing(sliders, props);
        }
      } else if (value <= sliderMin) {
        sliders[index].defaultValue = sliderMin;
        if (index > 0) {
          sliders = decreasing(sliders, props);
        }
      } else {
        sliders[index].defaultValue = value;
      }

      return sliders;
    }
    this.setState({ sliders });
  };

  render() {
    const { sliders, limits } = this.state;
    const enabledSliders = sliders.filter((s) => s.enabled);

    return (
      <div className="container-fluid">
        {enabledSliders.map((slider) => (
          <Slider
            key={slider.id}
            min={limits.min}
            max={limits.max}
            slider={slider}
            onChange={this.onChange}
            defaultValue={slider.defaultValue}
          ></Slider>
        ))}
      </div>
    );
  }
}

export default Sliders;
