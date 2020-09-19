import React, { Component } from "react";

class FileUpload extends Component {
  render() {
    const { onClick, onChange } = this.props;
    return (
      <div className="container  ">
        <div className="row p-4">
          <div id="drop" className="input-group">
            <input
              type="file"
              className="form-control "
              placeholder="Upload Image"
              onChange={onChange}
            />
            <span className="input-group-btn input-group-append">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClick}
              >
                Upload
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUpload;
