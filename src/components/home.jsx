import React, { Component } from "react";
import InputForm from "./inputForm";
import UploadedImage from "./uploadedImage";
import Coins from "./coins";
import Slider from "./slider";
import Image from "./common/image";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { isEmpty } from "lodash";
import loading from "../static/slow.gif";
import "react-toastify/dist/ReactToastify.css";
import "./styling.scss";

class Home extends Component {
  state = {
    file: "https://picsum.photos/1000/700?grayscale",
    displayCanvas: false,
    displayUpload: false,
    outerResponseData: {
      width: "",
      height: "",
      coinArray: [],
      bgColour: "",
      sliders: null,
    },
    innerResponseData: {
      width: "",
      height: "",
      coinArray: [],
    },
    fetchInProgress: false,
  };

  handleFile(e) {
    let file = e.target.files[0];

    // Occurs if cancel is selected
    if (typeof file === "undefined") {
      this.setState({ file: "https://picsum.photos/1000/700?grayscale" });
    } else if (file.type !== "image/jpeg") {
      e.target.value = null;
      this.setState({ file: "https://picsum.photos/1000/700?grayscale" });
      toast.error("File needs to be a jpeg image");
    } else {
      this.setState({ file, displayUpload: true, displayCanvas: false });
    }
  }

  async handleUpload(inputData) {
    const { file } = this.state;
    if (UploadedImage.validURL(file)) {
      toast.error("Need to select an image");
      return;
    }
    if (!isEmpty(inputData.errors)) {
      toast.error("Correct the error of your ways to proceed");
      return;
    }
    let formData = new FormData();
    formData.append("image", file);
    formData.append("userInput", JSON.stringify(inputData));
    this.setState({ fetchInProgress: true });
    await axios({
      url: `/imagetransfer`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      contentType: false,
      processData: false,
    }).then((res) => {
      this.handleReturn(res.data);
    });
  }

  handleReturn(result) {
    let { innerResponseData, outerResponseData } = this.state;
    const {
      width,
      height,
      coin_array: coinArray,
      bg_colour: bgColour,
    } = result.outer;
    outerResponseData = { width, height, coinArray, bgColour };
    console.log(result);
    if (result.inner !== "None") {
      const { width, height, coin_array: coinArray } = result.inner;
      innerResponseData = { width, height, coinArray };
    }
    this.setState({
      displayCanvas: true,
      innerResponseData,
      outerResponseData,
      fetchInProgress: false,
    });
  }

  render() {
    const {
      displayCanvas,
      displayUpload,
      innerResponseData,
      outerResponseData,
      fetchInProgress,
    } = this.state;

    let imageStyle = {};
    let mainStyle = {};

    if (fetchInProgress) {
      mainStyle = { display: "none" };
    } else {
      imageStyle = { display: "none" };
    }
    return (
      <React.Fragment>
        <div style={imageStyle}>
          <Image src={loading} />
        </div>

        <div style={mainStyle}>
          <ToastContainer />
          <div className="container">
            <div className="row justify-content-center mb-4">
              <div className="col-xs-12 col-md-6">
                {displayUpload ? (
                  <UploadedImage file={this.state.file} />
                ) : null}
              </div>
              <div className="col-xs-12 col-md-6">
                {displayCanvas ? (
                  <Coins
                    innerResponseData={innerResponseData}
                    outerResponseData={outerResponseData}
                  />
                ) : null}
              </div>
            </div>
            <div className="mb-4">
              <InputForm
                onChange={(e) => this.handleFile(e)}
                onClick={(e) => this.handleUpload(e)}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
