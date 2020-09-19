import React, { Component } from "react";
import Jumbo from "./jumbo";
import InputForm from "./inputForm";
import UploadedImage from "./uploadedImage";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

class Home extends Component {
  state = { file: "https://picsum.photos/1000/700?grayscale" };

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
      this.setState({ file });
    }
  }

  async handleUpload(mystuff) {
    const startTime = Date.now();
    const { file } = this.state;
    if (UploadedImage.validURL(file)) {
      toast.error("Need to select an image");
      return;
    }
    let formData = new FormData();
    formData.append("image", file);
    formData.append("userInput", JSON.stringify(mystuff));
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
      console.log(res.data);
    });
    console.log(`Time taken: ${Date.now() - startTime}ms`);
  }

  render() {
    return (
      <React.Fragment>
        <Jumbo />
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className=" col-xs-12 col-md-6 p-2">
              <InputForm
                onChange={(e) => this.handleFile(e)}
                onClick={(e) => this.handleUpload(e)}
              />
            </div>
            <div className=" col-xs-12 col-md-6 p-2">
              <UploadedImage file={this.state.file} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
