import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import colourInfo from "../static/Colour.gif";
import fileUploadInfo from "../static/FileUpload.gif";
import shortRun from "../static/Running_small.gif";
import slidersInfo from "../static/Sliders.gif";
import validationInfo from "../static/Validation.gif";

class About extends Component {
  render() {
    return (
      <div>
        <div className="container text-justify mt-4">
          <h2 className="display-5 text-left">Overview</h2>
          <p>
            The conversion process takes your image, coverts it to a low
            resolution, greyscale image, and replaces the pixels with "coins".
            At the moment this combines a base layer of coins with an upper
            layer laid on top. Although this does almost double the amount of
            coins required, the resolution is enhanced without the need to
            increase the coin mosaic size.
            <br />
            <br />
            The colour of each coin is dictated by the average intensity of the
            pixels it is replacing, as well as the positioning of the slider
            ranges. The intensity range is between 0 (darkest) to 255
            (lightest). By adjusting the range of each slider, the quality of
            the conversion can be influenced. For best results, use a
            high-contrast black and white close-up image. The colour of each
            coin is also randomised to create a more realistic interpretation of
            what the coin mosaic could look like if produced.
          </p>
          <figure className="m-2 text-center">
            <figcaption class="figure-caption text-center mb-2">
              Effect of changing the desired width input
            </figcaption>
            <Image
              className="border border-dark rounded-lg"
              src={shortRun}
              alt="Short run gif"
              fluid
            />
          </figure>

          <h2 className="display-5 mt-4 text-left">
            Adjusting the Intensity Ranges
          </h2>
          <p>
            The conversion of the image can be heavily influenced by changing
            the lower and upper bounds of each slider. The values of the other
            sliders will automatically update to ensure each coin has at some
            representation over the intensity spectrum. This cascading effect
            can be seen in the demo below.
          </p>
          <figure className="m-2 text-center">
            <figcaption class="figure-caption text-center mb-2">
              Change the ranges for each coin colour
            </figcaption>
            <Image
              className="border border-dark rounded-lg"
              src={slidersInfo}
              alt="Sliders info gif"
              fluid
            />
          </figure>

          <h2 className="display-5 mt-4 text-left">Colour Selection</h2>
          <p>
            Change the default colours by selecting the relevant circle. Use the
            colour slider to change the hue and the picker to further customise
            your colour. Click the X to close and save selection.
          </p>
          <figure className="m-2 text-center">
            <figcaption class="figure-caption text-center mb-2">
              Change the coin / background colour
            </figcaption>
            <Image
              className="border border-dark rounded-lg"
              src={colourInfo}
              alt="Colour info gif"
              fluid
            />
          </figure>

          <h2 className="display-5 mt-4 text-left">Uploading an Image</h2>
          <p>
            Select an image by clicking "Choose file" and navigating to your
            chosen image. The file needs to be in either a "jpeg" or "png"
            format to be successfully uploaded. The conversion will still work
            if a colour image is used; however, results will be less predictable
            (i.e. a shade of blue and green may look different in the image, but
            the intensity values may be the same).
          </p>
          <figure className="m-2 text-center">
            <figcaption class="figure-caption text-center mb-2">
              Choose file will default to your native file explorer
            </figcaption>
            <Image
              className="border border-dark rounded-lg"
              src={fileUploadInfo}
              alt="File upload info gif"
              fluid
            />
          </figure>

          <h2 className="display-5 mt-4 text-left">Other Input Parameters</h2>
          <p>
            The parameters of desired width, seconds per coin, and coin diameter
            can all be customised. Each field has to be a number and fall within
            set limits in order for validation to be passed. By default, the
            coin diameter used is that of a 1p. The seconds per coin field is
            used to provide a very rough indication of how long the coin mosaic
            may take to be built in reality.
          </p>
          <figure className="m-2 text-center">
            <figcaption class="figure-caption  mb-2">
              Validation of user input
            </figcaption>
            <Image
              className="border border-dark rounded-lg"
              src={validationInfo}
              alt="Validation info gif"
              fluid
            />
          </figure>
        </div>
        <footer className="m-4" />
      </div>
    );
  }
}

export default About;
