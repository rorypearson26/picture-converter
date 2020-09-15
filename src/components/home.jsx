import React, { Component } from "react";
import Sliders from "./sliders";
import FileUpload from "./common/fileUpload";
import "./sliders.scss";
import "../App.css";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">Coin Mosaic</div>
        <div
          className="container
           my-container"
        >
          <div className="row ">
            <Sliders />
          </div>
          <div className="row ">
            <FileUpload />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
