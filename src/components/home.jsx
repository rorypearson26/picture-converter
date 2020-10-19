import React, { Component } from "react";
import InputForm from "./inputForm";
import UploadedImage from "./uploadedImage";
import Coins from "./coins";
import StatDisplay from "./statDisplay";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { isEmpty } from "lodash";
import Resizer from "react-image-file-resizer";
import "react-toastify/dist/ReactToastify.css";
import "./styling.scss";

class Home extends Component {
  state = {
    file: "",
    downscaledImage: "",
    displayCanvas: false,
    displayUpload: false,
    outerResponseData: {
      width: null,
      height: null,
      coinArray: null,
      bgColour: null,
      sliders: null,
      stats: null,
    },
    innerResponseData: {
      width: "",
      height: "",
      coinArray: [],
    },
    fetchInProgress: false,
  };

  downscaleImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        900,
        900,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });

  async handleFile(e) {
    let file = e.target.files[0];
    // Occurs if cancel is selected
    if (typeof file === "undefined") {
      this.setState({ file: "", displayUpload: false, displayCanvas: false });
    } else if (file.type !== "image/jpeg" && file.type !== "image/png") {
      e.target.value = null;
      this.setState({ file: "" });
      toast.error("File needs to be a jpeg or png");
    } else {
      const downscaledImage = await this.downscaleImage(file);
      this.setState({
        file,
        downscaledImage,
        displayUpload: true,
        displayCanvas: false,
      });
    }
  }

  async handleUpload(inputData) {
    const { downscaledImage, file } = this.state;
    if (file === "") {
      toast.error("Need to select an image");
      return;
    }
    if (!isEmpty(inputData.errors)) {
      toast.error("The is some error in your input");
      return;
    }
    let formData = new FormData();
    formData.append("image", downscaledImage);
    formData.append("userInput", JSON.stringify(inputData));
    this.setState({ fetchInProgress: false });
    await axios({
      // url: `https://coin-mosaic.herokuapp.com/api/imagetransfer`,
      // url: `http://localhost:80/api/imagetransfer`,
      url: `https://coin-mosaic.azurewebsites.net/api/imagetransfer`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      contentType: false,
      processData: false,
    })
      .then((res) => {
        this.handleReturn(res.data);
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  handleError(error) {
    if (error.response) {
      toast.error(`${error.message} occured whilst processing the image`);
    } else if (error.request) {
      toast.error(`${error.request} occured whilst processing the image`);
    } else {
      toast.error(`${error} occured whilst processing the image`);
    }
  }

  handleReturn(result) {
    let { innerResponseData, outerResponseData } = this.state;
    const {
      width,
      height,
      coin_array: coinArray,
      bg_colour: bgColour,
      stats,
    } = result.outer;
    outerResponseData = { width, height, coinArray, bgColour, stats };
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

    let mainStyle = {};

    if (fetchInProgress) {
      mainStyle = { display: "none" };
    }
    return (
      <React.Fragment>
        <div style={mainStyle}>
          <ToastContainer />
          <div className="container">
            {displayCanvas ? (
              <div className="row justify-content-center mb-2 mt-4">
                <StatDisplay data={outerResponseData.stats} />
              </div>
            ) : null}

            <div className="row justify-content-center mb-4">
              <div className="col-xs-12 col-md-6 p-2">
                {displayUpload ? (
                  <UploadedImage file={this.state.file} />
                ) : null}
              </div>
              <div className="col-xs-12 col-md-6 p-2">
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
