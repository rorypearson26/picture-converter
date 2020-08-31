import React, { Component } from "react";
import Slider from "./slider";

class Sliders extends Component {
  state = {
    sliders: [
      { id: 1, value: 0, enabled: true },
      { id: 2, value: 80, enabled: true },
      { id: 3, value: 120, enabled: true },
      { id: 4, value: 200, enabled: true },
      { id: 5, value: 255, enabled: true },
    ],
  };

  onChange = (event, slider) => {
    const sliders = [...this.state.sliders];
    const index = sliders.indexOf(slider);
    sliders[index] = { ...event.target };
    this.setState({ sliders });
  };

  render() {
    const { sliders } = this.state;
    return (
      <div className="container-fluid">
        {sliders.map((slider) => (
          <Slider slider={slider} onChange={this.onChange}></Slider>
        ))}
      </div>
    );
  }
}

export default Sliders;
