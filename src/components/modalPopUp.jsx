import React, { Component } from "react";
import { ChromePicker } from "react-color";

class ModalPopUp extends Component {
  dismissModal = () => {
    this.props.toggle();
  };

  render() {
    const { colour, onColourChange } = this.props;
    const modalStyles = {
      backgroundColor: `${colour}`,
    };
    return (
      <div
        className={`modal fade WelcomeModal ${
          this.props.showModal ? "show" : ""
        }`}
        style={{
          display: `${this.props.showModal ? "block" : "none"}`,
        }}
        id="WelcomeModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Select Colour
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.dismissModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="modal-body align-center modal-opened"
              style={modalStyles}
              align="center"
            >
              <ChromePicker
                color={colour}
                disableAlpha={true}
                onChange={(selectedColour) =>
                  onColourChange({ ...this.props, selectedColour })
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalPopUp;
