import sys
import os.path

sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir))
)
from api.flask.app import image_to_double_coin
from api.testing.test_data.dummy_request import dummy_request
import timeit
from PIL import ImageColor


def time_image_conversion(repeats):
    def test():
        image, user_input = dummy_request()
        image_to_double_coin.main(image, user_input)

    t = timeit.Timer(test)
    total_time = t.timeit(number=repeats)
    print_stats("Full Test", repeats, total_time)


def time_setup(repeats):
    def test():
        image, user_input = dummy_request()
        image_to_double_coin.setup(image, user_input)

    t = timeit.Timer(test)
    total_time = t.timeit(number=repeats)
    print_stats("Setup", repeats, total_time)


def time_RGB(repeats):
    colour = "#C76B0F"

    def test():
        my_colour = ImageColor.getrgb(colour)
        colour_str = f"rgb({my_colour[0]},{my_colour[1]},{my_colour[2]})"

    t = timeit.Timer(test)
    total_time = t.timeit(number=repeats)
    print_stats("RGB", repeats, total_time)


def time_colour_shades(repeats):
    image, user_input = dummy_request()

    def test():
        sliders = user_input["sliders"]
        deviation = 0.2
        image_to_double_coin.get_colour_shades(sliders, deviation)

    t = timeit.Timer(test)
    total_time = t.timeit(number=repeats)
    print_stats("Colour Shade Creator", repeats, total_time)


def print_stats(test_name, repeats, total_time):
    print(f"\nTest Name: {test_name}")
    print(f"Total: {round(total_time, 2)} secs")
    print(f"Average: {round((total_time/repeats)*1000, 4)} ms")


if __name__ == "__main__":
    time_image_conversion(10)
    # time_colour_shades(1000)
    # time_RGB(40000)
    # time_setup(100)
