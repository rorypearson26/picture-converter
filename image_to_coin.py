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
        self.sizer()

    def sizer(self):
        coins_in_width = (self.desired_width / self.coin_size) 
        self.percentage = coins_in_width / self.actual_width

class Output:
    def __init__(self, user_input):
        self.width = int(user_input.actual_width * user_input.percentage)
        self.height = int(user_input.actual_height * user_input.percentage)
        self.bg_colour = user_input.bg_colour
        print("BEFORE", user_input.img.shape[1])
        self.pixel_array = cv2.resize(user_input.img, (self.width, self.height), interpolation=cv2.INTER_AREA)
        print("After", user_input.img.shape[1])
        self.intensities = np.copy(self.pixel_array).flatten()
        self.coin_total = self.intensities.size
        self.coin_array = np.empty([self.height, self.width], dtype=('U20'))

    def optimise_range(self, user_input):
        sorted = np.sort(self.intensities)
        bins = len(user_input.sliders) - 1
        i = 0
        slider_count = 0
        increment = int(round(self.coin_total / bins))
        while (slider_count < bins and i < self.coin_total):
            if (i % increment == 0 and i != 0):
                user_input.sliders[slider_count]["highVal"] = sorted[i]
                user_input.sliders[slider_count+1]["lowVal"] = sorted[i]
                print(f'slider low val {user_input.sliders[slider_count]["lowVal"]}')
                print(f'slider high val {user_input.sliders[slider_count]["highVal"]}')
                slider_count += 1
            i += 1
                

    


def setup(image, user_input):
    """Function to deal with the main setup"""
    u = Input(image, user_input)
    out = Output(u)
    return (u, out)

def pixels_to_coins(sliders, limits, out):
    
    for i in range(0, out.height):
        for j in range(0, out.width):
            for slider in sliders:
                intensity = out.pixel_array[i,j]
                if((slider['lowVal']<=intensity) and (intensity<slider['highVal']) 
                or (intensity == limits['max'])):
                    my_colour = colour_randomiser(ImageColor.getrgb(slider['colour']))
                    out.coin_array[i,j] = my_colour


def colour_randomiser(colour):
    """Subtly adjust coin colours so not an unrealistic block colour"""
    colour_new = np.empty(3, dtype=int)
    randomness = uniform(0.85,1.15)
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

    user_input, output = setup(image, user_input)
    output.optimise_range(user_input)

    pixels_to_coins(user_input.sliders, user_input.limits, output)


    time_taken = int(round(time.time() * 1000)) - start_time
    print(f'{time_taken}ms')
    print(output.pixel_array[4][4])
    del output.pixel_array, output.intensities
    output.coin_array = output.coin_array.tolist()

    return output

    # return setup_result[1]
    # setup_result = setup()
    # mod_img = setup_result[0]         #3D np array ready to populate
    # colour_arr = setup_result[1]      #2D np array of colour/intensity info
    # dim = setup_result[2]             #List in form of (width, height)
    # coin_size = setup_result[3]       #Coin used size
    # time_per_coin = setup_result[4]   #Rough time in seconds per coin to set
    # fig, axarr = plt.subplots(1, 2)
    # coin_pixels(colour_arr, dim, mod_img, coin_size, axarr)
    # output(coin_size, dim, time_per_coin, mod_img, fig, axarr)
    #input('press <ENTER> to continue')
# Setup of intensity / colour matrix for coin colours
    # colour_arr = np.array([[225, 205, 127, 50],
    #                        [190, 78, 117, 102],
    #                        [150, 130, 81, 31],
    #                        [40, 85, 65, 0]])
def output(coin_size, dim, time_per_coin, mod_img, fig, axarr):
    """Sets up the plots and any print statements needing to output"""
    axarr[1].set_xlim((0, dim[0] * coin_size))
    axarr[1].set_ylim((-dim[1] * coin_size), 0)
    axarr[1].set_aspect('equal')
    axarr[1].set_facecolor('xkcd:black')
    axarr[0].hist(mod_img[:, :, 0].flatten(), bins=30)
    fig.tight_layout()
    plt.show()

    print('Picture is', dim[0] * coin_size, ' mm in width, and',
          dim[1] * coin_size, 'mm in height')
    print('A total of', dim[0] * dim[1], ' coins are required')
    print('Expected time to complete of ',
          (time_per_coin * dim[0] * dim[1])/3600, 'hours')