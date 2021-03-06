import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import "./styling.scss";

class UploadedImage extends Component {
  static validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  static srcFormatter(file) {
    return UploadedImage.validURL(file) ? file : URL.createObjectURL(file);
  }

  render() {
    const file = UploadedImage.srcFormatter(this.props.file);
    window.scrollTo(0, 0);
    return (
      <div>
        <Image src={file} alt="This has not gone well" fluid />
      </div>
    );
  }
}

export default UploadedImage;
