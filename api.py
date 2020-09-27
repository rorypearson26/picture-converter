from flask import Flask, json,request, jsonify
import image_to_coin
import image_to_double_coin
import time

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)

# sanity check route
@app.route('/api/imagetransfer', methods=['POST', 'GET'])
def process_mosaic():
    if request.method == 'POST':
        image=request.files['image']
        user_input=json.loads(request.form['userInput'])
        res = image_to_double_coin.main(image, user_input)
    return res


if __name__ == '__main__':
    app.run()