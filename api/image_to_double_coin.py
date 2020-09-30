"""
This module is used to convert an image file into a coin mosaic. The image can
be either colour or greyscale; however, as the image is interpretted as
greyscale, visibility of this could prompt edits that could give better
results.
"""
import numpy as np
from cv2 import cv2
from PIL import ImageColor
from random import randint, uniform
import time
from flask import Flask, json, request, jsonify
from datetime import datetime, timedelta
import math


class Input:
    def __init__(self, image, user_input):
        self.time = int(user_input["data"]["time"])
        self.coin_size = float(user_input["data"]["coinSize"])
        self.sliders = user_input["sliders"]
        self.limits = user_input["limits"]
        self.img = cv2.imdecode(
            np.frombuffer(image.read(), np.uint8), cv2.IMREAD_GRAYSCALE
        )
        self.desired_width = float(user_input["data"]["width"])
        self.actual_height = self.img.shape[0]
        self.actual_width = self.img.shape[1]
        self.bg_colour = user_input["backgroundColour"]
        self.min_gap = int(user_input["minGap"])
        self.sizer()

    def sizer(self):
        coins_in_width = self.desired_width / self.coin_size
        self.percentage = coins_in_width / self.actual_width


class Output:
    def __init__(self, outer, inner=None):
        self.outer = outer
        self.inner = inner
        self.toJSON(outer, inner)

    def toJSON(self, outer, inner=None):
        self.outer_JSON = json.dumps(outer.__dict__)
        if inner != None:
            self.inner_JSON = json.dumps(inner.__dict__)
            self.full_JSON = (
                '{"outer":' + self.outer_JSON + ', "inner":' + self.inner_JSON + "}"
            )
        else:
            self.full_JSON = '{"outer":' + self.outer_JSON + ', "inner": "None"}'


class OuterMosaic:
    """OuterMosaic object repesents the core coin array, or can be used as the base
    when the inner array is used to add resolution to the coin mosaic."""

    def __init__(self, input_object):
        self.width = int(input_object.actual_width * input_object.percentage)
        self.height = int(input_object.actual_height * input_object.percentage)
        self.time = int(input_object.time)
        self.sliders = input_object.sliders
        self.min_gap = input_object.min_gap
        self.limits = input_object.limits
        self.actual_width = input_object.actual_width
        self.actual_height = input_object.actual_height
        self.bg_colour = input_object.bg_colour
        self.coin_size = input_object.coin_size
        self.pixel_array = cv2.resize(
            input_object.img, (self.width, self.height), interpolation=cv2.INTER_AREA
        )
        self.coin_array = np.empty([self.height, self.width], dtype=("U20"))
        self.stats = {}


class InnerMosaic:
    """InnerMosaic object repesents the secondary optional layer to add resolution.
    The image is cropped by the equivalent of a coin radius of each edge."""

    def __init__(self, outer, input_object):
        self.width = outer.width - 1
        self.height = outer.height - 1
        pixels_in_half_coin = int(round(0.5 / input_object.percentage))
        right_limit = input_object.actual_width - pixels_in_half_coin
        bottom_limit = input_object.actual_height - pixels_in_half_coin
        inner_img = input_object.img[
            pixels_in_half_coin:bottom_limit,
            pixels_in_half_coin:right_limit,
        ]
        self.pixel_array = cv2.resize(
            inner_img, (self.width, self.height), interpolation=cv2.INTER_AREA
        )
        self.coin_array = np.empty([self.height, self.width], dtype=("U20"))


def setup(image, user_input):
    """Function to deal with the main setup"""
    u = Input(image, user_input)
    outer = OuterMosaic(u)
    inner = InnerMosaic(outer, u)
    get_stats(outer, inner)
    return (u, outer, inner)


def colour_mapping(sliders, colour_shades, mosaic_obj):
    coin_array = np.copy(mosaic_obj.pixel_array)
    shade_variants = colour_shades.shape[1]
    total_sliders = len(sliders)
    test_outarray = np.zeros((coin_array.shape[0], coin_array.shape[1]), dtype=(int))

    for i in range(0, total_sliders):
        low_val = sliders[i]["lowVal"]
        high_val = sliders[i]["highVal"]
        slider_range = high_val - low_val + 1
        get_colour = lambda x: colour_shades[i, x]

        f = np.logical_and(low_val <= coin_array, coin_array <= high_val)
        test_outarray = np.where(
            f,
            np.random.randint(0, shade_variants, f.shape),
            test_outarray,
        )

        mosaic_obj.coin_array = np.where(
            f,
            get_colour(test_outarray),
            mosaic_obj.coin_array,
        )


