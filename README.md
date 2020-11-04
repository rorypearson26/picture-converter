## Coin Mosaic Picture Converter:

Open [https://rorypearson26.github.io/picture-converter](https://rorypearson26.github.io/picture-converter) to view the live project. A user guide can be viewed [here](https://rorypearson26.github.io/picture-converter/#/about).

The project started life as a quick Python script to check the feasibility of making custom "coin-based" artwork as a side-job (sadly it is not); however, it was then used as a vehicle to improve understanding of technologies used across the full-stack. The main purpose of the web app is to upload a user image and convert it into a coin mosaic. The coin mosaic image, as well as the main stats from the conversion, are then shown to the user once the conversion is complete.

At the front-end of the application is a clean UI built using React to display options that the user can influence during the conversion process (currently hosted on GitHub-pages). When the user clicks the process button, their data is sent to the Flask backend API (currently hosted on Azure) where it is converted into an array of colours. A response consisting of the colour array for each layer, statistical information, and metadata is then sent back to the front-end. Once received, each item in the colour arrays is converted into a circle SVG. The coin mosaic SVG and the main stats are then rendered for the user to view.

## Technologies used:

- Python
- React
- JavaScript
- Flask
- CSS
- Bootstrap
- NGINX
- Docker
- Azure

## Improvements to make:

The project is currently live but the following improvements could be made in future:

- Better cross-browser/device compatability
- Algorithm to optimise intensity ranges that produce the best image
- Increase the speed of coin mosaic render
- Refactor some of the React components
