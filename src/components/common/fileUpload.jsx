import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

class FileUpload extends Component {
  state = {
    file: null,
  };

  handleFile(e) {
    let file = e.target.files[0];

    // Occurs if cancel is selected
    if (typeof file === "undefined") {
      file = null;
    } else if (file.type !== "image/jpeg") {
      e.target.value = null;
      this.setState({ file: null });
      toast.error("File needs to be a jpeg image");
    } else {
      this.setState({ file: file });
    }
  }

  handleUpload(e) {
    const { file } = this.state;
    let formData = new FormData();
    formData.append("image", file);
    console.log(file);
    if (file === null) {
      toast.error("Need to select an image");
      return;
    }
    axios({
      url: `/imagetransfer`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    }).then((res) => {
      console.log(res.data);
    });
  }

  render() {
    return (
      <div className="container ">
        <div className="row mb-4 mt-4 align-items-center">
          <div className="col-10 text-left ">
            <ToastContainer alert />
            <input
              type="file"
              name="file"
              onChange={(e) => this.handleFile(e)}
            ></input>
          </div>

          <div className="col-2 text-center">
            <button
              className="btn btn-primary"
              onClick={(e) => this.handleUpload(e)}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUpload;
