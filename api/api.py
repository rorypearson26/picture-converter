from flask import Flask, json,request
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
        image=request.files['image']
        user_input=json.loads(request.form['userInput'])
        res = image_to_coin.main(image, user_input)
        # res=image_to_coin.setup(image,user_input)
    return "SUCCESS"


if __name__ == '__main__':
    app.run()