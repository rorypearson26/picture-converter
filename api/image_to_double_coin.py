"""
This module is used to convert an image file into a coin mosaic. The image can
be either colour or greyscale; however, as the image is interpretted as
greyscale, visibility of this could prompt edits that could give better
results.
"""
from cv2 import cv2
import numpy as np
from PIL import ImageColor
from random import randint, uniform
import time
from flask import Flask, json,request, jsonify

class Input:
    def __init__(self, image, user_input):
        self.time = int(user_input['data']['time'])
        self.coin_size = int(user_input['data']['coinSize'])
        self.sliders = user_input['sliders']
        self.limits = user_input['limits']
        self.img = cv2.imdecode(np.fromstring(image.read(), np.uint8), cv2.IMREAD_GRAYSCALE)
        self.desired_width = int(user_input['data']['width'])
        self.actual_height = self.img.shape[0]
        self.actual_width = self.img.shape[1]
        self.bg_colour = user_input['backgroundColour']
        self.min_gap = int(user_input['minGap'])
        self.sizer()

    def sizer(self):
        coins_in_width = (self.desired_width / self.coin_size) 
        self.percentage = coins_in_width / self.actual_width

class Output:
    def __init__(self, outer, inner=None):
        self.outer = outer
        self.inner = inner
        self.toJSON(outer, inner)
    
    def toJSON(self, outer, inner=None):
        self.outer_JSON = json.dumps(outer.__dict__)
        if (inner != None):
            self.inner_JSON = json.dumps(inner.__dict__)
            self.full_JSON = '{"outer":' + self.outer_JSON + ', "inner":' + self.inner_JSON +'}'
        else:
            self.full_JSON = '{"outer":' + self.outer_JSON + ', "inner": "None"}' 



class OuterMosaic:
    """OuterMosaic object repesents the core coin array, or can be used as the base
    when the inner array is used to add resolution to the coin mosaic."""
    def __init__(self, input_object):
        self.width = int(input_object.actual_width * input_object.percentage)
        self.height = int(input_object.actual_height * input_object.percentage)
        self.sliders = input_object.sliders
        self.min_gap = input_object.min_gap
        self.limits = input_object.limits
        self.actual_width = input_object.actual_width
        self.actual_height = input_object.actual_height
        self.bg_colour = input_object.bg_colour
        self.pixel_array = cv2.resize(input_object.img, (self.width, self.height), interpolation=cv2.INTER_AREA)
        self.coin_array = np.empty([self.height, self.width], dtype=('U20'))

    
class InnerMosaic:
    """InnerMosaic object repesents the secondary optional layer to add resolution.
    The image is cropped by the equivalent of a coin radius of each edge."""
    def __init__(self, outer, input_object):
        self.width = outer.width - 1
        self.height = outer.height - 1
        pixels_in_half_coin = int(round(0.5 / input_object.percentage))
        right_limit = input_object.actual_width - pixels_in_half_coin
        bottom_limit = input_object.actual_height - pixels_in_half_coin
        inner_img = input_object.img[ pixels_in_half_coin : bottom_limit,pixels_in_half_coin : right_limit,]
        self.pixel_array = cv2.resize(inner_img, (self.width, self.height), interpolation=cv2.INTER_AREA)
        self.coin_array = np.empty([self.height, self.width], dtype=('U20'))

def setup(image, user_input):
    """Function to deal with the main setup"""
    u = Input(image, user_input)
    outer = OuterMosaic(u)
    inner = InnerMosaic(outer, u)
    return (u, outer, inner)


def pixels_to_coins(sliders, limits, mosaic_obj):
    
    for i in range(0, mosaic_obj.height):
        for j in range(0, mosaic_obj.width):
            for slider in sliders:
                intensity = mosaic_obj.pixel_array[i,j]
                if((slider['lowVal']<=intensity) and (intensity<slider['highVal']) 
                or (intensity == limits['max'])):
                    my_colour = colour_randomiser(intensity, slider, ImageColor.getrgb(slider['colour']))
                    mosaic_obj.coin_array[i,j] = my_colour


def colour_randomiser(intensity, slider, colour):
    """Subtly adjust coin colours so not an unrealistic block colour. The randomness value is also
    adjusted depending on whether the intensity value is close the slider min or max."""
    colour_new = np.empty(3, dtype=int)
    deviation = 0.2
    high_delta = slider['highVal'] - intensity
    low_delta = intensity - slider['lowVal']

    if high_delta <= low_delta: 
        randomness = uniform(1, 1 + deviation)
    else:
        randomness = uniform(1 - deviation, 1)

    # randomness = uniform(1 - deviation/2, 1 +deviation/2)
    for i, hue in enumerate(colour):
        colour_rand = int(randomness * hue)
       
        if (colour_rand <= 0):
            colour_new[i] = int(0)
        elif (colour_rand >= 255):
            colour_new[i] = int(255)
        else:
            colour_new[i] = colour_rand
        
        colour_new_formatted = f"rgb({colour_new[0]},{colour_new[1]},{colour_new[2]})"
    return colour_new_formatted

def main(image, user_input):
    """Entry point for code to be run"""
    start_time = int(round(time.time() * 1000))

    input_object, outer, inner = setup(image, user_input)

    pixels_to_coins(outer.sliders, input_object.limits, outer)
    pixels_to_coins(outer.sliders, input_object.limits, inner)

    outer.coin_array = outer.coin_array.tolist()
    inner.coin_array = inner.coin_array.tolist()

    del outer.pixel_array, inner.pixel_array
    output = Output(outer, inner)
    pounds = (inner.width*inner.height + outer.height * outer.width)/100
    time_taken = int(round(time.time() * 1000)) - start_time
    print(f'{time_taken}ms')
    return output.full_JSON

