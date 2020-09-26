import React, { Component } from "react";

class Image extends Component {
  render() {
    const { src } = this.props;
    return (
      <div className="container">
        <img src={src} alt="loading..." />
      </div>
    );
  }
}
export default Image;
