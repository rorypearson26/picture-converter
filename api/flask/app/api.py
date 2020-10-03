from flask import Flask, json, request, jsonify
from flask_cors import CORS
from app import image_to_double_coin
import time
from app import app

CORS(app)
# CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/api/imagetransfer", methods=["POST", "GET"])
def process_mosaic():
    start_time = round(time.time() * 1000, 3)

    if request.method == "POST":
        image = request.files["image"]
        user_input = json.loads(request.form["userInput"])
        result = image_to_double_coin.main(image, user_input)
        end_time = round(time.time() * 1000, 3) - start_time
        print(f"\n**********IN API: {end_time}ms*************\n")

    return result

@app.route("/checkup")
def check_status():
    time_str = time.strftime("%d-%m-%y, %H:%M:%S", time.localtime())
    return f"AWAKE AT: {time_str}"


if __name__ == "__main__":
    app.run()