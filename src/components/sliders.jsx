import React, { Component } from "react";
import Slider from "./slider";
import ColourPicker from "./colourPicker";
import "./sliders.scss";

class Sliders extends Component {
  render() {
    const { sliders, limits, onColourChange, onSliderChange } = this.props;
    const enabledSliders = sliders.filter((s) => s.enabled);

    return (
      <div className="container m-2">
        <div className="row justify-content-between">
          <div className="col-2 d-flex justify-content-center">
            <p>MIN</p>
          </div>
          <div className="col-2 d-flex justify-content-center">
            <p>MAX</p>
          </div>
        </div>
        {enabledSliders.map((slider) => (
          <div className="slider-row" key={slider.id}>
            <div key={"colour1" + slider.id} className="col-2" align="center">
              <ColourPicker
                colour={slider.colour}
                slider={slider}
                diameter="40"
                defaultValue={slider.lowVal}
                id="slider"
                onColourChange={onColourChange}
              />
            </div>
            <div key={"slider" + slider.id} className=" col-8 ">
              <Slider
                min={limits.min}
                max={limits.max}
                slider={slider}
                lowVal={slider.lowVal}
                highVal={slider.highVal}
                onSliderChange={onSliderChange}
              ></Slider>
            </div>
            <div key={"colour2" + slider.id} className="col-2 " align="center">
              <ColourPicker
                colour={slider.colour}
                slider={slider}
                diameter="40"
                defaultValue={slider.highVal}
                id="slider"
                onColourChange={onColourChange}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Sliders;
