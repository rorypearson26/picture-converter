from flask import Flask, jsonify, request
import image_to_coin

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)

# sanity check route
@app.route('/imagetransfer', methods=['POST', 'GET'])
def ping_pong():
    if request.method == 'POST':
        print('in post-back-end')
        data=request.files['image']
        image_to_coin.setup(data)
    return "in back-end"


if __name__ == '__main__':
    app.run()