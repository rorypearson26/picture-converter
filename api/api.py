from flask import Flask, json,request, jsonify
from flask_cors import CORS
import image_to_double_coin
from testing.dummy_request import dummy_request
import time

# configuration
# DEBUG = True

# instantiate the app
app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/*": {"origins": "*"}})
    
@app.route('/api/imagetransfer', methods=['POST', 'GET'])
def process_mosaic():
  
    if request.method == 'POST':
        image, user_input = dummy_request()
        image1=request.files['image']
        user_input1=json.loads(request.form['userInput'])
        print(type(image))
        res = image_to_double_coin.main(image, user_input)
    return res


if __name__ == '__main__':
    app.run()