import React, { Component } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { ChromePicker } from "react-color";
import "./sliders.scss";

class ColourPicker extends Component {
  render() {
    const { diameter, colour, defaultValue, onColourChange } = this.props;
    const circleStyle = {
      color: "white",
      borderRadius: "50%",
      cursor: "pointer",
      width: `${diameter}px`,
      height: `${diameter}px`,
      lineHeight: `${diameter}px`,
      textAlign: "center",
      fontSize: "16pt",
      boxShadow: "-5px 5px 5px 5px #c9c9c9",
    };
    return (
      <div className="row justify-content-center">
        <Popup
          trigger={
            <div
              className="noselect"
              style={{ ...circleStyle, backgroundColor: colour }}
            >
              {defaultValue}
            </div>
          }
          position="left center"
        >
          <ChromePicker
            color={colour}
            disableAlpha={true}
            onChange={(selectedColour) =>
              onColourChange({ ...this.props, selectedColour })
            }
          />
        </Popup>
      </div>
    );
  }
}

export default ColourPicker;
