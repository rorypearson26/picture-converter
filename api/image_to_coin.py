"""
This module is used to convert an image file into a coin mosaic. The image can
be either colour or greyscale; however, as the image is interpretted as
greyscale, visibility of this could prompt edits that could give better
results.
"""
from cv2 import cv2
import numpy as np
import random
import time

class Input:
    def __init__(self, image, user_input):
        self.time = user_input['data']['time']
        self.desired_width = user_input['data']['width']
        self.coin_size = user_input['data']['coinSize']
        self.sliders = user_input['sliders']
        self.img = cv2.imdecode(np.fromstring(image.read(), np.uint8), cv2.IMREAD_GRAYSCALE)
        self.actual_height = self.img.shape[0]
        self.actual_width = self.img.shape[1]
        self.sizer()
        

    def sizer(self):
        coins_in_width = self.desired_width / self.coin_size
        self.percentage = coins_in_width / self.actual_width


class Output:
    def __init__(self, user_input):
        self.colour_array = None
        self.width = None
        self.height = None
        self.mod_img(user_input)

    def mod_img(self, user_input):
        raw_img = np.array(user_input.img)
        mod_img = np.empty((raw_img[:].shape[0], raw_img[:].shape[1]))
        mod_img[:, :] = raw_img
        self.coin_array = mod_img


def setup(image, user_input):
    """Function to deal with the main setup"""
    u = Input(image, user_input)
    out = Output(u)
    print(u.coin_size)
    #Setup scaling of image
    # u.percentage = sizer(u)
    # u.post.width = int(u.actual_width * u.percentage)
    # u.post.height = int(u.img.shape[0] * u.percentage)
    # dim = (u.post.width, u.post.height)
    # u.img = cv2.resize(u.img, dim, interpolation=cv2.INTER_AREA)

    
    # raw_img = np.array(u.img)
    # mod_img = np.empty((raw_img[:].shape[0], raw_img[:].shape[1], 4))
    # mod_img[:, :, 0] = raw_img
    # result = [mod_img, u]
    # return result



def coin_plt_adjuster(coordinate, coin_size):
    """Adjust the location of the circle cordinates that represent coins"""
    new_coordinate = (coordinate * coin_size) + (0.5 * coin_size)
    return new_coordinate

def colour_randomiser(colour, rand_rng):
    """Subtly adjust coin colours so not an unrealistic block colour"""
    colour_new = np.array([0, 0, 0])
    for i, col in enumerate(colour):
        if colour[i] != 0:
            colour_new[i] = random.randint(col - rand_rng,
                                           col + rand_rng)
    return colour_new

def coin_pixels(colour_arr, dim, mod_img, coin_size, axarr):
    """
    Populate the mod_img array according to the pixel intensity and the
    associated colour from colour_mat. A circle representing the coin is then
    plotted within the for loop to construct the overall coin mosaic.
    """
    for x in range(0, dim[1]):
        for y in range(0, dim[0]):
            #Higher shade value for darker pixel
            intensity = mod_img[x, y, 0]
            if 0 <= intensity < colour_arr[3, 0]:
                shade = 3
            elif colour_arr[0, 3] <= intensity < colour_arr[0, 2]:
                shade = 2
            elif colour_arr[0, 2] <= intensity < colour_arr[0, 1]:
                shade = 1
            else:
                shade = 0
            colour = colour_arr[shade, 1:]
            colour = colour_randomiser(colour, 10) / 255
            mod_img[x, y, 1:4] = colour
            circle = plt.Circle((coin_plt_adjuster(y, coin_size),
                                -1 * coin_plt_adjuster(x, coin_size)),
                               coin_size * 0.5, color=colour)
            axarr[1].add_artist(circle)

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

def main(image, user_input):
    """Entry point for code to be run"""
    setup(image, user_input)
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