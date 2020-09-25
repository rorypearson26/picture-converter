import React from "react";
import Slider from "./slider";
import Sliders from "./sliders";
import FileUpload from "./fileUpload";
import ColourPicker from "./colourPicker";
import Form from "./common/form";
import Joi from "joi-browser";
import "./sliders.scss";
import "./styling.scss";

class InputForm extends Form {
  state = {
    limits: { min: 0, max: 255 },
    sliders: [
      { id: 0, lowVal: 0, highVal: 30, enabled: true, colour: "#290F02" },
      { id: 1, lowVal: 30, highVal: 100, enabled: true, colour: "#612B09" },
      { id: 2, lowVal: 100, highVal: 200, enabled: true, colour: "#784222" },
      { id: 3, lowVal: 200, highVal: 255, enabled: true, colour: "#A86727" },
      // { id: 4, lowVal: 200, highVal: 255, enabled: true, colour: "#BD7616" },
    ],

    minGap: 4,
    data: { width: 1600, time: 30, coinSize: 20.3 },
    errors: {},
    backgroundColour: "#000000",
  };

  schema = {
    width: Joi.number().min(100).max(3000).required().label("Width in mm"),
    time: Joi.number().min(5).max(300).required().label("Time in seconds"),
    coinWidth: Joi.number()
      .precision(1)
      .min(15)
      .max(30)
      .required()
      .label("Coin width in mm"),
  };

  handleSliderChange = (props) => {
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

  handleColourChange = (props) => {
    const { id } = props;
    if (id === "slider") {
      let sliders = [...this.state.sliders];
      const index = sliders.indexOf(props.slider);
      sliders[index].colour = props.selectedColour.hex;
      this.setState({ sliders });
    } else {
      this.setState({ backgroundColour: props.selectedColour.hex });
    }
  };

  render() {
    const { limits, sliders, minGap, backgroundColour, data } = this.state;

    const { onClick, onChange } = this.props;

    return (
      <form autoComplete="off" className="my-container-clipped p-2">
        <div className="row ">
          <FileUpload
            onChange={onChange}
            onClick={() => onClick({ ...this.state })}
          />
        </div>
        <div className="row ">
          <Sliders
            limits={limits}
            sliders={sliders}
            minGap={minGap}
            onSliderChange={this.handleSliderChange}
            onColourChange={this.handleColourChange}
          />
        </div>
        <div className="row p-2 mt-2">
          <div className="col-xs-12 col-md-4 p-2 ">
            {this.renderInput({
              name: "width",
              label: "Desired width in mm",
              defaultValue: data.width,
            })}
          </div>
          <div className="col-xs-12 col-md-4 p-2">
            {this.renderInput({
              name: "time",
              label: "Seconds per coin",
              defaultValue: data.time,
            })}
          </div>
          <div className="col-xs-12 col-md-4 p-2">
            {this.renderInput({
              name: "coinWidth",
              label: "Coin diameter in mm",
              defaultValue: data.coinSize,
            })}
          </div>
        </div>
        <div className="row align-items-center m-2">
          <div className="col-6 text-center">
            <h4>Select background colour:</h4>
          </div>
          <div className="col-6 text-center ">
            <ColourPicker
              colour={backgroundColour}
              diameter="80"
              defaultValue=""
              id="bg"
              onColourChange={this.handleColourChange}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default InputForm;
