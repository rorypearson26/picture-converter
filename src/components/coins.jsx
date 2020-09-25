import React, { Component } from "react";
import Coin from "./coin";
import "./sliders.scss";

class Coins extends Component {
  // Save png modified from https://mybyways.com/blog/convert-svg-to-png-using-your-browser
  buildSVG() {
    const { innerResponseData: inner, outerResponseData: outer } = this.props;
    const spacing = 1; // Value of 1 for touching coins
    const offset = spacing / 2;

    const mySVG = (
      <svg
        viewBox={`0 0 ${outer.width * spacing} ${outer.height * spacing}`}
        id="coinMosaicSVG"
      >
        <rect
          x="0"
          y="0"
          width={outer.width * spacing}
          height={outer.height * spacing}
          fill={outer.bgColour}
        />
        <g>
          {outer.coinArray.map((row, i) => (
            <g key={`outer${i}`}>
              {row.map((colour, j) => (
                <Coin
                  key={`outer${i}${j}`}
                  cx={j * spacing + offset}
                  cy={i * spacing + offset}
                  colour={colour}
                />
              ))}
            </g>
          ))}
        </g>
        <g>
          {inner.coinArray.map((row, i) => (
            <g key={`inner${i}`}>
              {row.map((colour, j) => (
                <Coin
                  key={`inner${i}${j}`}
                  cx={j * spacing + spacing}
                  cy={i * spacing + spacing}
                  colour={colour}
                />
              ))}
            </g>
          ))}
        </g>
      </svg>
    );
    return mySVG;
  }

  downloadDimensions() {
    const { outerResponseData: outer } = this.props;
    const aspectRatio = outer.height / outer.width;
    let downloadDims = { width: 0, height: 0 };
    downloadDims.width = 2000;
    downloadDims.height = Math.round(downloadDims.width * aspectRatio);
    return downloadDims;
  }

  handleOnClick() {
    var canvas = document.createElement("canvas", { id: "c" });
    var svgGhost = document.getElementById("coinMosaicSVG");
    var svg = svgGhost.cloneNode(true);
    var s = new XMLSerializer();
    const { width, height } = this.downloadDimensions();
    console.log(width, height);
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    canvas.width = width;
    canvas.height = height;
    var data = s.serializeToString(svg);
    var win = window.URL || window.webkitURL || window;
    var img = new Image();
    var blob = new Blob([data], { type: "image/svg+xml" });
    var url = win.createObjectURL(blob);

    img.onload = function () {
      canvas.getContext("2d").drawImage(img, 0, 0);
      win.revokeObjectURL(url);
      var uri = canvas.toDataURL("image/png");
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = uri;
      a.download =
        (svg.id ||
          svg.svg.getAttribute("name") ||
          svg.getAttribute("aria-label") ||
          "untitled") + ".png";
      a.click();
      window.URL.revokeObjectURL(uri);
      document.body.removeChild(a);
    };
    img.src = url;
  }

  render() {
    const mySVG = this.buildSVG();
    return (
      <div className="align-items-center">
        {mySVG}
        <button
          onClick={(mySVG) => this.handleOnClick(mySVG)}
          className="btn btn-primary m-2"
        >
          Download pic
        </button>
        <div id="d"></div>
        <br />
      </div>
    );
  }
}
export default Coins;
