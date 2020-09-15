"""
This module is used to convert an image file into a coin mosaic. The image can
be either colour or greyscale; however, as the image is interpretted as
greyscale, visibility of this could prompt edits that could give better
results.
"""
from cv2 import cv2
import numpy as np
import matplotlib.pyplot as plt
import random
from pathlib import Path as p
import time

def setup(myFile):
    """Function to deal with the main setup"""
    #File to be imported
 

    #Setup scaling of image
    img = cv2.imdecode(np.fromstring(myFile.read(), np.uint8), cv2.IMREAD_GRAYSCALE)
    pic_width = img.shape[1]
    coin_size = 20
    time_per_coin = 10
    percentage = sizer(4000, pic_width, coin_size)
    width = int(pic_width * percentage)
    height = int(img.shape[0] * percentage)
    dim = (width, height)
    img = cv2.resize(img, dim, interpolation=cv2.INTER_AREA)

    # Setup of intensity / colour matrix for coin colours
    colour_arr = np.array([[225, 205, 127, 50],
                           [190, 78, 117, 102],
                           [150, 130, 81, 31],
                           [40, 85, 65, 0]])
    raw_img = np.array(img)
    mod_img = np.empty((raw_img[:].shape[0], raw_img[:].shape[1], 4))
    mod_img[:, :, 0] = raw_img
    result = (mod_img, colour_arr, dim, coin_size, time_per_coin)
    return result

def sizer(desired_width, pic_width, coin_size):
    """Set up output mosaic size according to the passed parameters"""
    coins_in_width = desired_width / coin_size
    percentage = coins_in_width / pic_width
    return percentage

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

def main():
    """Entry point for code to be run"""
    setup_result = setup()
    mod_img = setup_result[0]         #3D np array ready to populate
    colour_arr = setup_result[1]      #2D np array of colour/intensity info
    dim = setup_result[2]             #List in form of (width, height)
    coin_size = setup_result[3]       #Coin used size
    time_per_coin = setup_result[4]   #Rough time in seconds per coin to set
    fig, axarr = plt.subplots(1, 2)
    coin_pixels(colour_arr, dim, mod_img, coin_size, axarr)
    output(coin_size, dim, time_per_coin, mod_img, fig, axarr)
    #input('press <ENTER> to continue')

if __name__ == '__main__':
    start_time = time.time()
    main()
    print(f"Time taken {(time.time() - start_time)} secs")