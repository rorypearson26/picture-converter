import React, { Component } from "react";
import Slider from "./slider";
import ColourPicker from "./colourPicker";
import "./sliders.scss";

class Sliders extends Component {
  state = {
    limits: { min: 0, max: 255 },
    sliders: [
      { id: 0, lowVal: 0, highVal: 20, enabled: true, colour: "#048B5F" },
      { id: 1, lowVal: 20, highVal: 30, enabled: true, colour: "#A86727" },
      { id: 2, lowVal: 30, highVal: 50, enabled: true, colour: "#784222" },
      { id: 3, lowVal: 50, highVal: 140, enabled: true, colour: "#612b09" },
      { id: 4, lowVal: 140, highVal: 255, enabled: true, colour: "#411c06" },
      // { id: 5, lowVal: 100, highVal: 120, enabled: true, colour: "#411c06" },
      // { id: 6, lowVal: 120, highVal: 140, enabled: true, colour: "#411c06" },
      // { id: 7, lowVal: 140, highVal: 160, enabled: true, colour: "#411c06" },
      // { id: 8, lowVal: 160, highVal: 255, enabled: true, colour: "#411c06" },
    ],
    minGap: 4,
  };

  handleColourChange = (props) => {
    let sliders = [...this.state.sliders];
    const index = sliders.indexOf(props.slider);
    sliders[index].colour = props.selectedColour.hex;
    this.setState({ sliders });
  };

  onChange = (props) => {
    let { minGap, sliders } = this.state;
    let value = parseInt(props.e.target.value);
    const { id, min, max } = props.e.target;
    props = {
      ...props,
      index: sliders.indexOf(props.slider),
      value: value,
      totalSliders: sliders.length,
      id: id,
      minGap: minGap,
    };
    if (props[id] === parseInt(min) || props[id] === parseInt(max)) {
      return;
    }

    if (value > props[id]) {
      sliders = Slider.increasing(sliders, props);
    } else {
      sliders = Slider.decreasing(sliders, props);
    }

    this.setState({ sliders });
  };

  render() {
    const { sliders, limits } = this.state;
    const enabledSliders = sliders.filter((s) => s.enabled);

    return (
      <div className="container">
        {enabledSliders.map((slider) => (
          <div className="slider-row" key={slider.id}>
            <div key={"colour1" + slider.id} className="col-2" align="center">
              <ColourPicker
                colour={slider.colour}
                slider={slider}
                diameter="40"
                defaultValue={slider.lowVal}
                onChange={this.handleColourChange}
              />
            </div>
            <div key={"slider" + slider.id} className=" col-8 ">
              <Slider
                min={limits.min}
                max={limits.max}
                lowVal={slider.lowVal}
                highVal={slider.highVal}
                slider={slider}
                onChange={this.onChange}
              ></Slider>
            </div>
            <div key={"colour2" + slider.id} className="col-2 " align="center">
              <ColourPicker
                colour={slider.colour}
                slider={slider}
                diameter="40"
                defaultValue={slider.highVal}
                onChange={this.handleColourChange}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Sliders;
