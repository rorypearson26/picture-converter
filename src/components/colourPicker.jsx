import React, { Component } from "react";
import ModalPopUp from "./modalPopUp";
import "./sliders.scss";

class ColourPicker extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () =>
    this.setState({
      showModal: !this.state.showModal,
    });

  render() {
    const {
      diameter,
      colour,
      defaultValue,
      onColourChange,
      ...rest
    } = this.props;
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
        <div
          className="noselect"
          style={{ ...circleStyle, backgroundColor: colour }}
          onClick={this.toggleModal}
        >
          {defaultValue}
        </div>
        <ModalPopUp
          toggle={this.toggleModal}
          showModal={this.state.showModal}
          colour={colour}
          onColourChange={onColourChange}
          {...rest}
        />
      </div>
    );
  }
}

export default ColourPicker;
