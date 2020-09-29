import sys
import os.path
sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))
import image_to_double_coin
from testing.dummy_request import dummy_request
import timeit
from dummy_request import dummy_request

def time_image_conversion():
  image, user_input = dummy_request()
  image_to_double_coin.main(image, user_input)
# setup = f'image = {image}; user_input = {user_input}; import image_to_double_coin'

if __name__ == '__main__':
  repeats = 5
  t = timeit.Timer(time_image_conversion)
  print(f'Average: {round(t.timeit(number=repeats)/repeats, 2)} secs')