def get_random(i, coin_array):
    return coin_array * 10 * uniform(0.95, 1.05)


def colour_randomiser(deviation, colour):
    """Subtly adjust coin colours so not an unrealistic block colour. The randomness value is also
    adjusted depending on whether the intensity value is close the slider min or max."""
    colour_new = np.empty(3, dtype=int)

    for i, hue in enumerate(colour):
        colour_rand = int(deviation * hue)

        if colour_rand <= 0:
            colour_new[i] = int(0)
        elif colour_rand >= 255:
            colour_new[i] = int(255)
        else:
            colour_new[i] = colour_rand

        colour_new_formatted = f"rgb({colour_new[0]},{colour_new[1]},{colour_new[2]})"
    return colour_new_formatted


def get_colour_shades(sliders, deviation):
    """Create array of shades from darkest at index[0] to lightest at index[max]"""
    total_sliders = len(sliders)
    shades_per_slider = round((100.0 * deviation * 2), None)
    colour_shades = np.empty([total_sliders, shades_per_slider], dtype=("U20"))
    current_deviation = float(0)

    for i, slider in enumerate(sliders):
        colour = ImageColor.getrgb(slider["colour"])
        for j in range(0, shades_per_slider):
            current_deviation = ((100.0 - (deviation * 100.0)) + j) / 100
            colour_shades[i, j] = colour_randomiser(current_deviation, colour)

    return colour_shades


def get_stats(outer, inner=None):
    """Function to create some stats about the mosaic being designed."""

    outer_total_coins = outer.width * outer.height
    inner_total_coins = 0
    if inner != None:
        inner_total_coins = inner.width * inner.height

    total_coins = outer_total_coins + inner_total_coins
    total_time_str = convert_timedelta(timedelta(seconds=int(total_coins * outer.time)))
    total_mass = round(total_coins * coin_mass(outer.coin_size, 1.6), 1)
    stat_dict = {
        "totalCoins": total_coins,
        "totalTime": total_time_str,
        "totalMass": total_mass,
    }
    outer.stats = stat_dict


def convert_timedelta(timedelta_seconds):
    days = timedelta_seconds.days
    hours = timedelta_seconds.seconds // 3600
    minutes = (timedelta_seconds.seconds // 60) % 60
    if days == 1:
        return_str = f"{days} Day, {hours} Hours, {minutes} Minutes"
    elif days > 1:
        return_str = f"{days} Days, {hours} Hours, {minutes} Minutes"
    else:
        return_str = f"{hours} Hours, {minutes} Minutes"

    return return_str


def coin_mass(coin_size, coin_thickness):
    density = 7500.0  # kg/m^3
    area = (((coin_size * 0.5) / 1000.0) ** 2) * math.pi
    volume = (area * coin_thickness) / 1000.0
    mass = density * volume
    return mass


def main(image, user_input):
    """Entry point for code to be run"""

    input_object, outer, inner = setup(image, user_input)
    colour_shades = get_colour_shades(outer.sliders, 0.2)

    start_time = round(time.time() * 1000, 3)

    colour_mapping(outer.sliders, colour_shades, outer)
    # pixels_to_coins(outer.sliders, input_object.limits, outer, colour_shades)
    outer_time = round(time.time() * 1000, 3)

    colour_mapping(outer.sliders, colour_shades, inner)
    # pixels_to_coins(outer.sliders, input_object.limits, inner, colour_shades)
    inner_time = round(time.time() * 1000, 3)

    outer.coin_array = outer.coin_array.tolist()
    inner.coin_array = inner.coin_array.tolist()
    list_time = round(time.time() * 1000, 3)

    print(
        f"outer time {round(outer_time - start_time, 3)}ms inner time {round(inner_time-outer_time, 3)}ms to list time {round(list_time-inner_time, 3)}ms"
    )
    # print(outer.coin_array)
    del outer.pixel_array, inner.pixel_array
    output = Output(outer, inner)
    pounds = (inner.width * inner.height + outer.height * outer.width) / 100
    time_taken = int(round(time.time() * 1000)) - start_time
    return output.full_JSON
