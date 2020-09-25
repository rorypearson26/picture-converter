from flask import Flask, json,request, jsonify
import image_to_coin
import image_to_double_coin
import time

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
        start_time = int(round(time.time() * 1000))
        # res = image_to_coin.main(image, user_input)
        res = image_to_double_coin.main(image, user_input)
        
        # jsonStr = json.dumps(res.__dict__)
        time_taken = int(round(time.time() * 1000)) - start_time
        print(f'{time_taken}ms')
        # res=image_to_coin.setup(image,user_input)
    return res


if __name__ == '__main__':
    app.run()